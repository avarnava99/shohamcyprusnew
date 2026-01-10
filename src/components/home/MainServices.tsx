import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import zimAgencyImg from "@/assets/zim-ship.jpg";
import portAgencyImg from "@/assets/port-agency.jpg";
import freightImg from "@/assets/freight-forwarding.jpg";
import haulageImg from "@/assets/haulage.jpg";
import oilGasImg from "@/assets/oil-gas.jpg";

const services = [
  {
    title: "ZIM Agency",
    description: "Representative of ZIM Integrated Shipping Services Ltd in Cyprus. Export and import containerized services.",
    image: zimAgencyImg,
    href: "/zim-agency",
  },
  {
    title: "Port Agency",
    description: "Ship agency for the ports of Limassol, Vassiliko, Moni and Dhekelia since 1946.",
    image: portAgencyImg,
    href: "/port-agency",
  },
  {
    title: "Freight Forwarding",
    description: "Over 60 years of dedication in freight forwarding for the benefit of our customers.",
    image: freightImg,
    href: "/services/freight-forwarding",
  },
  {
    title: "Haulage",
    description: "Extensive land transport and door-to-door services with trusted quality standards.",
    image: haulageImg,
    href: "/services/haulage",
  },
  {
    title: "Projects",
    description: "Have a look at our projects listed in chronological order.",
    image: portAgencyImg,
    href: "/projects",
  },
  {
    title: "Oil & Gas Agency",
    description: "Reliable agent for your offshore operations and oil & gas requirements.",
    image: oilGasImg,
    href: "/port-agency/oil-gas",
  },
  {
    title: "Customs Clearing",
    description: "Experienced staff delivering to your warehouse anywhere in Cyprus.",
    image: freightImg,
    href: "/services/customs",
  },
  {
    title: "Chartering",
    description: "Full and part vessel chartering when liner services are not available.",
    image: zimAgencyImg,
    href: "/chartering",
  },
];

const MainServices = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container-shoham">
        <h2 className="section-title text-center mb-12">Main Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className="group relative h-64 rounded-lg overflow-hidden shadow-lg"
            >
              {/* Background Image */}
              <img 
                src={service.image} 
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <h3 className="font-heading font-bold text-xl text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-white/80 mb-3 line-clamp-2">
                  {service.description}
                </p>
                <span className="inline-flex items-center text-sm font-semibold text-white group-hover:text-accent transition-colors">
                  READ MORE <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainServices;
