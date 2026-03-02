import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lock, Unlock, Phone, Mail, MapPin, Clock, CheckCircle, Package, Truck, ShoppingCart } from "lucide-react";
import { CONTACT } from "@/constants/contact";
import ContainerOrderForm from "@/components/containers/ContainerOrderForm";
import SEO from "@/components/SEO";

const VAT_RATE = 0.19;

const containerPricing = {
  usedCargoWorthy: {
    title: "Used Cargo Worthy Containers (10-12 Years Old)",
    items: [
      { size: "20'FT", priceExVat: 1900 },
      { size: "40'FT", priceExVat: 2400 },
      { size: "40'FT HC", priceExVat: 2700 },
      { size: "45'FT HC", priceExVat: 2900 },
    ],
  },
  newContainers: {
    title: "New Containers",
    items: [
      { size: "20'FT", priceExVat: 3100 },
      { size: "20'FT HC", priceExVat: 3150 },
      { size: "40'FT HC", priceExVat: 4400 },
      { size: "40'FT HC (3-4 Years Old)", priceExVat: 3000 },
    ],
  },
};

const servicePoints = [
  "Purchase new and used containers for storage, shipping, or conversion projects",
  "Wide range of sizes available: 20ft, 40ft, 40ft High Cube, and 45ft High Cube",
  "Cargo-worthy certified containers suitable for international shipping",
  "Competitive pricing with transparent VAT calculations",
  "Delivery and positioning services available upon request",
  "Expert advice on container selection for your specific needs",
];

const UsedContainers = () => {
  const [pricesUnlocked, setPricesUnlocked] = useState(false);
  const [showIncVat, setShowIncVat] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  useEffect(() => {
    const unlocked = localStorage.getItem("containerPriceUnlocked");
    if (unlocked === "true") {
      setPricesUnlocked(true);
    }
  }, []);

  const formatPrice = (priceExVat: number) => {
    const price = showIncVat ? priceExVat * (1 + VAT_RATE) : priceExVat;
    return `€ ${price.toLocaleString("en-CY", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save lead to database
      const { error: dbError } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        subject: "Container Pricing Request",
        message: "User requested to view container pricing",
        submission_type: "container_pricing",
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
            subject: "Container Pricing Request",
            message: "A visitor has requested to view container pricing on the website.",
            submissionType: "container_pricing",
          },
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }

      // Unlock prices
      localStorage.setItem("containerPriceUnlocked", "true");
      setPricesUnlocked(true);
      setModalOpen(false);
      toast.success("Pricing unlocked! Check out our competitive container prices.");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const PricingTable = ({ title, items }: { title: string; items: { size: string; priceExVat: number }[] }) => (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-lg text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Container Size</TableHead>
              <TableHead className="text-right font-semibold">
                Price {showIncVat ? "(Inc. 19% VAT)" : "(Ex. VAT)"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.size}>
                <TableCell className="font-medium">{item.size}</TableCell>
                <TableCell className="text-right">
                  {pricesUnlocked ? (
                    <span className="text-lg font-semibold text-primary">{formatPrice(item.priceExVat)}</span>
                  ) : (
                    <span className="text-lg font-semibold text-muted-foreground blur-sm select-none">€ X,XXX</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Used Container Sales</h1>
            <p className="text-lg md:text-xl text-white/90">
              Quality new and used shipping containers for sale in Cyprus. Perfect for storage, shipping, or conversion projects.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">About This Service</h2>
              <ul className="space-y-3">
                {servicePoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Section */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-foreground">Container Pricing</h2>
                {pricesUnlocked && (
                  <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg">
                    <Label htmlFor="vat-toggle" className="text-sm font-medium cursor-pointer">
                      Ex. VAT
                    </Label>
                    <Switch
                      id="vat-toggle"
                      checked={showIncVat}
                      onCheckedChange={setShowIncVat}
                    />
                    <Label htmlFor="vat-toggle" className="text-sm font-medium cursor-pointer">
                      Inc. VAT (19%)
                    </Label>
                  </div>
                )}
              </div>

              {/* Pricing Tables */}
              <div className="relative">
                <div className={`space-y-6 ${!pricesUnlocked ? "pointer-events-none" : ""}`}>
                  <PricingTable
                    title={containerPricing.usedCargoWorthy.title}
                    items={containerPricing.usedCargoWorthy.items}
                  />
                  <PricingTable
                    title={containerPricing.newContainers.title}
                    items={containerPricing.newContainers.items}
                  />
                </div>

                {/* Overlay for locked state */}
                {!pricesUnlocked && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-lg">
                    <div className="text-center p-8 max-w-md">
                      <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                        <Lock className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Unlock Our Pricing</h3>
                      <p className="text-muted-foreground mb-6">
                        Enter your details to view our competitive container prices. We'll also send you exclusive offers!
                      </p>
                      <Button
                        size="lg"
                        className="bg-accent hover:bg-accent/90"
                        onClick={() => setModalOpen(true)}
                      >
                        <Unlock className="mr-2 h-5 w-5" />
                        Get Pricing Now
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {pricesUnlocked && (
                <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg flex items-start gap-2">
                  <Truck className="h-5 w-5 shrink-0 mt-0.5" />
                  <span>
                    <strong>Note:</strong> Prices exclude delivery and positioning. Fill out the order form below for a complete quote including transport to your location.
                  </span>
                </p>
              )}
            </div>

            {/* Container Order Form - Only shown when prices are unlocked */}
            {pricesUnlocked && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Request a Container Quote</h2>
                    <p className="text-muted-foreground">Fill out the form below and we'll get back to you with a detailed quote.</p>
                  </div>
                </div>
                <ContainerOrderForm />
              </div>
            )}

            {/* CTA - Only shown when prices are locked */}
            {!pricesUnlocked && (
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">Need Help Choosing?</h3>
                <p className="text-muted-foreground mb-4">
                  Our team can help you select the right container for your needs. Unlock pricing first, then fill out the order form.
                </p>
                <Button
                  className="bg-accent hover:bg-accent/90"
                  onClick={() => setModalOpen(true)}
                >
                  <Unlock className="mr-2 h-5 w-5" />
                  Unlock Pricing to Order
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-accent" />
                  Quick Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <a href={CONTACT.primary.phoneHref} className="font-medium hover:text-primary">
                      {CONTACT.primary.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <a href={CONTACT.primary.emailHref} className="font-medium hover:text-primary">
                      {CONTACT.primary.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <div className="text-sm text-muted-foreground">Address</div>
                    <span className="font-medium">{CONTACT.address.short}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <div className="text-sm text-muted-foreground">Hours</div>
                    <span className="font-medium">{CONTACT.hours.weekdays}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Other Services */}
            <Card>
              <CardHeader>
                <CardTitle>Other Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    { name: "Container Tracking", href: "/services/container-tracking" },
                    { name: "Container Homes", href: "/container-homes" },
                    { name: "Freight Forwarding", href: "/services/freight-forwarding" },
                    { name: "Haulage Services", href: "/services/haulage" },
                  ].map((service) => (
                    <li key={service.href}>
                      <Link
                        to={service.href}
                        className="text-primary hover:underline hover:text-accent transition-colors"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Lead Capture Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Unlock className="h-5 w-5 text-accent" />
              Get Container Pricing
            </DialogTitle>
            <DialogDescription>
              Enter your details below to instantly view our container prices. We respect your privacy.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+357 XX XXX XXX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Your company (optional)"
              />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={loading}>
              {loading ? "Unlocking..." : "Unlock Pricing"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              By submitting, you agree to receive updates about our container services.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default UsedContainers;
