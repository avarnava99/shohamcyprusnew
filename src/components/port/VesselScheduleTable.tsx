import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { VesselScheduleRow } from "@/hooks/useVesselSchedule";
import { format, parseISO } from "date-fns";

interface VesselScheduleTableProps {
  vessels: VesselScheduleRow[];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  try {
    return format(parseISO(dateStr), "dd MMM");
  } catch {
    return dateStr;
  }
}

function formatTime(timeStr: string | null): string {
  if (!timeStr) return "";
  // Time is stored as HH:MM:SS, display as HH:MM
  return timeStr.slice(0, 5);
}

function formatDateTime(date: string | null, time: string | null): string {
  const dateFormatted = formatDate(date);
  const timeFormatted = formatTime(time);
  if (dateFormatted === "—") return "—";
  return timeFormatted ? `${dateFormatted} ${timeFormatted}` : dateFormatted;
}

function getOperationBadgeVariant(operation: string | null): "default" | "secondary" | "outline" {
  if (!operation) return "outline";
  const op = operation.toLowerCase();
  if (op.includes("discharge") && op.includes("load")) return "default";
  if (op.includes("load")) return "secondary";
  return "outline";
}

export default function VesselScheduleTable({ vessels }: VesselScheduleTableProps) {
  if (vessels.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No vessel schedule data available.</p>
        <p className="text-sm mt-1">Data will appear after the next scheduled refresh.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[180px]">Vessel</TableHead>
            <TableHead>Arrival</TableHead>
            <TableHead>Departure</TableHead>
            <TableHead>Berth</TableHead>
            <TableHead>Operation</TableHead>
            <TableHead className="hidden md:table-cell">Agent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vessels.map((vessel) => (
            <TableRow key={vessel.id}>
              <TableCell>
                <div>
                  <span className="font-medium">{vessel.vessel_name}</span>
                  {vessel.callsign && (
                    <span className="text-muted-foreground text-xs ml-2">
                      ({vessel.callsign})
                    </span>
                  )}
                </div>
                {vessel.voyage_no && (
                  <div className="text-xs text-muted-foreground">
                    Voyage: {vessel.voyage_no}
                  </div>
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {formatDateTime(vessel.arrival_date, vessel.arrival_time)}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {formatDateTime(vessel.etd_date, vessel.etd_time)}
              </TableCell>
              <TableCell>{vessel.berth || "—"}</TableCell>
              <TableCell>
                {vessel.operation ? (
                  <Badge variant={getOperationBadgeVariant(vessel.operation)}>
                    {vessel.operation}
                  </Badge>
                ) : (
                  "—"
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                {vessel.agent || "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
