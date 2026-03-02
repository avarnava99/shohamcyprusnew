import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEO from "@/components/SEO";

const Quote = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        company: formData.company.trim() || null,
        subject: `Quote Request: ${formData.service}`,
        message: formData.message.trim(),
        submission_type: "quote",
      });

      if (error) throw error;

      toast.success("Quote request submitted! We'll contact you shortly.");
      setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO title="Request A Quote" description="Get competitive rates for shipping, freight forwarding, customs clearing, and logistics services in Cyprus." path="/quote" />
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Request A Quote
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Get competitive rates for your shipping needs
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg shadow">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  maxLength={100}
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  maxLength={255}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  maxLength={50}
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  maxLength={100}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="service">Service Required *</Label>
              <Select
                value={formData.service}
                onValueChange={(value) => setFormData({ ...formData, service: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sea-freight">Sea Freight</SelectItem>
                  <SelectItem value="air-freight">Air Freight</SelectItem>
                  <SelectItem value="customs-clearing">Customs Clearing</SelectItem>
                  <SelectItem value="haulage">Haulage</SelectItem>
                  <SelectItem value="car-shipping">Car Shipping</SelectItem>
                  <SelectItem value="chartering">Chartering</SelectItem>
                  <SelectItem value="port-agency">Port Agency</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="message">Details *</Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Please provide details about your shipment: origin, destination, cargo type, weight, dimensions, etc."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                maxLength={1000}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-shoham-orange-dark">
              {loading ? "Submitting..." : "Submit Quote Request"}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Quote;
