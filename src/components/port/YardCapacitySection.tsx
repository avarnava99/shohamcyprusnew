import { Warehouse, Square, Weight } from "lucide-react";
import type { LimassolPortData } from "@/data/limassolPortData";

interface YardCapacitySectionProps {
  portData: LimassolPortData;
}

const YardCapacitySection = ({ portData }: YardCapacitySectionProps) => {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-center">
          <Square className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-heading font-bold">{portData.yardCapacity.total}</div>
          <div className="text-sm text-muted-foreground">Total Area</div>
        </div>
        <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-center">
          <Warehouse className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-heading font-bold">{portData.yardCapacity.warehouses}</div>
          <div className="text-sm text-muted-foreground">Warehouses</div>
        </div>
        <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-center">
          <Square className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-heading font-bold">{portData.yardCapacity.openYards}</div>
          <div className="text-sm text-muted-foreground">Open Yards</div>
        </div>
      </div>
      
      <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-center gap-3">
        <Weight className="w-5 h-5 text-primary" />
        <span className="text-muted-foreground">Max Bearing Capacity:</span>
        <span className="font-bold">{portData.maxBearingCapacity}</span>
      </div>
    </div>
  );
};

export default YardCapacitySection;
