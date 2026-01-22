import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Fuel, Users, Ship, Shield, Wrench, FileText, Anchor, Phone, Mail } from "lucide-react";
import { CONTACT } from "@/constants/contact";

interface SectionData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  services: string[];
  details: string[];
}

const sectionsData: Record<string, SectionData> = {
  "oil-gas-agency": {
    title: "Oil & Gas Agency",
    subtitle: "Offshore Operations Support",
    icon: <Fuel className="w-12 h-12" />,
    description: "Comprehensive agency services for the offshore oil and gas industry. Our experienced team provides full support for supply vessels, tankers, and offshore support vessels operating in Cyprus waters.",
    services: [
      "Supply vessel agency",
      "Offshore support vessel coordination",
      "Crew logistics and transfers",
      "Stores and provisions supply",
      "Bunkering arrangements",
      "Emergency response support"
    ],
    details: [
      "24/7 operations support",
      "Experienced oil & gas team",
      "Direct coordination with offshore platforms",
      "Compliance with international safety standards",
      "Fast turnaround for urgent requirements"
    ]
  },
  "crew-changes": {
    title: "Crew Changes",
    subtitle: "Crew Logistics and Coordination",
    icon: <Users className="w-12 h-12" />,
    description: "Professional crew change services ensuring smooth transitions for vessel crew members. We handle all logistics from travel arrangements to port formalities.",
    services: [
      "Sign-on/sign-off coordination",
      "Travel and accommodation arrangements",
      "Airport transfers",
      "Immigration and visa support",
      "Medical examinations coordination",
      "COVID-19 protocol compliance"
    ],
    details: [
      "Partnerships with local hotels",
      "24/7 crew change support",
      "Multi-language assistance",
      "Competitive rates for crew logistics",
      "Documentation handling"
    ]
  },
  "sts-operations": {
    title: "STS Operations",
    subtitle: "Ship-to-Ship Transfer Services",
    icon: <Ship className="w-12 h-12" />,
    description: "Expert coordination of ship-to-ship transfer operations in Cyprus waters. We provide full agency support for STS operations including oil, LPG, and LNG transfers.",
    services: [
      "STS operation coordination",
      "Fender and hose arrangements",
      "Mooring master coordination",
      "Cargo surveyor liaison",
      "Weather monitoring",
      "Port authority approvals"
    ],
    details: [
      "Experienced STS coordination team",
      "Compliance with OCIMF guidelines",
      "Strategic anchorage positions",
      "Full documentation support",
      "24/7 operations monitoring"
    ]
  },
  "owners-protecting-agency": {
    title: "Owners Protecting Agency",
    subtitle: "Independent Protecting Services",
    icon: <Shield className="w-12 h-12" />,
    description: "Independent protecting agency services to safeguard owners' interests during port calls, cargo operations, and vessel inspections.",
    services: [
      "Independent supervision of operations",
      "Cargo quantity monitoring",
      "Time sheet verification",
      "Statement of facts preparation",
      "Damage survey coordination",
      "Port cost monitoring"
    ],
    details: [
      "Impartial representation",
      "Detailed reporting",
      "Cost-effective solutions",
      "Experienced marine personnel",
      "Proactive issue resolution"
    ]
  },
  "drydock-service": {
    title: "DryDock Service",
    subtitle: "Drydock Coordination and Support",
    icon: <Wrench className="w-12 h-12" />,
    description: "Full agency support for vessels undergoing drydock repairs in Cyprus. We coordinate all aspects of the drydock call to ensure efficient turnaround.",
    services: [
      "Drydock booking assistance",
      "Yard liaison and coordination",
      "Spare parts logistics",
      "Technical team support",
      "Classification society coordination",
      "Crew welfare services"
    ],
    details: [
      "Relationships with local shipyards",
      "Extended stay support",
      "Supply chain coordination",
      "Accommodation arrangements",
      "Technical personnel assistance"
    ]
  },
  "vessel-repairs": {
    title: "Vessel Repairs",
    subtitle: "Repair Coordination Services",
    icon: <Wrench className="w-12 h-12" />,
    description: "Coordination of vessel repairs at port or anchorage. We connect vessels with qualified local contractors and oversee repair operations.",
    services: [
      "Contractor sourcing and vetting",
      "Repair quotation coordination",
      "Spare parts procurement",
      "Diving services arrangement",
      "Technical inspections",
      "Quality control supervision"
    ],
    details: [
      "Network of qualified contractors",
      "Competitive pricing",
      "Quality assurance",
      "Rapid response for emergencies",
      "Full documentation and reporting"
    ]
  },
  "change-of-ownership": {
    title: "Change of Ownership",
    subtitle: "Ownership Transfer Services",
    icon: <FileText className="w-12 h-12" />,
    description: "Complete agency support for vessel ownership changes in Cyprus. We handle all formalities and coordinate between buyers, sellers, and authorities.",
    services: [
      "Protocol of delivery coordination",
      "Flag state documentation",
      "Classification transfers",
      "Crew handover arrangements",
      "Port authority notifications",
      "Banking coordination"
    ],
    details: [
      "Experience with major flag states",
      "Legal liaison support",
      "Confidential handling",
      "Smooth transition management",
      "Post-sale support"
    ]
  },
  "yacht-agency": {
    title: "Yacht Agency",
    subtitle: "Yacht and Superyacht Services",
    icon: <Anchor className="w-12 h-12" />,
    description: "Premium agency services for yachts and superyachts visiting Cyprus. Personalized attention and discrete, professional service.",
    services: [
      "Marina berth reservations",
      "Customs and immigration clearance",
      "Provisioning and stores",
      "Crew services and shore leave",
      "Technical support coordination",
      "VIP arrangements"
    ],
    details: [
      "Limassol Marina connections",
      "Discrete professional service",
      "Concierge-style support",
      "24/7 availability",
      "Premium supplier network"
    ]
  }
};

const PortAgencySectionPage = () => {
  const { section } = useParams<{ section: string }>();
  const sectionData = section ? sectionsData[section] : null;

  if (!sectionData) {
    return (
      <Layout>
        <div className="container-shoham py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested service could not be found.</p>
          <Button asChild>
            <Link to="/port-agency">Back to Port Agency</Link>
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
            <Link to="/port-agency" className="text-white/70 hover:text-white text-sm">
              ← Back to Port Agency
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-white">{sectionData.icon}</div>
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-white">
                {sectionData.title}
              </h1>
              <p className="text-white/90 text-lg">{sectionData.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="section-title">Overview</h2>
            <p className="text-muted-foreground mb-8">{sectionData.description}</p>

            <h3 className="font-heading font-semibold text-xl mb-4">Services We Provide</h3>
            <div className="grid md:grid-cols-2 gap-3 mb-8">
              {sectionData.services.map((service, index) => (
                <div key={index} className="flex items-center gap-2 bg-secondary p-3 rounded-lg">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                  <span className="text-sm">{service}</span>
                </div>
              ))}
            </div>

            <h3 className="font-heading font-semibold text-xl mb-4">Why Choose Us</h3>
            <ul className="space-y-2">
              {sectionData.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-secondary p-6 rounded-lg sticky top-24">
              <h3 className="font-heading font-semibold text-lg mb-4">Get Started</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contact our team to discuss your {sectionData.title.toLowerCase()} requirements.
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
              <div className="space-y-3">
                <Button asChild className="w-full bg-accent hover:bg-shoham-orange-dark">
                  <Link to="/quote">Request Quote</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/contact-us">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <h3 className="font-heading font-semibold text-lg mb-4">Other Port Agency Services</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(sectionsData)
              .filter(([key]) => key !== section)
              .map(([key, s]) => (
                <Link
                  key={key}
                  to={`/port-agency/${key}`}
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

export default PortAgencySectionPage;
