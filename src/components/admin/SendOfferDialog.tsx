import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

interface ContainerOrder {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  container_type: string;
  quantity: number;
  street_address: string;
  city: string;
  country: string;
}

interface SendOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: ContainerOrder;
  onSuccess: () => void;
}

const SendOfferDialog = ({ open, onOpenChange, order, onSuccess }: SendOfferDialogProps) => {
  const [sending, setSending] = useState(false);
  const [subject, setSubject] = useState(
    `Container Offer - ${order.container_type} × ${order.quantity}`
  );
  const [offerPrice, setOfferPrice] = useState("");
  const [message, setMessage] = useState(
    `Dear ${order.name},

Thank you for your interest in purchasing ${order.quantity}x ${order.container_type} container(s).

We are pleased to provide you with our offer:

Container Type: ${order.container_type}
Quantity: ${order.quantity}
Unit Price: €[PRICE]
Total Price: €[TOTAL_PRICE]

Delivery Address: ${order.street_address}, ${order.city}, ${order.country}
Delivery Fee: To be confirmed based on final arrangements

Payment Terms:
- 50% deposit upon order confirmation
- 50% balance before delivery

Delivery Time: Approximately 5-7 business days from order confirmation

This offer is valid for 7 days from the date of this email.

Please feel free to contact us if you have any questions or would like to proceed with the order.

Best regards,
Shoham Shipping Cyprus`
  );

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill in subject and message");
      return;
    }

    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-container-offer", {
        body: {
          orderId: order.id,
          recipientEmail: order.email,
          recipientName: order.name,
          subject,
          message,
          containerType: order.container_type,
          quantity: order.quantity,
          offerPrice,
        },
      });

      if (error) throw error;

      toast.success("Offer sent successfully!");
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error sending offer:", error);
      toast.error(error.message || "Failed to send offer");
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Send Offer to {order.name}</DialogTitle>
          <DialogDescription>
            Compose and send a container offer email to {order.email}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Container</p>
              <p className="font-medium">{order.container_type} × {order.quantity}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Delivery Location</p>
              <p className="font-medium">{order.city}, {order.country}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Email Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Offer Price (€)</Label>
            <Input
              id="price"
              type="text"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder="e.g., 2,500 per unit"
            />
            <p className="text-xs text-muted-foreground">
              This will be included in the email for your reference
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your offer message"
              rows={16}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Replace [PRICE] and [TOTAL_PRICE] with actual values before sending
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={sending}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={sending} className="gap-2">
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Offer
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendOfferDialog;
