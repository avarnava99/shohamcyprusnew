import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse query params
    const url = new URL(req.url);
    const days = parseInt(url.searchParams.get("days") || "30");

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const formatDate = (d: Date) => d.toISOString().split("T")[0];

    // Fetch daily data (RLS will enforce admin check)
    const { data: dailyData, error: dailyError } = await supabase
      .from("site_analytics_daily")
      .select("*")
      .gte("date", formatDate(startDate))
      .lte("date", formatDate(endDate))
      .order("date", { ascending: true });

    if (dailyError) throw dailyError;

    // Fetch breakdowns
    const { data: breakdownData, error: breakdownError } = await supabase
      .from("site_analytics_breakdowns")
      .select("*")
      .order("value", { ascending: false });

    if (breakdownError) throw breakdownError;

    // Aggregate totals
    const totals = (dailyData || []).reduce(
      (acc, d) => ({
        visitors: acc.visitors + (d.visitors || 0),
        pageviews: acc.pageviews + (d.pageviews || 0),
      }),
      { visitors: 0, pageviews: 0 }
    );

    const daysWithData = (dailyData || []).filter((d) => d.visitors > 0);
    const avgBounceRate =
      daysWithData.length > 0
        ? daysWithData.reduce((sum, d) => sum + Number(d.bounce_rate || 0), 0) / daysWithData.length
        : 0;
    const avgSessionDuration =
      daysWithData.length > 0
        ? daysWithData.reduce((sum, d) => sum + Number(d.session_duration || 0), 0) / daysWithData.length
        : 0;

    // Group breakdowns by type
    const breakdowns: Record<string, { name: string; value: number }[]> = {
      pages: [],
      sources: [],
      devices: [],
      countries: [],
    };

    const typeMap: Record<string, string> = {
      page: "pages",
      source: "sources",
      device: "devices",
      country: "countries",
    };

    for (const item of breakdownData || []) {
      const key = typeMap[item.breakdown_type];
      if (key) {
        breakdowns[key].push({ name: item.name, value: item.value });
      }
    }

    const response = {
      visitors: {
        total: totals.visitors,
        series: (dailyData || []).map((d) => ({ date: d.date, value: d.visitors })),
      },
      pageviews: {
        total: totals.pageviews,
        series: (dailyData || []).map((d) => ({ date: d.date, value: d.pageviews })),
      },
      bounceRate: { total: Math.round(avgBounceRate), series: [] },
      sessionDuration: { total: Math.round(avgSessionDuration), series: [] },
      pageviewsPerVisit: {
        total: totals.visitors > 0 ? +(totals.pageviews / totals.visitors).toFixed(2) : 0,
        series: [],
      },
      breakdowns,
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
