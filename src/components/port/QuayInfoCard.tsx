import { useState } from "react";
import { ChevronDown, ChevronUp, Anchor, Ruler, Waves, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { QuayInfo } from "@/data/limassolPortData";

interface QuayInfoCardProps {
  quay: QuayInfo;
}

const QuayInfoCard = ({ quay }: QuayInfoCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader 
        className="cursor-pointer bg-gradient-to-r from-primary/5 to-primary/10"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Anchor className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg font-heading">{quay.name}</CardTitle>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {quay.depth} depth
            </Badge>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Ruler className="w-4 h-4" /> {quay.length} × {quay.width}
          </span>
          <span className="flex items-center gap-1">
            <Waves className="w-4 h-4" /> Depth: {quay.depth}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" /> Bollards: {quay.bollardNumbers}
          </span>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-4 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-primary">Dimensions & Depth</h4>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Length:</dt>
                  <dd className="font-medium">{quay.length}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Width:</dt>
                  <dd className="font-medium">{quay.width}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Water Depth:</dt>
                  <dd className="font-medium">{quay.depth}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Under Keel Clearance:</dt>
                  <dd className="font-medium">{quay.underKeelClearance}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Air Draft:</dt>
                  <dd className="font-medium">{quay.restrictedAirDraft}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Cope Edge Height:</dt>
                  <dd className="font-medium">{quay.heightToCopeEdge}</dd>
                </div>
              </dl>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-primary">Mooring & Fendering</h4>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Bollard Numbers:</dt>
                  <dd className="font-medium">{quay.bollardNumbers}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Bollard Type:</dt>
                  <dd className="font-medium">{quay.bollardType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Bollard Capacity:</dt>
                  <dd className="font-medium">{quay.bollardCapacity}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Bollard Intervals:</dt>
                  <dd className="font-medium">{quay.bollardIntervals}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Fendering:</dt>
                  <dd className="font-medium">{quay.fendering}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Berthing Side:</dt>
                  <dd className="font-medium">{quay.preferredBerthingSide}</dd>
                </div>
              </dl>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Coordinates: {quay.location.lat}°N, {quay.location.lng}°E
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default QuayInfoCard;
