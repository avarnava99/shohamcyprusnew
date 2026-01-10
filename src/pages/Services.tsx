import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Ship, Truck, Package, Plane, Car, Shield, Container, RefreshCw, Boxes, FileCheck, Anchor, Warehouse } from "lucide-react";

const services = [
  { title: "Freight Forwarding", icon: Package, href: "/services/freight-forwarding", description: "Complete import and export freight forwarding" },
  { title: "Customs Clearing", icon: FileCheck, href: "/services/customs-clearing", description: "Expert customs brokerage and clearance" },
  { title: "Haulage", icon: Truck, href: "/services/haulage-container-transport", description: "Container and general cargo transport" },
  { title: "Air Freight", icon: Plane, href: "/services/air-freight", description: "Express air cargo services" },
  { title: "Car Shipping", icon: Car, href: "/services/car-shipping", description: "Vehicle shipping from UK and Europe" },
  { title: "Parcel Forwarding", icon: Package, href: "/services/parcel-forwarding", description: "Online shopping forwarding" },
  { title: "Warehousing", icon: Warehouse, href: "/services/warehousing", description: "Storage and distribution services" },
  { title: "Marine Insurance", icon: Shield, href: "/services/marine-insurance", description: "Comprehensive cargo coverage" },
  { title: "Marine Logistics", icon: Anchor, href: "/services/marine-logistics", description: "Ship spare parts and stores" },
  { title: "Tank Containers", icon: Container, href: "/services/tank-containers", description: "ISO tank solutions for liquids" },
  { title: "Used Containers", icon: Boxes, href: "/services/used-containers", description: "Buy used shipping containers" },
  { title: "Cross Shipments", icon: RefreshCw, href: "/services/cross-shipments", description: "Dropshipping and relabeling" },
];

const Services = () => {
  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Comprehensive shipping and logistics solutions for all your needs
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className="group bg-card p-6 rounded-lg shadow hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Services;
