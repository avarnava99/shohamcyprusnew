import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import famagustaPainting from "@/assets/famagusta-painting.jpg";
import { 
  Ship, 
  Anchor, 
  Fuel, 
  Navigation, 
  Package, 
  Users, 
  Shield, 
  Droplet, 
  ArrowLeftRight, 
  Flame,
  Wrench,
  Clock,
  FileCheck,
  Sailboat
} from "lucide-react";

const services = [
  { title: "Oil & Gas Agency", href: "/port-agency/oil-gas-agency", description: "Offshore operations and oil & gas support" },
  { title: "Crew Changes", href: "/port-agency/crew-changes", description: "Crew change coordination and logistics" },
  { title: "STS Operations", href: "/port-agency/sts-operations", description: "Ship-to-ship transfer operations" },
  { title: "Owners Protecting Agency", href: "/port-agency/owners-protecting-agency", description: "Protecting agency services" },
  { title: "DryDock Service", href: "/port-agency/drydock-service", description: "Drydock coordination and support" },
  { title: "Vessel Repairs", href: "/port-agency/vessel-repairs", description: "Vessel repair coordination" },
  { title: "Change of Ownership", href: "/port-agency/change-of-ownership", description: "Ownership transfer services" },
  { title: "Yacht Agency", href: "/port-agency/yacht-agency", description: "Yacht and superyacht services" },
];

const vesselTypes = [
  { icon: Ship, title: "Container Vessels", description: "Full container ship agency services" },
  { icon: Anchor, title: "Offshore Supply Vessels", description: "PSV, AHT, and support vessels" },
  { icon: Fuel, title: "Oil & Gas", description: "Offshore platform support" },
  { icon: Navigation, title: "Tugs, PSV, AHT", description: "Anchor handling and tug services" },
  { icon: Package, title: "Bulk Carriers", description: "Grains, pellets, general cargo" },
  { icon: Users, title: "Cruise Ships", description: "Passenger vessel coordination" },
  { icon: Shield, title: "Navy Vessels", description: "Military vessel support" },
  { icon: Droplet, title: "Tankers", description: "Moni, Larnaca, Dhekelia stations" },
  { icon: ArrowLeftRight, title: "STS Operations", description: "Ship-to-ship transfers offshore Cyprus" },
  { icon: Flame, title: "LPG / LNG", description: "Gas carrier services" },
];

import SEO from "@/components/SEO";

const PortAgency = () => {
  return (
    <Layout>
      <SEO title="Port Agency" description="Ship agency for Limassol, Larnaca, Vassiliko ports and oil terminals. All vessel types serviced." path="/port-agency" />
        <div className="container-shoham">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Port Agency
          </h1>
          <p className="text-white/90 text-lg max-w-3xl">
            Ship agency for the ports of Limassol, Larnaca and Vassiliko and oil terminals at Vassiliko, Moni and Dhekelia.
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        {/* Introduction Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="section-title">Comprehensive Port Services</h2>
            <p className="text-muted-foreground mb-4">
              Our Shipping Agency experience dates back to 1946 with the establishment in 
              Famagusta of our 'older' sister company Famagusta General Agency Ltd.
            </p>
            <p className="text-muted-foreground mb-4">
              We will attend with speed and efficiency discharge and load operations of all vessels calling at Cyprus Ports.
            </p>
            <p className="text-muted-foreground mb-6">
              We will oversee crew changes and repatriations, ship spares deliveries, supplies, provisions and bunkering to the vessel as well as vessel's repairs and underwater surveys.
            </p>
            <div className="flex gap-4">
              <Button asChild className="bg-accent hover:bg-shoham-orange-dark">
                <Link to="/contact-us">Contact Us</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/port-agency/ports-in-cyprus">View Ports</Link>
              </Button>
            </div>
          </div>
          <div>
            <img src={famagustaPainting} alt="Historic Port of Famagusta - Painting by George Pol Gheorghiou 1943" className="rounded-lg shadow-xl" />
            <p className="text-sm text-muted-foreground text-center mt-2 italic">The port of Famagusta - Painting by George Pol Gheorghiou - 1943</p>
          </div>
        </div>

        {/* Vessel Types Section */}
        <div className="mb-16">
          <h2 className="section-title">Ship Agency for All Vessel Types</h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            We provide comprehensive ship agency services for vessels of all types calling at Limassol, Larnaca & Vassiliko Cyprus.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {vesselTypes.map((vessel) => (
              <div 
                key={vessel.title}
                className="bg-card p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <vessel.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-sm mb-1">
                  {vessel.title}
                </h3>
                <p className="text-xs text-muted-foreground">{vessel.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <h2 className="section-title">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link 
              key={service.title}
              to={service.href} 
              className="bg-card p-6 rounded-lg shadow hover:shadow-lg transition-shadow group"
            >
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

export default PortAgency;
