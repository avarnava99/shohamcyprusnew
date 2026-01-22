import { useParams, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { CONTACT } from "@/constants/contact";

// Service data with original URL slugs
const servicesData: Record<string, { title: string; description: string; content: string[]; subpages?: { label: string; href: string }[] }> = {
  "container-tracking": {
    title: "Container Tracking",
    description: "Track your container shipments in real-time.",
    content: [
      "Access real-time container tracking through ZIM's tracking system.",
      "Track by container number or Bill of Lading.",
      "Get instant updates on cargo location and status.",
      "Receive automated notifications for shipment milestones.",
    ],
  },
  "shipping-rates": {
    title: "Shipping Rates",
    description: "Get competitive shipping rates for your cargo.",
    content: [
      "Competitive rates for all shipping routes.",
      "Transparent pricing with no hidden fees.",
      "Volume discounts for regular shippers.",
      "Contact us for a personalized quote.",
    ],
  },
  "sea-freight": {
    title: "Sea Freight",
    description: "Reliable sea freight services connecting Cyprus to the world.",
    content: [
      "FCL (Full Container Load) services.",
      "LCL (Less than Container Load) consolidation.",
      "Regular sailings to major ports worldwide.",
      "Specialized handling for oversized cargo.",
    ],
  },
  "freight-forwarding": {
    title: "Freight Forwarding",
    description: "We are involved with dedication for over 60 years in freight forwarding for the benefit of our numerous customers.",
    content: [
      "Our experienced staff will undertake the import and export procedures for your sea freight.",
      "We offer comprehensive logistics solutions tailored to your specific needs.",
      "Door-to-door delivery services available worldwide.",
      "Real-time tracking and status updates for all shipments.",
    ],
  },
  "customs-clearing": {
    title: "Customs Clearing",
    description: "Famagusta General Agency Ltd is the group's customs brokerage and clearing company.",
    content: [
      "Our experienced staff will deliver to your warehouse anywhere in Cyprus any type of cargo in a fast and efficient manner.",
      "We handle all documentation and customs formalities.",
      "Expert knowledge of Cyprus customs regulations and procedures.",
      "Quick clearance times to minimize delays.",
    ],
    subpages: [
      { label: "Duty Calculator for Cyprus", href: "/services/customs-clearing/duty-calculator-for-cyprus" },
      { label: "EORI Registration Cyprus", href: "/services/customs-clearing/eori-registration-cyprus" },
      { label: "Customs Authority Form 1002", href: "/services/customs-clearing/form-1002" },
      { label: "Transfer of Residence", href: "/services/customs-clearing/transfer-of-residence" },
    ],
  },
  "haulage-container-transport": {
    title: "Haulage & Container Transport",
    description: "Haulage for container and general cargo with extensive land transport services.",
    content: [
      "We provide extensive land transport and door-to-door services.",
      "Offering customers a comprehensive solution with one point of contact.",
      "Trusted quality standards and advanced monitoring.",
      "Fleet of modern vehicles for all cargo types.",
    ],
  },
  "air-freight": {
    title: "Air Cargo",
    description: "Fastest transit time for your urgent shipments.",
    content: [
      "Express air freight services for time-sensitive cargo.",
      "Worldwide network of airline partners.",
      "Door-to-airport and airport-to-door services.",
      "Customs clearance included.",
    ],
  },
  "car-shipping": {
    title: "Car Shipping",
    description: "Ship cars from the UK and Europe to Cyprus.",
    content: [
      "Reliable vehicle shipping services from UK to Cyprus.",
      "Both containerized and RoRo shipping options.",
      "Full insurance coverage available.",
      "Door-to-door collection and delivery.",
    ],
  },
  "parcel-forwarding": {
    title: "Parcel Forwarding",
    description: "Forwarding for online purchases from Amazon, eBay from UK and USA.",
    content: [
      "Shop from UK and USA online stores.",
      "We provide you with a local address for deliveries.",
      "Consolidation services to reduce shipping costs.",
      "Fast and reliable delivery to Cyprus.",
    ],
  },
  "warehousing": {
    title: "Warehousing",
    description: "Secure storage and distribution services for your goods.",
    content: [
      "Modern warehouse facilities in strategic locations.",
      "Short and long-term storage options.",
      "Inventory management and distribution services.",
      "Climate-controlled storage available.",
    ],
  },
  "marine-insurance": {
    title: "Marine Insurance",
    description: "Comprehensive cargo insurance coverage for peace of mind.",
    content: [
      "All-risk cargo insurance available.",
      "Coverage for sea, air, and land transport.",
      "Quick claims processing.",
      "Competitive premiums from leading insurers.",
    ],
  },
  "marine-logistics": {
    title: "Marine Logistics",
    description: "Ship spare parts handling and marine logistics services.",
    content: [
      "Comprehensive marine logistics solutions.",
      "Spare parts delivery to vessels.",
      "Urgent ship stores and provisions.",
      "24/7 service availability.",
    ],
  },
  "iso-tank": {
    title: "Tank Containers",
    description: "Liquid shipments in ISO tank containers.",
    content: [
      "ISO tank container solutions for liquid cargo.",
      "Food grade and chemical tanks available.",
      "Temperature-controlled options.",
      "Global door-to-door service.",
    ],
  },
  "used-containers": {
    title: "Used Container Sales",
    description: "Buy used containers from us for storage or shipping.",
    content: [
      "Wide range of used containers available.",
      "20ft and 40ft standard containers.",
      "Refrigerated containers available.",
      "Delivery to your location.",
    ],
  },
  "cross-shipments": {
    title: "Cross Shipments",
    description: "Dropshipping and relabeling services.",
    content: [
      "Cross-docking and transshipment services.",
      "Relabeling and repackaging options.",
      "Inventory management.",
      "Ideal for e-commerce businesses.",
    ],
  },
};

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  
  // Handle /iso-tank route separately
  const effectiveSlug = location.pathname === "/iso-tank" ? "iso-tank" : slug;
  const service = effectiveSlug ? servicesData[effectiveSlug] : null;

  if (!service) {
    return (
      <Layout>
        <div className="container-shoham py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested service page does not exist.</p>
          <Button asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <div className="mb-2">
            <Link to="/services" className="text-white/70 hover:text-white text-sm">
              ← Back to Services
            </Link>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            {service.title}
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">{service.description}</p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="section-title">About This Service</h2>
            <ul className="space-y-4">
              {service.content.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button asChild className="bg-accent hover:bg-shoham-orange-dark">
                <Link to="/quote">Request A Quote</Link>
              </Button>
            </div>
          </div>

          <div className="bg-secondary p-6 rounded-lg h-fit">
            <h3 className="font-heading font-semibold text-lg mb-4">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              Contact our team for more information about our {service.title.toLowerCase()} services.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <a href={CONTACT.primary.phoneHref} className="flex items-center gap-2 hover:underline">
                <Phone className="h-4 w-4" />
                {CONTACT.primary.phone}
              </a>
              <a href={CONTACT.primary.emailHref} className="flex items-center gap-2 hover:underline">
                <Mail className="h-4 w-4" />
                {CONTACT.primary.email}
              </a>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link to="/contact-us">Contact Us</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <h3 className="font-heading font-semibold text-lg mb-4">Other Services</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(servicesData)
              .filter(([key]) => key !== slug)
              .slice(0, 6)
              .map(([key, s]) => (
                <Link
                  key={key}
                  to={`/services/${key}`}
                  className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
                >
                  {s.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServicePage;
