import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CalculationRequest {
  productDescription: string;
  productValue: number;
  shippingCost: number;
  insuranceCost: number;
  countryOfOrigin: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const body: CalculationRequest = await req.json();
    const { productDescription, productValue, shippingCost, insuranceCost, countryOfOrigin } = body;

    console.log("Calculating duty for:", { productDescription, productValue, countryOfOrigin });

    // Validate inputs
    if (!productDescription || productValue <= 0 || !countryOfOrigin) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Calculate CIF value
    const cifValue = productValue + shippingCost + insuranceCost;

    // Determine if EU origin (0% duty for most goods within EU)
    const isEUOrigin = ["DE", "FR", "IT", "OTHER_EU"].includes(countryOfOrigin);

    // Use AI to determine product category and duty rate
    const systemPrompt = `You are a Cyprus customs duty estimation assistant. Your role is to help estimate import duties for goods being imported into Cyprus.

IMPORTANT CONTEXT:
- Cyprus is an EU member state
- Standard VAT rate in Cyprus is 19%
- Goods from EU countries generally have 0% import duty
- Common duty rate ranges for non-EU goods:
  - Electronics/phones/computers: 0%
  - Clothing/textiles: 12%
  - Footwear: 8-17%
  - Furniture: 0-5.6%
  - Toys: 0-4.7%
  - Cosmetics: 0-6.5%
  - Food products: varies widely (0-25%)
  - Alcohol: high duties + excise
  - Tobacco: high duties + excise
  - Vehicles: 10% + registration fees
  - Machinery/industrial equipment: 0-5%
  - Jewelry: 0-4%
  - Books/printed matter: 0%

Your task is to analyze the product description and estimate:
1. The likely product category
2. An estimated HS code prefix (first 4-6 digits)
3. The applicable duty rate percentage
4. Any relevant notes about the product

IMPORTANT: Always be conservative in your estimates. If unsure, estimate slightly higher duty rates to avoid underestimating costs.

Respond in JSON format only:
{
  "productCategory": "Brief category description",
  "hsCodeEstimate": "XXXX.XX (estimated)",
  "dutyRatePercent": number,
  "notes": "Any relevant notes about this product type or import considerations"
}`;

    const userPrompt = `Product to import: "${productDescription}"
Country of origin: ${countryOfOrigin}${isEUOrigin ? " (EU member - likely 0% duty)" : ""}
Product value: €${productValue}

Analyze this product and provide the duty estimation in JSON format.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API error:", aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Service is busy. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("Failed to analyze product");
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content;

    console.log("AI response content:", content);

    // Parse AI response
    let aiResult;
    try {
      // Extract JSON from response (handle potential markdown code blocks)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aiResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Fallback to conservative estimate
      aiResult = {
        productCategory: "General Goods",
        hsCodeEstimate: "9999.99 (unknown)",
        dutyRatePercent: isEUOrigin ? 0 : 10,
        notes: "Unable to determine specific category. Using conservative estimate.",
      };
    }

    // Force 0% duty for EU origin regardless of AI response
    const finalDutyRate = isEUOrigin ? 0 : aiResult.dutyRatePercent;
    
    // Calculate amounts
    const estimatedDuty = (cifValue * finalDutyRate) / 100;
    const vatBase = cifValue + estimatedDuty;
    const vatAmount = vatBase * 0.19; // 19% Cyprus VAT
    const totalCost = cifValue + estimatedDuty + vatAmount;

    const result = {
      productValue,
      shippingCost,
      insuranceCost,
      cifValue,
      estimatedDutyRate: finalDutyRate,
      estimatedDuty,
      vatAmount,
      totalCost,
      hsCodeEstimate: aiResult.hsCodeEstimate,
      productCategory: aiResult.productCategory,
      notes: isEUOrigin 
        ? "Goods originating from EU member states are generally exempt from import duties. VAT of 19% still applies."
        : aiResult.notes,
    };

    console.log("Calculation result:", result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Calculate duty error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
