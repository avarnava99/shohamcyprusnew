import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ship, ExternalLink, Calendar, Info, RefreshCw } from "lucide-react";
import { useVesselSchedule } from "@/hooks/useVesselSchedule";
import VesselScheduleTable from "./VesselScheduleTable";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const INFOGATE_URL = "https://infogate.eurogate-limassol.eu/segelliste/state/show?_transition=start&period=1&internal=false&languageNo=30&locationCode=CYLMS&order=%2B0";

export default function LimassolScheduleDetails() {
  const { data: vessels, isLoading, error, dataUpdatedAt, refetch, isRefetching } = useVesselSchedule();

  const lastUpdated = vessels && vessels.length > 0 
    ? new Date(vessels[0].scraped_at) 
    : dataUpdatedAt ? new Date(dataUpdatedAt) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Ship className="w-6 h-6 text-primary" />
            Vessel Schedule
          </h2>
          <p className="text-muted-foreground mt-1">
            Arrivals and departures at Eurogate Container Terminal Limassol
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button size="sm" variant="secondary" asChild>
            <a href={INFOGATE_URL} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              InfoGate
            </a>
          </Button>
        </div>
      </div>

      {/* Last Updated Info */}
      {lastUpdated && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>
            Last updated: {format(lastUpdated, "dd MMM yyyy 'at' HH:mm")}
          </span>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <p className="text-destructive">
              Failed to load vessel schedule. Please try again or use the InfoGate link above.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Data Table */}
      {!isLoading && !error && vessels && (
        <VesselScheduleTable vessels={vessels} />
      )}

      {/* Schedule Features */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Ship className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Vessel Information</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  View vessel names, callsigns, voyage numbers, and vessel identification details.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Arrival & Departure Times</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  ETA and ETD information with berth assignments for each vessel.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Operations & Agents</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Details on cargo operations (load/discharge) and shipping agent contacts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Note */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">About This Schedule</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Data is sourced from Eurogate Container Terminal Limassol's InfoGate portal and refreshed twice daily. 
                For the most current information, click the InfoGate button above to view the official schedule.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
