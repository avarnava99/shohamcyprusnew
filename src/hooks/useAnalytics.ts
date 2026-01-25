import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsSummary {
  visitors: number;
  pageviews: number;
  bounceRate: number;
  avgSessionDuration: number;
  pageviewsPerVisit: number;
  visitorsChange: number;
  pageviewsChange: number;
}

interface TimeSeriesData {
  date: string;
  visitors: number;
  pageviews: number;
}

interface BreakdownItem {
  path?: string;
  source?: string;
  device?: string;
  country?: string;
  count: number;
}

interface AnalyticsBreakdown {
  pages: { path: string; count: number }[];
  sources: { source: string; count: number }[];
  devices: { device: string; count: number }[];
  countries: { country: string; count: number }[];
}

interface AnalyticsData {
  summary: AnalyticsSummary;
  timeSeries: TimeSeriesData[];
  breakdown: AnalyticsBreakdown;
}

export function useAnalytics(days: number = 7) {
  return useQuery({
    queryKey: ["analytics", days],
    queryFn: async (): Promise<AnalyticsData> => {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        throw new Error("Not authenticated");
      }

      const { data, error } = await supabase.functions.invoke("get-analytics", {
        body: {},
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      });

      // Add query params via URL
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-analytics?days=${days}`,
        {
          headers: {
            Authorization: `Bearer ${sessionData.session.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch analytics");
      }

      return response.json();
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}
