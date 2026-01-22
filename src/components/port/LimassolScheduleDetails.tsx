import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ship, ExternalLink, Calendar, Info } from "lucide-react";

const INFOGATE_URL = "https://infogate.eurogate-limassol.eu/segelliste/state/show?_transition=start&period=1&internal=false&languageNo=30&locationCode=CYLMS&order=%2B0";

export default function LimassolScheduleDetails() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Ship className="w-6 h-6 text-primary" />
            Vessel Schedule
          </h2>
          <p className="text-muted-foreground mt-1">
            Real-time arrivals and departures at Eurogate Container Terminal Limassol
          </p>
        </div>
      </div>

      {/* Main CTA Card */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Eurogate InfoGate Portal</h3>
                <p className="text-muted-foreground mt-1 max-w-md">
                  View the live vessel schedule directly on Eurogate's official InfoGate system. 
                  The portal shows real-time arrivals, departures, berth assignments, and vessel details.
                </p>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="gap-2 shrink-0"
              asChild
            >
              <a href={INFOGATE_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Open Vessel Schedule
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
                  Real-time ETA and ETD information with berth assignments for each vessel.
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
              <h4 className="font-medium">About InfoGate</h4>
              <p className="text-sm text-muted-foreground mt-1">
                InfoGate is Eurogate Container Terminal Limassol's official portal for vessel schedules and container tracking. 
                The schedule typically shows vessels for the upcoming 1-4 weeks and is updated in real-time as vessel movements change.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}