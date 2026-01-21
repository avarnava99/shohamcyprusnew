import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Ship, RefreshCw, Clock, Anchor, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";

interface VesselSchedule {
  id: string;
  vessel_name: string;
  callsign: string | null;
  voyage_no: string | null;
  vessel_no: string | null;
  arrival_date: string | null;
  arrival_time: string | null;
  etd_date: string | null;
  etd_time: string | null;
  berth: string | null;
  operation: string | null;
  delivery_start: string | null;
  status: string | null;
  agent: string | null;
  scraped_at: string;
}

const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return "-";
  try {
    return format(parseISO(dateStr), "dd MMM");
  } catch {
    return dateStr;
  }
};

const formatTime = (timeStr: string | null): string => {
  if (!timeStr) return "";
  // Time format is "HH:mm:ss", we want "HH:mm"
  return timeStr.substring(0, 5);
};

const getStatusBadge = (vessel: VesselSchedule) => {
  const now = new Date();
  const arrivalDateTime = vessel.arrival_date && vessel.arrival_time 
    ? new Date(`${vessel.arrival_date}T${vessel.arrival_time}`)
    : null;
  const etdDateTime = vessel.etd_date && vessel.etd_time
    ? new Date(`${vessel.etd_date}T${vessel.etd_time}`)
    : null;

  if (vessel.status) {
    return <Badge variant="secondary">{vessel.status}</Badge>;
  }

  if (etdDateTime && etdDateTime < now) {
    return <Badge variant="outline" className="bg-muted text-muted-foreground">Departed</Badge>;
  }
  
  if (arrivalDateTime && arrivalDateTime <= now && (!etdDateTime || etdDateTime > now)) {
    return <Badge className="bg-green-600 hover:bg-green-700">In Port</Badge>;
  }
  
  if (arrivalDateTime && arrivalDateTime > now) {
    return <Badge className="bg-blue-600 hover:bg-blue-700">Expected</Badge>;
  }

  return <Badge variant="secondary">Scheduled</Badge>;
};

export default function LimassolScheduleDetails() {
  const [vessels, setVessels] = useState<VesselSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSchedule = async () => {
    try {
      const { data, error } = await supabase
        .from('limassol_vessel_schedule')
        .select('*')
        .order('arrival_date', { ascending: true })
        .order('arrival_time', { ascending: true });

      if (error) {
        console.error('Error fetching schedule:', error);
        return;
      }

      // Type assertion since the table is new and types haven't regenerated
      const typedData = data as unknown as VesselSchedule[];
      setVessels(typedData || []);
      
      if (typedData && typedData.length > 0) {
        setLastUpdated(typedData[0].scraped_at);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const triggerRefresh = async () => {
    setRefreshing(true);
    try {
      const { error } = await supabase.functions.invoke('limassol-vessel-schedule');
      if (error) {
        console.error('Error triggering refresh:', error);
      } else {
        // Wait a moment then refetch
        await new Promise(resolve => setTimeout(resolve, 2000));
        await fetchSchedule();
      }
    } catch (err) {
      console.error('Refresh error:', err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Ship className="w-6 h-6 text-primary" />
            Vessel Schedule
          </h2>
          <p className="text-muted-foreground mt-1">
            Live arrivals and departures at Eurogate Container Terminal Limassol
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Last updated: {format(parseISO(lastUpdated), "dd MMM yyyy, HH:mm")}
            </div>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={triggerRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Updating...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Schedule Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Current Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          {vessels.length === 0 ? (
            <div className="text-center py-12">
              <Anchor className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No vessel schedule available</p>
              <p className="text-sm text-muted-foreground mt-1">
                Click refresh to fetch the latest schedule from Eurogate
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vessel</TableHead>
                    <TableHead>Callsign</TableHead>
                    <TableHead>Voyage</TableHead>
                    <TableHead>Berth</TableHead>
                    <TableHead>Arrival</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Operation</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vessels.map((vessel) => (
                    <TableRow key={vessel.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Ship className="w-4 h-4 text-muted-foreground" />
                          {vessel.vessel_name}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {vessel.callsign || "-"}
                      </TableCell>
                      <TableCell>{vessel.voyage_no || "-"}</TableCell>
                      <TableCell>
                        {vessel.berth ? (
                          <Badge variant="outline">{vessel.berth}</Badge>
                        ) : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{formatDate(vessel.arrival_date)}</span>
                          <span className="text-sm text-muted-foreground">
                            {formatTime(vessel.arrival_time)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{formatDate(vessel.etd_date)}</span>
                          <span className="text-sm text-muted-foreground">
                            {formatTime(vessel.etd_time)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {vessel.operation || "-"}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={vessel.agent || ""}>
                        {vessel.agent || "-"}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(vessel)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Automatic Updates</h4>
              <p className="text-sm text-muted-foreground mt-1">
                This schedule is automatically updated twice daily at 06:00 and 18:00 Cyprus time. 
                Data is sourced from Eurogate Container Terminal Limassol's InfoGate system.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}