import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface VesselScheduleRow {
  id: string;
  vessel_name: string;
  callsign: string | null;
  voyage_no: string | null;
  arrival_date: string | null;
  arrival_time: string | null;
  etd_date: string | null;
  etd_time: string | null;
  berth: string | null;
  operation: string | null;
  agent: string | null;
  status: string | null;
  scraped_at: string;
}

export function useVesselSchedule() {
  return useQuery({
    queryKey: ["vessel-schedule", "limassol"],
    queryFn: async (): Promise<VesselScheduleRow[]> => {
      const { data, error } = await supabase
        .from("limassol_vessel_schedule")
        .select("*")
        .order("arrival_date", { ascending: true, nullsFirst: false })
        .order("arrival_time", { ascending: true, nullsFirst: false });

      if (error) {
        console.error("Error fetching vessel schedule:", error);
        throw error;
      }

      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
  });
}
