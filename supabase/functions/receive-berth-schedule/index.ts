import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const event = await req.json();
    console.log("Received webhook event:", event.type);

    if (event.type !== "email.received") {
      return new Response(JSON.stringify({ message: "Ignored non-email event" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailId = event.data?.email_id;
    if (!emailId) {
      throw new Error("No email_id in webhook payload");
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Step 1: Fetch attachments list from Resend
    console.log("Fetching attachments for email:", emailId);
    const attachmentsRes = await fetch(
      `https://api.resend.com/emails/${emailId}/attachments`,
      { headers: { Authorization: `Bearer ${RESEND_API_KEY}` } }
    );

    if (!attachmentsRes.ok) {
      const errText = await attachmentsRes.text();
      throw new Error(`Resend attachments API error [${attachmentsRes.status}]: ${errText}`);
    }

    const attachmentsData = await attachmentsRes.json();
    console.log("Attachments:", JSON.stringify(attachmentsData));

    // Find PDF attachment
    const attachments = attachmentsData.data || attachmentsData;
    const pdfAttachment = (Array.isArray(attachments) ? attachments : []).find(
      (a: any) =>
        a.filename?.toLowerCase().endsWith(".pdf") ||
        a.content_type === "application/pdf"
    );

    if (!pdfAttachment) {
      console.log("No PDF attachment found, skipping");
      return new Response(JSON.stringify({ message: "No PDF attachment found" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Step 2: Download the PDF
    console.log("Downloading PDF:", pdfAttachment.filename);
    const pdfRes = await fetch(pdfAttachment.download_url);
    if (!pdfRes.ok) throw new Error(`Failed to download PDF: ${pdfRes.status}`);

    const pdfBuffer = await pdfRes.arrayBuffer();
    const pdfBase64 = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)));

    // Step 3: Use Gemini to parse the PDF
    console.log("Sending PDF to AI for parsing...");
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Extract all vessel movements from this berth planning PDF into a JSON array. 

For each vessel, extract:
- day: day of week abbreviation (e.g. "WED", "THU")
- vessel_name: vessel name
- voyage_no: voyage number (if present)
- movement: the movement type, e.g. "IN PORT", "IN STBD", "OUT PORT", "OUT STBD", "SHIFTING"
- quay: quay name (e.g. "NORTH", "CNTR", "EAST", "SOUTH")
- pilot_time: the pilot station time (HH:MM format)
- all_fast: the all fast time (HH:MM format, for arrivals)
- tug1: first tug name
- tug2: second tug name  
- agent: shipping agent name
- loa: length overall (number as string)
- comments: any comments

Also extract:
- period_start: the schedule period start datetime in ISO format (e.g. "2026-02-11T16:00:00")
- period_end: the schedule period end datetime in ISO format (e.g. "2026-02-12T23:59:00")

Return ONLY valid JSON in this exact format, no markdown:
{
  "period_start": "...",
  "period_end": "...",
  "vessels": [
    { "day": "...", "vessel_name": "...", "voyage_no": "...", "movement": "...", "quay": "...", "pilot_time": "...", "all_fast": "...", "tug1": "...", "tug2": "...", "agent": "...", "loa": "...", "comments": "..." }
  ]
}`,
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:application/pdf;base64,${pdfBase64}`,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      if (aiResponse.status === 429) {
        console.error("AI rate limited:", errText);
        return new Response(JSON.stringify({ error: "Rate limited, will retry on next email" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error [${aiResponse.status}]: ${errText}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content;
    if (!content) throw new Error("No content from AI response");

    console.log("AI response content:", content.substring(0, 500));

    // Parse the JSON from AI response (strip markdown code blocks if present)
    let cleanJson = content.trim();
    if (cleanJson.startsWith("```")) {
      cleanJson = cleanJson.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    const parsed = JSON.parse(cleanJson);
    const { period_start, period_end, vessels } = parsed;

    if (!vessels || !Array.isArray(vessels) || vessels.length === 0) {
      throw new Error("No vessels parsed from PDF");
    }

    console.log(`Parsed ${vessels.length} vessel movements`);

    // Step 4: Store in database
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Delete old schedule data
    const { error: deleteError } = await supabase.from("berth_schedule").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (deleteError) console.error("Delete error:", deleteError);

    // Insert new rows
    const rows = vessels.map((v: any) => ({
      day: v.day || null,
      vessel_name: v.vessel_name,
      voyage_no: v.voyage_no || null,
      movement: v.movement || null,
      quay: v.quay || null,
      pilot_time: v.pilot_time || null,
      all_fast: v.all_fast || null,
      tug1: v.tug1 || null,
      tug2: v.tug2 || null,
      agent: v.agent || null,
      loa: v.loa || null,
      comments: v.comments || null,
      period_start: period_start || null,
      period_end: period_end || null,
      received_at: new Date().toISOString(),
    }));

    const { error: insertError } = await supabase.from("berth_schedule").insert(rows);
    if (insertError) throw new Error(`Insert error: ${JSON.stringify(insertError)}`);

    console.log(`Successfully stored ${rows.length} berth schedule entries`);

    return new Response(
      JSON.stringify({ success: true, count: rows.length }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing berth schedule:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
