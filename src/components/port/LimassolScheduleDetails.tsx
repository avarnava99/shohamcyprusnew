import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ship, ExternalLink, Calendar, Info } from "lucide-react";

const INFOGATE_URL = "https://infogate.eurogate-limassol.eu/segelliste/state/show?_transition=start&period=1&internal=false&languageNo=30&locationCode=CYLMS&order=%2B0";

export default function LimassolScheduleDetails() {
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
      </div>

      {/* Main CTA Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <Ship className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">View Official Vessel Schedule</h3>
              <p className="text-muted-foreground max-w-md">
                Access the real-time vessel schedule directly from Eurogate's official InfoGate portal 
                for the most accurate and up-to-date arrival and departure information.
              </p>
            </div>
            <Button size="lg" asChild className="mt-2">
              <a href={INFOGATE_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 mr-2" />
                Open InfoGate Portal
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

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
              <h4 className="font-medium">About InfoGate Portal</h4>
              <p className="text-sm text-muted-foreground mt-1">
                The InfoGate portal is the official source for vessel schedule information at Eurogate Container Terminal Limassol. 
                It provides real-time updates on vessel arrivals, departures, berth assignments, and cargo operations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
