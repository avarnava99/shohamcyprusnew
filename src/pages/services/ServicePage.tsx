import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Service data
const servicesData: Record<string, { title: string; description: string; content: string[] }> = {
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
  "customs": {
    title: "Customs Clearing",
    description: "Famagusta General Agency Ltd is the group's customs brokerage and clearing company.",
    content: [
      "Our experienced staff will deliver to your warehouse anywhere in Cyprus any type of cargo in a fast and efficient manner.",
      "We handle all documentation and customs formalities.",
      "Expert knowledge of Cyprus customs regulations and procedures.",
      "Quick clearance times to minimize delays.",
    ],
  },
  "haulage": {
    title: "Haulage",
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
  "cargo-insurance": {
    title: "Cargo Insurance",
    description: "Peace of mind with comprehensive cargo insurance coverage.",
    content: [
      "All-risk cargo insurance available.",
      "Coverage for sea, air, and land transport.",
      "Quick claims processing.",
      "Competitive premiums.",
    ],
  },
  "tank-containers": {
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
  "travel": {
    title: "Travel Agency",
    description: "Book online flights, hotels and rental cars.",
    content: [
      "Flight bookings worldwide.",
      "Hotel reservations.",
      "Car rental services.",
      "Travel packages and tours.",
    ],
  },
};

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData[slug] : null;

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
            <Button asChild variant="outline" className="w-full">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServicePage;
