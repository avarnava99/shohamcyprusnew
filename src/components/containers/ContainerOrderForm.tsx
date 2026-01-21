import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Package, User, MapPin, Truck, Send } from "lucide-react";
import LocationPicker from "./LocationPicker";

const containerTypes = [
  { value: "20ft-used", label: "20'FT - Used Cargo Worthy" },
  { value: "40ft-used", label: "40'FT - Used Cargo Worthy" },
  { value: "40ft-hc-used", label: "40'FT HC - Used Cargo Worthy" },
  { value: "45ft-hc-used", label: "45'FT HC - Used Cargo Worthy" },
  { value: "20ft-new", label: "20'FT - New" },
  { value: "20ft-hc-new", label: "20'FT HC - New" },
  { value: "40ft-hc-new", label: "40'FT HC - New" },
  { value: "40ft-hc-3-4-years", label: "40'FT HC (3-4 Years Old)" },
];

const countries = [
  "Cyprus",
  "Greece",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Netherlands",
  "Other",
];

interface ContainerOrderFormProps {
  onSuccess?: () => void;
}

const ContainerOrderForm = ({ onSuccess }: ContainerOrderFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Contact
    name: "",
    email: "",
    phone: "",
    company: "",
    // Container
    containerType: "",
    quantity: 1,
    // Address
    streetAddress: "",
    addressLine2: "",
    city: "",
    stateRegion: "",
    postalCode: "",
    country: "Cyprus",
    // Map location
    latitude: null as number | null,
    longitude: null as number | null,
    locationAddress: "",
    // Options
    craneUnloading: false,
    comments: "",
  });

  const handleLocationSelect = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      latitude: location.latitude,
      longitude: location.longitude,
      locationAddress: location.address,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to container_orders table
      const { error: dbError } = await supabase.from("container_orders").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || null,
        container_type: formData.containerType,
        quantity: formData.quantity,
        street_address: formData.streetAddress,
        address_line_2: formData.addressLine2 || null,
        city: formData.city,
        state_region: formData.stateRegion || null,
        postal_code: formData.postalCode,
        country: formData.country,
        latitude: formData.latitude,
        longitude: formData.longitude,
        location_address: formData.locationAddress || null,
        crane_unloading: formData.craneUnloading,
        comments: formData.comments || null,
      });

      if (dbError) throw dbError;

      // Send email notification
      try {
        await supabase.functions.invoke("send-contact-notification", {
          body: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            subject: `Container Order: ${containerTypes.find(c => c.value === formData.containerType)?.label || formData.containerType}`,
            message: buildOrderMessage(),
            submissionType: "container_order",
          },
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }

      toast.success("Your container order request has been submitted! We'll contact you shortly.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        containerType: "",
        quantity: 1,
        streetAddress: "",
        addressLine2: "",
        city: "",
        stateRegion: "",
        postalCode: "",
        country: "Cyprus",
        latitude: null,
        longitude: null,
        locationAddress: "",
        craneUnloading: false,
        comments: "",
      });

      onSuccess?.();
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const buildOrderMessage = () => {
    const containerLabel = containerTypes.find(c => c.value === formData.containerType)?.label || formData.containerType;
    
    let message = `
CONTAINER ORDER REQUEST

Container Details:
- Type: ${containerLabel}
- Quantity: ${formData.quantity}

Delivery Address:
- Street: ${formData.streetAddress}
${formData.addressLine2 ? `- Address Line 2: ${formData.addressLine2}` : ""}
- City: ${formData.city}
${formData.stateRegion ? `- State/Region: ${formData.stateRegion}` : ""}
- Postal Code: ${formData.postalCode}
- Country: ${formData.country}

Crane Unloading Required: ${formData.craneUnloading ? "Yes" : "No"}
`;

    if (formData.latitude && formData.longitude) {
      message += `
Map Location:
- Coordinates: ${formData.latitude.toFixed(6)}, ${formData.longitude.toFixed(6)}
- Address: ${formData.locationAddress}
- Google Maps: https://www.google.com/maps?q=${formData.latitude},${formData.longitude}
`;
    }

    if (formData.comments) {
      message += `
Additional Comments:
${formData.comments}
`;
    }

    return message;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-accent" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="order-name">Name *</Label>
            <Input
              id="order-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="order-email">Email *</Label>
            <Input
              id="order-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="order-phone">Phone *</Label>
            <Input
              id="order-phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+357 XX XXX XXX"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="order-company">Company</Label>
            <Input
              id="order-company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Your company (optional)"
            />
          </div>
        </CardContent>
      </Card>

      {/* Container Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package className="h-5 w-5 text-accent" />
            Container Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="container-type">Container Type *</Label>
            <Select
              value={formData.containerType}
              onValueChange={(value) => setFormData({ ...formData, containerType: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select container type" />
              </SelectTrigger>
              <SelectContent>
                {containerTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity *</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              required
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Delivery Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-accent" />
            Delivery Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="street-address">Street Address *</Label>
              <Input
                id="street-address"
                required
                value={formData.streetAddress}
                onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                placeholder="Street name and number"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address-line-2">Address Line 2</Label>
              <Input
                id="address-line-2"
                value={formData.addressLine2}
                onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="City"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state-region">State/Region</Label>
              <Input
                id="state-region"
                value={formData.stateRegion}
                onChange={(e) => setFormData({ ...formData, stateRegion: e.target.value })}
                placeholder="State or region (optional)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal-code">Postal Code *</Label>
              <Input
                id="postal-code"
                required
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                placeholder="Postal / ZIP code"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => setFormData({ ...formData, country: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Map Location Picker */}
          <div className="space-y-2 pt-4 border-t">
            <Label>Select Exact Delivery Location (Optional)</Label>
            <LocationPicker onLocationSelect={handleLocationSelect} />
          </div>
        </CardContent>
      </Card>

      {/* Unloading Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Truck className="h-5 w-5 text-accent" />
            Unloading Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Do you require crane unloading? *</Label>
            <RadioGroup
              value={formData.craneUnloading ? "yes" : "no"}
              onValueChange={(value) => setFormData({ ...formData, craneUnloading: value === "yes" })}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="crane-yes" />
                <Label htmlFor="crane-yes" className="cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="crane-no" />
                <Label htmlFor="crane-no" className="cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comments">Comments / Special Instructions</Label>
            <Textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              placeholder="Any specific requirements, access instructions, or notes for the delivery..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full bg-accent hover:bg-accent/90"
        disabled={loading}
      >
        {loading ? (
          "Submitting..."
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Submit Order Request
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting this form, you agree to be contacted regarding your container order.
        Our team will review your request and provide a detailed quote.
      </p>
    </form>
  );
};

export default ContainerOrderForm;
