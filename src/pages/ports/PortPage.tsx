import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Anchor, Ship, Fuel, Calendar, MapPin, Container, Phone, Mail } from "lucide-react";
import LimassolPortDetails from "@/components/port/LimassolPortDetails";
import LimassolScheduleDetails from "@/components/port/LimassolScheduleDetails";
import EurogatePortDetails from "@/components/port/EurogatePortDetails";
import VassilikoPortDetails from "@/components/port/VassilikoPortDetails";
import VTTVTerminalDetails from "@/components/port/VTTVTerminalDetails";
import { CONTACT } from "@/constants/contact";
import SEO from "@/components/SEO";

interface PortData {
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  services: string[];
  icon: React.ReactNode;
}

const portsData: Record<string, PortData> = {
  "limassol-port": {
    title: "Limassol Port",
    subtitle: "Cyprus' Main Commercial Port - DP World Multipurpose Terminal",
    description: "Limassol Port is the largest and busiest port in Cyprus, handling the majority of the island's container traffic and general cargo. As the main commercial gateway, it serves as the primary hub for import and export activities.",
    details: [
      "Main container terminal with modern handling facilities",
      "Multipurpose terminal for general cargo",
      "Passenger terminal for cruise ships",
      "Direct connections to major shipping routes"
    ],
    services: [
      "Container handling and storage",
      "General cargo operations",
      "Vessel clearance and documentation",
      "Customs coordination",
      "Stevedoring services"
    ],
    icon: <Anchor className="w-12 h-12" />
  },
  "limassol-container-terminal": {
    title: "Limassol Container Terminal",
    subtitle: "Eurogate Container Terminal - Cyprus' Dedicated Container Hub",
    description: "EUROGATE Container Terminal Limassol (CTL) is Cyprus' dedicated container handling facility, operated by EUROGATE since 2016. With state-of-the-art STS gantry cranes and modern yard equipment, CTL handles container traffic with efficiency and precision.",
    details: [
      "5 STS gantry cranes including Super Post-Panamax",
      "800m total quay length with 16m maximum draft",
      "12,000 TEU yard capacity with 140 reefer plugs",
      "Annual capacity of approximately 750,000 TEU"
    ],
    services: [
      "Container loading and discharging",
      "Reefer container services with 24/7 monitoring",
      "IMDG dangerous goods handling",
      "90-day customs bonded storage",
      "EDI interfaces via INFOGATE portal"
    ],
    icon: <Container className="w-12 h-12" />
  },
  "limassol-port-schedule": {
    title: "Limassol Port Schedule",
    subtitle: "Vessel Arrivals and Departures",
    description: "Stay updated with real-time vessel schedules for Limassol Port. Our team provides accurate and timely information on all vessel movements.",
    details: [
      "Daily updated vessel arrival schedule",
      "Departure notifications and ETAs",
      "Berth allocation information",
      "Weather-related schedule updates"
    ],
    services: [
      "Schedule coordination",
      "Berth booking assistance",
      "Real-time updates to principals",
      "Port authority liaison"
    ],
    icon: <Calendar className="w-12 h-12" />
  },
  "limassol-port-anchorage": {
    title: "Limassol Port Anchorage",
    subtitle: "Anchorage Services and Coordination",
    description: "Comprehensive anchorage services for vessels awaiting berth or conducting offshore operations in Limassol anchorage area.",
    details: [
      "Strategic anchorage positions",
      "Safe and monitored anchorage areas",
      "Coordination with port control",
      "Weather monitoring and advisories"
    ],
    services: [
      "Anchorage booking and coordination",
      "Launch services for crew and supplies",
      "Bunkering at anchorage",
      "Ship-to-ship operations"
    ],
    icon: <Anchor className="w-12 h-12" />
  },
  "limassol-cruise-terminal": {
    title: "Limassol Cruise Terminal",
    subtitle: "Premium Cruise Ship Services",
    description: "The Limassol Cruise Terminal welcomes cruise vessels with world-class facilities and services, offering passengers a gateway to Cyprus' rich cultural heritage.",
    details: [
      "Modern passenger terminal facilities",
      "Capacity for large cruise vessels",
      "Shore excursion coordination",
      "VIP and group handling"
    ],
    services: [
      "Cruise ship agency",
      "Passenger handling",
      "Shore excursion coordination",
      "Crew services and logistics"
    ],
    icon: <Ship className="w-12 h-12" />
  },
  "larnaca-port": {
    title: "Larnaca Port",
    subtitle: "Cyprus' Secondary Commercial Port",
    description: "Larnaca Port serves as Cyprus' secondary commercial port, handling general cargo, bulk commodities, and providing support for the offshore oil and gas industry.",
    details: [
      "General cargo and bulk handling",
      "Offshore support base",
      "Fishing port facilities",
      "Marina and yacht services"
    ],
    services: [
      "Port agency services",
      "Cargo handling coordination",
      "Offshore logistics support",
      "Vessel clearance"
    ],
    icon: <Anchor className="w-12 h-12" />
  },
  "larnaca-oil-terminal": {
    title: "Larnaca Oil Terminal",
    subtitle: "Petroleum Products Terminal",
    description: "The Larnaca Oil Terminal handles petroleum product imports and distribution, serving as a key facility for Cyprus' energy sector.",
    details: [
      "Petroleum products import terminal",
      "Storage tank facilities",
      "Pipeline connections",
      "Safety and environmental compliance"
    ],
    services: [
      "Tanker agency services",
      "Cargo documentation",
      "Safety coordination",
      "Port authority liaison"
    ],
    icon: <Fuel className="w-12 h-12" />
  },
  "vassiliko-port": {
    title: "Vassiliko Cement Port Facility",
    subtitle: "Industrial Bulk & Liquid Cargo Terminal",
    description: "Vassiliko Cement Port Facility is an industrial harbor on the South Coast of Cyprus, operated by Vassiliko Cement Works Public Company Ltd. The port handles dry bulk cargoes (clinker, cement, scrap iron, pet coke), liquid cargoes (fuels, chemicals, LPG), and features Ro-Ro capabilities.",
    details: [
      "565m total quay length with 9.0m depth at LW",
      "4 tugboats available (up to 80 BPT)",
      "45,000 m² open storage area",
      "Annual traffic: 300-400 vessels, 1.5-2.5M tons cargo"
    ],
    services: [
      "Dry bulk cargo handling (cement, clinker, scrap)",
      "Liquid & LPG cargo operations",
      "Ro-Ro berth facilities",
      "ISPS compliant terminal operations"
    ],
    icon: <Ship className="w-12 h-12" />
  },
  "vassiliko-oil-terminal": {
    title: "Vassiliko Oil Terminal",
    subtitle: "EAC Power Station Fuel Terminal (SBM)",
    description: "The Vassiliko Oil Terminal serves the Electricity Authority of Cyprus (EAC) Vasilikos Power Station - Cyprus' largest power generation facility producing approximately 65% of the island's electricity. Vessel mooring is conducted via a Single Buoy Mooring (SBM) system, with fuel unloading carried out through submarine pipelines directly to the power station's storage tanks.",
    details: [
      "Single Buoy Mooring (SBM) offshore system",
      "Submarine pipeline for fuel transfer to shore tanks",
      "Supplies EAC Vasilikos Power Station (860 MW capacity)",
      "Handles Heavy Fuel Oil (HFO) and Diesel fuel",
      "Offshore mooring - no alongside berth"
    ],
    services: [
      "Tanker agency for SBM operations",
      "Coordination with EAC power station",
      "Offshore mooring assistance and supervision",
      "Cargo documentation and customs clearance",
      "Safety compliance and weather monitoring"
    ],
    icon: <Fuel className="w-12 h-12" />
  },
  "vttv-vassiliko-terminal": {
    title: "VTTV Vassiliko Terminal",
    subtitle: "Petroleum Tank Terminal - VTT Vasiliko Ltd",
    description: "VTT Vasiliko Ltd operates a state-of-the-art petroleum tank terminal with a single 'T' formation jetty featuring 4 berths. The terminal handles clean products via shore tanks and both clean and dirty products (fuel oil/crude) via ship-to-ship transfers, operating 24/7/365.",
    details: [
      "4 berths with max 160,000 DWT capacity",
      "Max draft 17m, max LOA 280m",
      "ISPS Code compliant with 24/7 operations",
      "Channel allowable draft: 30m"
    ],
    services: [
      "Clean and dirty petroleum product handling",
      "Ship-to-ship transfer operations",
      "Pigging facilities at Berths 3 & 4",
      "12\" ASME B16.5 Class 150# loading arm connections"
    ],
    icon: <Fuel className="w-12 h-12" />
  },
  "dhekelia-oil-terminal": {
    title: "Dhekelia Oil Terminal",
    subtitle: "EAC Dhekelia Power Station Oil Terminal",
    description: "The Dhekelia Oil Terminal serves the Electricity Authority of Cyprus (EAC) Dhekelia Power Station. Installations are used for unloading fuel from oil tankers for the needs of the power station. Mooring is effected on buoys with unloading carried out through submarine pipelines.",
    details: [
      "Location: Southern coast, approx. 7km E of Larnaca",
      "Open roadstead - no port limits, sea berth only",
      "Controlling depth: 14m",
      "Max vessel: 12.0m draught, 225m L.O.A.",
      "Water density: 1025 kg/m³",
      "Mean tidal levels: 0.30m (abnormal: 0.60m)",
      "Buoy mooring with submarine pipeline unloading",
      "Traffic: ~510,254 tons (2010)"
    ],
    services: [
      "Tanker agency for buoy mooring operations",
      "Oil receiving coordination for EAC Power Station",
      "Cyprus Ports Authority liaison",
      "Cargo documentation and customs clearance",
      "VTS coordination via Larnaca Port Control (VHF Ch. 14, 16)",
      "24-hour ETA notice coordination"
    ],
    icon: <Fuel className="w-12 h-12" />
  },
  "raf-akrotiri-oil-terminal": {
    title: "RAF Akrotiri Oil Terminal",
    subtitle: "Royal Air Force Base Terminal",
    description: "RAF Akrotiri Oil Terminal provides fuel supply services for the Royal Air Force base, one of the UK's most important overseas military installations.",
    details: [
      "RAF station fuel supply",
      "Aviation fuel handling",
      "Strategic military facility",
      "High-security operations"
    ],
    services: [
      "Specialized tanker agency",
      "Military coordination",
      "Security clearance processing",
      "Fuel cargo documentation"
    ],
    icon: <Fuel className="w-12 h-12" />
  }
};

const PortPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const port = slug ? portsData[slug] : null;

  if (!port) {
    return (
      <Layout>
        <div className="container-shoham py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Port Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested port page could not be found.</p>
          <Button asChild>
            <Link to="/port-agency/ports-in-cyprus">View All Ports</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={port.title}
        description={port.description}
        path={`/port-agency/ports-in-cyprus/${slug}`}
      />
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <div className="mb-2">
            <Link to="/port-agency/ports-in-cyprus" className="text-white/70 hover:text-white text-sm">
              ← Back to Ports of Cyprus
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-white">{port.icon}</div>
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-white">
                {port.title}
              </h1>
              <p className="text-white/90 text-lg">{port.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-shoham py-12">
        {/* Show enhanced details for specific ports */}
        {slug === "limassol-port" ? (
          <LimassolPortDetails />
        ) : slug === "limassol-port-schedule" ? (
          <LimassolScheduleDetails />
        ) : slug === "limassol-container-terminal" ? (
          <EurogatePortDetails />
        ) : slug === "vassiliko-port" ? (
          <VassilikoPortDetails />
        ) : slug === "vttv-vassiliko-terminal" ? (
          <VTTVTerminalDetails />
        ) : (
          <>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="section-title">Overview</h2>
                <p className="text-muted-foreground mb-8">{port.description}</p>

                <h3 className="font-heading font-semibold text-xl mb-4">Key Information</h3>
                <ul className="space-y-2 mb-8">
                  {port.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="font-heading font-semibold text-xl mb-4">Our Services</h3>
                <ul className="space-y-2">
                  {port.services.map((service, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Ship className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-secondary p-6 rounded-lg sticky top-24">
                  <h3 className="font-heading font-semibold text-lg mb-4">Need Assistance?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact our port agency team for comprehensive support at {port.title}.
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
              <h3 className="font-heading font-semibold text-lg mb-4">Other Ports</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(portsData)
                  .filter(([key]) => key !== slug)
                  .slice(0, 6)
                  .map(([key, p]) => (
                    <Link
                      key={key}
                      to={`/port-agency/ports-in-cyprus/${key}`}
                      className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
                    >
                      {p.title}
                    </Link>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default PortPage;
