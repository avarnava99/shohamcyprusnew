import { Waves, Ruler, Gauge, Clock, Shield, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { LimassolPortData } from "@/data/limassolPortData";

interface PortSpecsGridProps {
  portData: LimassolPortData;
}

const PortSpecsGrid = ({ portData }: PortSpecsGridProps) => {
  const specs = [
    {
      icon: <Waves className="w-5 h-5" />,
      label: "Channel Depth",
      value: portData.generalPortDetails.channelDepth,
      subtext: "Minimum depth"
    },
    {
      icon: <Ruler className="w-5 h-5" />,
      label: "Air Draft",
      value: portData.generalPortDetails.airDraft,
      subtext: "No restrictions"
    },
    {
      icon: <Gauge className="w-5 h-5" />,
      label: "Water Density",
      value: portData.generalPortDetails.waterDensity,
      subtext: "Seawater"
    },
    {
      icon: <Waves className="w-5 h-5" />,
      label: "Tidal Range",
      value: portData.generalPortDetails.tidalRange,
      subtext: "Minimal variation"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Port Specifications Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {specs.map((spec, idx) => (
          <div key={idx} className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10">
            <div className="text-primary mb-2">{spec.icon}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">{spec.label}</div>
            <div className="font-heading font-bold text-lg">{spec.value}</div>
            <div className="text-xs text-muted-foreground">{spec.subtext}</div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="p-4 rounded-lg bg-muted/50">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-5 h-5 text-primary" />
          <h4 className="font-semibold">Certifications</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {portData.certifications.map((cert, idx) => (
            <Badge key={idx} variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              <Shield className="w-3 h-3 mr-1" />
              {cert}
            </Badge>
          ))}
        </div>
      </div>

      {/* Operating Hours */}
      <div className="p-4 rounded-lg bg-muted/50">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-primary" />
          <h4 className="font-semibold">Operating Shifts</h4>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="text-center p-3 rounded bg-background">
            <div className="text-xs text-muted-foreground mb-1">Shift 1</div>
            <div className="font-mono font-semibold">{portData.operatingShifts.shift1}</div>
          </div>
          <div className="text-center p-3 rounded bg-background">
            <div className="text-xs text-muted-foreground mb-1">Shift 2</div>
            <div className="font-mono font-semibold">{portData.operatingShifts.shift2}</div>
          </div>
          <div className="text-center p-3 rounded bg-background">
            <div className="text-xs text-muted-foreground mb-1">Shift 3</div>
            <div className="font-mono font-semibold">{portData.operatingShifts.shift3}</div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{portData.operatingShifts.note}</p>
      </div>
    </div>
  );
};

export default PortSpecsGrid;
