import { Link } from "react-router-dom";
import { Plane, Car, Package, Anchor, Shield, Container, RefreshCw, Boxes, Plane as Travel } from "lucide-react";

const moreServices = [
  { title: "Air Cargo", description: "Fastest transit time", icon: Plane, href: "/services/air-freight" },
  { title: "Car Shipping", description: "Ship cars from the UK", icon: Car, href: "/services/car-shipping" },
  { title: "Parcel Forwarding", description: "Amazon, eBay from UK & USA", icon: Package, href: "/services/parcel-forwarding" },
  { title: "Marine Logistics", description: "Ship spare parts handling", icon: Anchor, href: "/services/marine-logistics" },
  { title: "Cargo Insurance", description: "Peace of mind", icon: Shield, href: "/services/cargo-insurance" },
  { title: "Tank Containers", description: "Liquid shipments in ISO tanks", icon: Container, href: "/iso-tank" },
  { title: "Used Containers", description: "Buy used containers from us", icon: Boxes, href: "/services/used-containers" },
  { title: "Cross Shipments", description: "Dropshipping and relabeling", icon: RefreshCw, href: "/services/cross-shipments" },
  { title: "Travel Agency", description: "Book flights, hotels & cars", icon: Travel, href: "/services/travel" },
];

const MoreServices = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-shoham">
        <h2 className="section-title text-center mb-12">More Services</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {moreServices.map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className="group flex items-center gap-4 p-4 border border-border rounded hover:border-primary hover:shadow-md transition-all"
            >
              <div className="bg-secondary p-3 rounded group-hover:bg-primary group-hover:text-white transition-colors">
                <service.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreServices;
