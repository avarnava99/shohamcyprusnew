import { Ship, Package, Anchor, Truck, Users, Fuel, HardHat, Sailboat, Container } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VesselTypesSectionProps {
  vesselTypes: string[];
}

const getVesselIcon = (type: string) => {
  const typeLower = type.toLowerCase();
  if (typeLower.includes('cruise') || typeLower.includes('passenger') || typeLower.includes('ferry')) return <Users className="w-4 h-4" />;
  if (typeLower.includes('container')) return <Container className="w-4 h-4" />;
  if (typeLower.includes('bulk')) return <Package className="w-4 h-4" />;
  if (typeLower.includes('ro/ro') || typeLower.includes('roro')) return <Truck className="w-4 h-4" />;
  if (typeLower.includes('tanker')) return <Fuel className="w-4 h-4" />;
  if (typeLower.includes('naval')) return <Anchor className="w-4 h-4" />;
  if (typeLower.includes('offshore') || typeLower.includes('platform')) return <HardHat className="w-4 h-4" />;
  if (typeLower.includes('barge')) return <Sailboat className="w-4 h-4" />;
  return <Ship className="w-4 h-4" />;
};

const VesselTypesSection = ({ vesselTypes }: VesselTypesSectionProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {vesselTypes.map((type, idx) => (
        <Badge 
          key={idx} 
          variant="outline" 
          className="px-3 py-2 flex items-center gap-2 hover:bg-primary/10 transition-colors"
        >
          {getVesselIcon(type)}
          {type}
        </Badge>
      ))}
    </div>
  );
};

export default VesselTypesSection;
