import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import portAgency from "@/assets/port-agency.jpg";

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

const PortAgency = () => {
  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Port Agency
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Ship agency for the ports of Limassol, Vassiliko, Moni and Dhekelia
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="section-title">Comprehensive Port Services</h2>
            <p className="text-muted-foreground mb-6">
              Our Shipping Agency experience dates back to 1946 with the establishment in 
              Famagusta of our older sister company Famagusta General Agency Ltd.
            </p>
            <p className="text-muted-foreground mb-6">
              Today, we provide comprehensive port agency services for all major ports in Cyprus, 
              including Limassol, Vassiliko, Moni, and Dhekelia.
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
            <img src={portAgency} alt="Port Agency Services" className="rounded-lg shadow-xl" />
          </div>
        </div>

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
