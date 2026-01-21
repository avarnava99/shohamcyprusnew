import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  Package, 
  Calendar,
  ExternalLink,
  Send,
  MessageSquare,
  CheckCircle,
  XCircle,
  Truck
} from "lucide-react";
import { format } from "date-fns";
import SendOfferDialog from "./SendOfferDialog";

interface ContainerOrder {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  container_type: string;
  quantity: number;
  street_address: string;
  address_line_2: string | null;
  city: string;
  state_region: string | null;
  postal_code: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  location_address: string | null;
  crane_unloading: boolean;
  comments: string | null;
  status: string;
  created_at: string;
}

interface ContainerOrderCardProps {
  order: ContainerOrder;
  onStatusChange: (orderId: string, status: string) => void;
  onOfferSent: () => void;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  quoted: "bg-purple-100 text-purple-800",
  sold: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const ContainerOrderCard = ({ order, onStatusChange, onOfferSent }: ContainerOrderCardProps) => {
  const [sendOfferOpen, setSendOfferOpen] = useState(false);

  const fullAddress = [
    order.street_address,
    order.address_line_2,
    order.city,
    order.state_region,
    order.postal_code,
    order.country
  ].filter(Boolean).join(", ");

  const googleMapsUrl = order.latitude && order.longitude
    ? `https://www.google.com/maps?q=${order.latitude},${order.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50 pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-semibold text-lg">{order.name}</h3>
                <Badge className={statusColors[order.status] || "bg-gray-100 text-gray-800"}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Package className="h-3 w-3" />
                  {order.container_type} × {order.quantity}
                </Badge>
                {order.crane_unloading && (
                  <Badge variant="secondary" className="gap-1">
                    <Truck className="h-3 w-3" />
                    Crane Unloading
                  </Badge>
                )}
              </div>
              {order.company && (
                <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{order.company}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {format(new Date(order.created_at), "dd MMM yyyy, HH:mm")}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Contact Information</h4>
              <div className="space-y-2">
                <a 
                  href={`mailto:${order.email}`}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {order.email}
                </a>
                <a 
                  href={`tel:${order.phone}`}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  {order.phone}
                </a>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Delivery Address</h4>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm">{fullAddress}</p>
                  {order.location_address && (
                    <p className="text-sm text-muted-foreground mt-1">{order.location_address}</p>
                  )}
                  <a 
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-1"
                  >
                    View on Google Maps
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Comments */}
          {order.comments && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">Customer Comments</h4>
              <p className="text-sm">{order.comments}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t">
            <Button 
              onClick={() => setSendOfferOpen(true)}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              Send Offer
            </Button>
            
            {order.status === "new" && (
              <Button 
                variant="outline" 
                onClick={() => onStatusChange(order.id, "contacted")}
                className="gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Mark Contacted
              </Button>
            )}
            
            {(order.status === "quoted" || order.status === "contacted") && (
              <Button 
                variant="outline" 
                onClick={() => onStatusChange(order.id, "sold")}
                className="gap-2 text-green-600 border-green-600 hover:bg-green-50"
              >
                <CheckCircle className="h-4 w-4" />
                Mark Sold
              </Button>
            )}
            
            {order.status !== "cancelled" && order.status !== "sold" && (
              <Button 
                variant="ghost" 
                onClick={() => onStatusChange(order.id, "cancelled")}
                className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <XCircle className="h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <SendOfferDialog
        open={sendOfferOpen}
        onOpenChange={setSendOfferOpen}
        order={order}
        onSuccess={onOfferSent}
      />
    </>
  );
};

export default ContainerOrderCard;
