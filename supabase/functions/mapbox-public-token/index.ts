import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Prefer explicit VITE_ secret if present, otherwise fall back to MAPBOX_PUBLIC_TOKEN.
    const token =
      Deno.env.get("VITE_MAPBOX_PUBLIC_TOKEN") ??
      Deno.env.get("MAPBOX_PUBLIC_TOKEN") ??
      "";

    if (!token) {
      return new Response(JSON.stringify({ error: "Missing Mapbox token" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
