import { Ship, Radio, Clock, Anchor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MarineServices } from "@/data/limassolPortData";

interface MarineServicesSectionProps {
  services: MarineServices;
}

const MarineServicesSection = ({ services }: MarineServicesSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Ship className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg">{services.provider}</h3>
            <p className="text-sm text-muted-foreground">Marine Services Provider</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          <Clock className="w-3 h-3 mr-1" />
          {services.availability}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Tugboats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Anchor className="w-4 h-4 text-primary" />
              Tugboats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {services.tugboats.map((tug, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-muted/50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{tug.name}</span>
                  <Badge variant="outline" className="font-mono text-xs">
                    {tug.power.split('/')[1]?.trim() || tug.power}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{tug.type}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pilot Boats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Ship className="w-4 h-4 text-primary" />
              Pilot Boats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {services.pilotBoats.map((boat, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-muted/50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{boat.name}</span>
                  <Badge variant="outline" className="font-mono text-xs">
                    {boat.power.split('/')[1]?.trim() || boat.power}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{boat.type}</p>
              </div>
            ))}
            
            {/* VHF Channels */}
            <div className="pt-3 mt-3 border-t">
              <div className="flex items-center gap-2 mb-2">
                <Radio className="w-4 h-4 text-primary" />
                <span className="font-semibold text-sm">VHF Channels</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pilot:</span>
                  <span className="font-mono">{services.vhfChannels.pilot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VTS:</span>
                  <span className="font-mono">{services.vhfChannels.vts}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info */}
      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        <div className="p-4 rounded-lg bg-muted/50">
          <span className="text-muted-foreground">Night Navigation:</span>
          <span className="ml-2 font-medium">{services.nightNavigation}</span>
        </div>
        <div className="p-4 rounded-lg bg-muted/50">
          <span className="text-muted-foreground">Movement Request:</span>
          <span className="ml-2 font-medium">{services.movementRequest}</span>
        </div>
      </div>
    </div>
  );
};

export default MarineServicesSection;
