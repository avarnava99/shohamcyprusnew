import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

interface ContainerOfferRequest {
  orderId: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  message: string;
  containerType: string;
  quantity: number;
  offerPrice?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // --- Auth: require a valid admin session ---
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const userId = claimsData.claims.sub;

    // Check admin role using service role client
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const { data: roleData } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Forbidden: admin role required" }), {
        status: 403,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    // --- End auth ---

    const {
      orderId,
      recipientEmail,
      recipientName,
      subject,
      message,
      containerType,
      quantity,
      offerPrice,
    }: ContainerOfferRequest = await req.json();

    console.log("Sending container offer:", {
      orderId,
      recipientEmail,
      containerType,
      quantity,
    });

    // Escape all user-controlled values before inserting into HTML
    const safeRecipientName = escapeHtml(recipientName);
    const safeSubject = escapeHtml(subject);
    const safeContainerType = escapeHtml(containerType);
    const safeOfferPrice = offerPrice ? escapeHtml(offerPrice) : undefined;
    const safeOrderId = escapeHtml(orderId.substring(0, 8).toUpperCase());
    const htmlMessage = escapeHtml(message).replace(/\n/g, "<br>");

    const emailResponse = await resend.emails.send({
      from: "Shoham Shipping <onboarding@resend.dev>",
      reply_to: "avarnava@shoham.com.cy",
      to: [recipientEmail],
      subject: safeSubject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a365d 0%, #2d4a8c 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">SHOHAM SHIPPING</h1>
            <p style="color: #a3bffa; margin: 5px 0 0 0; font-size: 14px;">Container Sales Division</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
            <div style="background: white; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #e2e8f0;">
                <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Order Reference</p>
                <p style="margin: 5px 0 0 0; font-size: 14px; font-weight: bold; color: #1a365d;">${safeOrderId}</p>
              </div>
              
              <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 5px 0; color: #64748b; font-size: 14px;">Container Type:</td>
                    <td style="padding: 5px 0; font-weight: bold; text-align: right;">${safeContainerType}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; color: #64748b; font-size: 14px;">Quantity:</td>
                    <td style="padding: 5px 0; font-weight: bold; text-align: right;">${quantity}</td>
                  </tr>
                  ${safeOfferPrice ? `
                  <tr>
                    <td style="padding: 5px 0; color: #64748b; font-size: 14px;">Quoted Price:</td>
                    <td style="padding: 5px 0; font-weight: bold; text-align: right; color: #16a34a;">&euro;${safeOfferPrice}</td>
                  </tr>
                  ` : ""}
                </table>
              </div>
              
              <div style="font-size: 15px; line-height: 1.8;">
                ${htmlMessage}
              </div>
            </div>
          </div>
          
          <div style="background: #1a365d; padding: 25px; text-align: center; border-radius: 0 0 10px 10px;">
            <p style="color: #a3bffa; margin: 0 0 10px 0; font-size: 14px;">For any questions, please contact us:</p>
            <p style="margin: 0;">
              <a href="mailto:avarnava@shoham.com.cy" style="color: white; text-decoration: none; font-weight: bold;">avarnava@shoham.com.cy</a>
            </p>
            <p style="color: #a3bffa; margin: 15px 0 0 0; font-size: 12px;">
              Shoham Shipping Cyprus Ltd.<br>
              Limassol, Cyprus
            </p>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Update order status to 'quoted' after successful email
    const { error: updateError } = await supabaseAdmin
      .from("container_orders")
      .update({ status: "quoted" })
      .eq("id", orderId);

    if (updateError) {
      console.error("Failed to update order status:", updateError);
    } else {
      console.log("Order status updated to 'quoted'");
    }

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-container-offer function:", error);
    return new Response(
      JSON.stringify({ error: "An internal error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
