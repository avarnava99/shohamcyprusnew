import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AnalyticsTimeSeries {
  date: string;
  value: number;
}

export interface AnalyticsBreakdownItem {
  name: string;
  value: number;
}

export interface AnalyticsData {
  visitors: { total: number; series: AnalyticsTimeSeries[] };
  pageviews: { total: number; series: AnalyticsTimeSeries[] };
  bounceRate: { total: number; series: AnalyticsTimeSeries[] };
  sessionDuration: { total: number; series: AnalyticsTimeSeries[] };
  pageviewsPerVisit: { total: number; series: AnalyticsTimeSeries[] };
  breakdowns: {
    pages: AnalyticsBreakdownItem[];
    sources: AnalyticsBreakdownItem[];
    devices: AnalyticsBreakdownItem[];
    countries: AnalyticsBreakdownItem[];
  };
}

export function useAnalytics(days: number = 30) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, [days]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: result, error: fnError } = await supabase.functions.invoke(
        "get-site-analytics",
        { body: null, headers: {} }
      );

      // If edge function fails, try parsing anyway or use the URL approach
      if (fnError) {
        console.error("Edge function error:", fnError);
        setError("Failed to fetch analytics data");
        setLoading(false);
        return;
      }

      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      // Parse the response data
      setData(parseAnalyticsResponse(result));
    } catch (err: any) {
      console.error("Analytics fetch error:", err);
      setError(err.message || "Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchAnalytics };
}

function parseAnalyticsResponse(raw: any): AnalyticsData {
  // Handle various response formats
  if (!raw) {
    return getEmptyData();
  }

  try {
    // If data comes in the expected format from the API
    const metrics = raw.metrics || raw;
    const breakdownData = raw.breakdowns || raw;

    return {
      visitors: parseMetric(metrics.visitors || metrics[0], "visitors"),
      pageviews: parseMetric(metrics.pageviews || metrics[1], "pageviews"),
      bounceRate: parseMetric(metrics.bounceRate || metrics[4], "bounceRate"),
      sessionDuration: parseMetric(metrics.sessionDuration || metrics[3], "sessionDuration"),
      pageviewsPerVisit: parseMetric(metrics.pageviewsPerVisit || metrics[2], "pageviewsPerVisit"),
      breakdowns: {
        pages: parseBreakdown(breakdownData.pages || breakdownData?.breakdowns?.page),
        sources: parseBreakdown(breakdownData.sources || breakdownData?.breakdowns?.source),
        devices: parseBreakdown(breakdownData.devices || breakdownData?.breakdowns?.device),
        countries: parseBreakdown(breakdownData.countries || breakdownData?.breakdowns?.country),
      },
    };
  } catch {
    return getEmptyData();
  }
}

function parseMetric(metric: any, _name: string): { total: number; series: AnalyticsTimeSeries[] } {
  if (!metric) return { total: 0, series: [] };

  const total = typeof metric === "number" ? metric : metric.total || metric.value || 0;
  const series = (metric.series || metric.data || []).map((item: any) => ({
    date: item.date || item.timestamp || "",
    value: item.value || item.count || 0,
  }));

  return { total, series };
}

function parseBreakdown(breakdown: any): AnalyticsBreakdownItem[] {
  if (!breakdown) return [];
  if (Array.isArray(breakdown)) {
    return breakdown.map((item: any) => ({
      name: item.name || item.label || item[0] || "Unknown",
      value: item.value || item.count || item[1] || 0,
    }));
  }
  return [];
}

function getEmptyData(): AnalyticsData {
  return {
    visitors: { total: 0, series: [] },
    pageviews: { total: 0, series: [] },
    bounceRate: { total: 0, series: [] },
    sessionDuration: { total: 0, series: [] },
    pageviewsPerVisit: { total: 0, series: [] },
    breakdowns: { pages: [], sources: [], devices: [], countries: [] },
  };
}
