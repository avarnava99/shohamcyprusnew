import { Link } from "react-router-dom";
import { ArrowRight, Ship, Truck, Anchor, Fuel, FileCheck, Compass, Package, Building } from "lucide-react";

const services = [
  {
    title: "ZIM Agency",
    description: "Representative of ZIM Integrated Shipping Services Ltd in Cyprus. Export and import containerized services.",
    icon: Ship,
    href: "/zim-agency",
    color: "bg-primary",
  },
  {
    title: "Port Agency",
    description: "Ship agency for the ports of Limassol, Vassiliko, Moni and Dhekelia since 1946.",
    icon: Anchor,
    href: "/port-agency",
    color: "bg-shoham-blue-light",
  },
  {
    title: "Freight Forwarding",
    description: "Over 60 years of dedication in freight forwarding for the benefit of our customers.",
    icon: Package,
    href: "/services/freight-forwarding",
    color: "bg-primary",
  },
  {
    title: "Haulage",
    description: "Extensive land transport and door-to-door services with trusted quality standards.",
    icon: Truck,
    href: "/services/haulage",
    color: "bg-shoham-blue-light",
  },
  {
    title: "Projects",
    description: "Have a look at our projects listed in chronological order.",
    icon: Building,
    href: "/projects",
    color: "bg-primary",
  },
  {
    title: "Oil & Gas Agency",
    description: "Reliable agent for your offshore operations and oil & gas requirements.",
    icon: Fuel,
    href: "/port-agency/oil-gas",
    color: "bg-shoham-blue-light",
  },
  {
    title: "Customs Clearing",
    description: "Experienced staff delivering to your warehouse anywhere in Cyprus.",
    icon: FileCheck,
    href: "/services/customs",
    color: "bg-primary",
  },
  {
    title: "Chartering",
    description: "Full and part vessel chartering when liner services are not available.",
    icon: Compass,
    href: "/chartering",
    color: "bg-shoham-blue-light",
  },
];

const MainServices = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-shoham">
        <h2 className="section-title text-center mb-12">Main Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className="group card-service p-6 hover:-translate-y-1"
            >
              <div className={`${service.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {service.description}
              </p>
              <span className="inline-flex items-center text-sm font-medium text-primary group-hover:text-accent transition-colors">
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainServices;
