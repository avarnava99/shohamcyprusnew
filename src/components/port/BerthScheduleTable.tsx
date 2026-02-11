import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ship, Clock, ExternalLink, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

const INFOGATE_URL =
  "https://infogate.eurogate-limassol.eu/segelliste/state/show?_transition=start&period=1&internal=false&languageNo=30&locationCode=CYLMS&order=%2B0";

interface BerthEntry {
  id: string;
  day: string | null;
  vessel_name: string;
  voyage_no: string | null;
  movement: string | null;
  quay: string | null;
  pilot_time: string | null;
  all_fast: string | null;
  tug1: string | null;
  tug2: string | null;
  agent: string | null;
  loa: string | null;
  comments: string | null;
  period_start: string | null;
  period_end: string | null;
  received_at: string;
}

function MovementBadge({ movement }: { movement: string | null }) {
  if (!movement) return null;
  const upper = movement.toUpperCase();
  const isIn = upper.startsWith("IN");
  const isShift = upper.includes("SHIFT");

  return (
    <Badge
      className={
        isIn
          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
          : isShift
          ? "bg-amber-500 hover:bg-amber-600 text-white"
          : "bg-red-600 hover:bg-red-700 text-white"
      }
    >
      {movement}
    </Badge>
  );
}

export default function BerthScheduleTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["berth-schedule"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("berth_schedule")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as BerthEntry[];
    },
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });

  const periodStart = data?.[0]?.period_start;
  const periodEnd = data?.[0]?.period_end;
  const receivedAt = data?.[0]?.received_at;

  const formatPeriod = (iso: string | null) => {
    if (!iso) return "";
    try {
      return format(new Date(iso), "dd/MM/yyyy HH:mm");
    } catch {
      return iso;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Ship className="w-6 h-6 animate-pulse mr-2" />
            Loading berth schedule...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data || data.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Ship className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Berth Schedule Coming Soon
                </h3>
                <p className="text-muted-foreground max-w-md">
                  The live berthing schedule will appear here once updated. In
                  the meantime, check the InfoGate portal for vessel schedule
                  information.
                </p>
              </div>
              <Button size="lg" asChild className="mt-2">
                <a
                  href={INFOGATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Open InfoGate Portal
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with period & last updated */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Anchor className="w-6 h-6 text-primary" />
            DP World Berth Planning
          </h2>
          {periodStart && periodEnd && (
            <p className="text-muted-foreground text-sm mt-1">
              Period: {formatPeriod(periodStart)} – {formatPeriod(periodEnd)}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {receivedAt && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Updated {format(new Date(receivedAt), "dd/MM HH:mm")}
            </span>
          )}
          <Button variant="outline" size="sm" asChild>
            <a
              href={INFOGATE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              InfoGate
            </a>
          </Button>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-16">Day</TableHead>
                  <TableHead>Vessel</TableHead>
                  <TableHead className="w-28">Movement</TableHead>
                  <TableHead className="w-20">Quay</TableHead>
                  <TableHead className="w-20">Pilot</TableHead>
                  <TableHead className="w-20">All Fast</TableHead>
                  <TableHead>Tugs</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead className="w-16">LOA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium text-xs">
                      {entry.day}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {entry.vessel_name}
                      {entry.voyage_no && (
                        <span className="text-xs text-muted-foreground ml-1">
                          ({entry.voyage_no})
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <MovementBadge movement={entry.movement} />
                    </TableCell>
                    <TableCell className="text-xs">{entry.quay}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {entry.pilot_time}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {entry.all_fast}
                    </TableCell>
                    <TableCell className="text-xs">
                      {[entry.tug1, entry.tug2].filter(Boolean).join(", ")}
                    </TableCell>
                    <TableCell className="text-xs">{entry.agent}</TableCell>
                    <TableCell className="text-xs">{entry.loa}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Mobile card layout */}
      <div className="md:hidden space-y-3">
        {data.map((entry) => (
          <Card key={entry.id}>
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold">{entry.vessel_name}</p>
                  {entry.voyage_no && (
                    <p className="text-xs text-muted-foreground">
                      Voy: {entry.voyage_no}
                    </p>
                  )}
                </div>
                <MovementBadge movement={entry.movement} />
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div>
                  <span className="text-muted-foreground">Day:</span>{" "}
                  {entry.day}
                </div>
                <div>
                  <span className="text-muted-foreground">Quay:</span>{" "}
                  {entry.quay}
                </div>
                <div>
                  <span className="text-muted-foreground">Pilot:</span>{" "}
                  {entry.pilot_time}
                </div>
                <div>
                  <span className="text-muted-foreground">All Fast:</span>{" "}
                  {entry.all_fast}
                </div>
                <div>
                  <span className="text-muted-foreground">Agent:</span>{" "}
                  {entry.agent}
                </div>
                <div>
                  <span className="text-muted-foreground">LOA:</span>{" "}
                  {entry.loa}
                </div>
                {(entry.tug1 || entry.tug2) && (
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Tugs:</span>{" "}
                    {[entry.tug1, entry.tug2].filter(Boolean).join(", ")}
                  </div>
                )}
                {entry.comments && (
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Note:</span>{" "}
                    {entry.comments}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Source: DP World Limassol Berth Planner
      </p>
    </div>
  );
}
