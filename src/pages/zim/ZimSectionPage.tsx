import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ExternalLink, Package, Calendar, MapPin, Globe } from "lucide-react";
import { CONTACT } from "@/constants/contact";

interface SectionData {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

const containerTypes = [
  { name: "20' Standard", dimensions: "20' x 8' x 8'6\"", capacity: "33 CBM", maxWeight: "28,200 kg" },
  { name: "40' Standard", dimensions: "40' x 8' x 8'6\"", capacity: "67 CBM", maxWeight: "28,800 kg" },
  { name: "40' High Cube", dimensions: "40' x 8' x 9'6\"", capacity: "76 CBM", maxWeight: "28,600 kg" },
  { name: "20' Reefer", dimensions: "20' x 8' x 8'6\"", capacity: "28 CBM", maxWeight: "27,400 kg" },
  { name: "40' Reefer", dimensions: "40' x 8' x 8'6\"", capacity: "59 CBM", maxWeight: "29,500 kg" },
  { name: "20' Open Top", dimensions: "20' x 8' x 8'6\"", capacity: "32 CBM", maxWeight: "28,100 kg" },
  { name: "40' Open Top", dimensions: "40' x 8' x 8'6\"", capacity: "65 CBM", maxWeight: "28,600 kg" },
  { name: "20' Flat Rack", dimensions: "20' x 8' x 8'6\"", capacity: "N/A", maxWeight: "31,000 kg" },
];

const sectionsData: Record<string, SectionData> = {
  "zim-worldwide": {
    title: "ZIM Worldwide",
    subtitle: "Global Network of ZIM Agents",
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Zim Integrated Shipping Services Ltd is represented worldwide by approximately 180 Agents 
          who will be happy to assist our customers, suppliers or receivers alike with any enquiries.
        </p>
        <div className="bg-secondary p-8 rounded-lg text-center">
          <Globe className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-xl mb-3">Find ZIM Agents Worldwide</h3>
          <p className="text-muted-foreground mb-6">
            Access the complete list of ZIM agents around the world through the official ZIM website.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <a href="https://www.zim.com/contacts/worldwide-offices" target="_blank" rel="noopener noreferrer">
              ZIM Worldwide Offices <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-secondary p-6 rounded-lg">
            <h3 className="font-heading font-semibold text-lg mb-3">Export Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Competitive freight rates</li>
              <li>• Container booking and allocation</li>
              <li>• Documentation support</li>
              <li>• Customs clearance assistance</li>
            </ul>
          </div>
          <div className="bg-secondary p-6 rounded-lg">
            <h3 className="font-heading font-semibold text-lg mb-3">Import Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Arrival notifications</li>
              <li>• Cargo release coordination</li>
              <li>• Delivery arrangements</li>
              <li>• Storage solutions</li>
            </ul>
          </div>
        </div>
        <div className="bg-card border p-6 rounded-lg">
          <h3 className="font-heading font-semibold text-lg mb-3">Trade Routes</h3>
          <p className="text-muted-foreground mb-4">
            ZIM offers containerized shipping services connecting Cyprus to:
          </p>
          <div className="flex flex-wrap gap-2">
            {["Europe", "Israel", "USA", "Far East", "Mediterranean", "Black Sea", "Middle East", "Africa"].map((route) => (
              <span key={route} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {route}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  },
  "zim-container-types": {
    title: "ZIM Container Types",
    subtitle: "Available Container Options",
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          ZIM offers a wide range of container types to suit various cargo requirements. 
          From standard dry containers to specialized equipment for temperature-controlled 
          and oversized cargo.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {containerTypes.map((container) => (
            <div key={container.name} className="bg-card border p-4 rounded-lg">
              <Package className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-semibold mb-2">{container.name}</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Dimensions: {container.dimensions}</p>
                <p>Capacity: {container.capacity}</p>
                <p>Max Weight: {container.maxWeight}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          * Specifications are approximate and may vary. Contact us for exact specifications.
        </p>
      </div>
    )
  },
  "sailing-schedules": {
    title: "Sailing Schedules",
    subtitle: "ZIM Vessel Schedules",
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Access real-time sailing schedules directly from ZIM's official schedule system. 
          Get accurate departure and arrival times for all ZIM services.
        </p>
        <div className="bg-secondary p-8 rounded-lg text-center">
          <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-xl mb-3">View Live Schedules</h3>
          <p className="text-muted-foreground mb-6">
            Click below to access ZIM's official sailing schedule system
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <a href="https://www.zim.com/schedules" target="_blank" rel="noopener noreferrer">
              ZIM Sailing Schedules <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
        <div className="bg-card border p-6 rounded-lg">
          <h3 className="font-heading font-semibold text-lg mb-3">Need Assistance?</h3>
          <p className="text-muted-foreground">
            Our team can help you find the best sailing options for your cargo. 
            Contact us for personalized schedule recommendations and booking support.
          </p>
        </div>
      </div>
    )
  },
  "track-your-container": {
    title: "Track Your Container",
    subtitle: "Container Tracking Service",
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Track your ZIM container shipments in real-time using ZIM's official tracking system. 
          Get instant updates on your cargo's location and status.
        </p>
        <div className="bg-secondary p-8 rounded-lg text-center">
          <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-xl mb-3">Track Your Shipment</h3>
          <p className="text-muted-foreground mb-6">
            Click below to access ZIM's official container tracking system
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <a href="https://www.zim.com/tools/track-a-shipment" target="_blank" rel="noopener noreferrer">
              ZIM Container Tracking <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border p-6 rounded-lg">
            <h3 className="font-heading font-semibold text-lg mb-3">Track by Container Number</h3>
            <p className="text-muted-foreground text-sm">
              Enter your container number (e.g., ZIMU1234567) to get real-time location and status updates.
            </p>
          </div>
          <div className="bg-card border p-6 rounded-lg">
            <h3 className="font-heading font-semibold text-lg mb-3">Track by Bill of Lading</h3>
            <p className="text-muted-foreground text-sm">
              Use your B/L number to track all containers associated with your shipment.
            </p>
          </div>
        </div>
      </div>
    )
  },
  "marketing-and-sales": {
    title: "ZIM Marketing and Sales",
    subtitle: "Commercial Services & Rate Quotations",
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Shoham Shipping & Logistics, as the exclusive ZIM agent in Cyprus, provides comprehensive 
          marketing and sales support for all your shipping needs. Our dedicated commercial team is 
          here to assist with rate quotations, service inquiries, and partnership opportunities.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-secondary p-6 rounded-lg">
            <h3 className="font-heading font-semibold text-lg mb-3">Rate Quotations</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• Competitive freight rates for all destinations</li>
              <li>• FCL and LCL pricing</li>
              <li>• Special cargo rates</li>
              <li>• Volume contract negotiations</li>
              <li>• Seasonal rate programs</li>
            </ul>
          </div>
          <div className="bg-secondary p-6 rounded-lg">
            <h3 className="font-heading font-semibold text-lg mb-3">Commercial Services</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• New customer onboarding</li>
              <li>• Service route consultations</li>
              <li>• Transit time inquiries</li>
              <li>• Equipment availability</li>
              <li>• Partnership opportunities</li>
            </ul>
          </div>
        </div>

        <div className="bg-card border p-6 rounded-lg">
          <h3 className="font-heading font-semibold text-lg mb-3">Contact Our Sales Team</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">For Rate Inquiries</h4>
              <p className="text-muted-foreground text-sm mb-1">Email: {CONTACT.departments.sales.email}</p>
              <p className="text-muted-foreground text-sm">Phone: {CONTACT.primary.phone}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Business Hours</h4>
              <p className="text-muted-foreground text-sm mb-1">{CONTACT.hours.weekdays}</p>
              <p className="text-muted-foreground text-sm">{CONTACT.hours.weekend}</p>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 p-6 rounded-lg">
          <h3 className="font-heading font-semibold text-lg mb-3">Request a Quote</h3>
          <p className="text-muted-foreground mb-4">
            Need shipping rates? Contact our sales team with the following information:
          </p>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>• Origin and destination ports</li>
            <li>• Cargo type and commodity</li>
            <li>• Container type and quantity</li>
            <li>• Estimated shipping date</li>
            <li>• Any special requirements</li>
          </ul>
        </div>
      </div>
    )
  }
};

const ZimSectionPage = () => {
  const { section } = useParams<{ section: string }>();
  const sectionData = section ? sectionsData[section] : null;

  if (!sectionData) {
    return (
      <Layout>
        <div className="container-shoham py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Section Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested section could not be found.</p>
          <Button asChild>
            <Link to="/zim-agency-in-cyprus">Back to ZIM Agency</Link>
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
            <Link to="/zim-agency-in-cyprus" className="text-white/70 hover:text-white text-sm">
              ← Back to ZIM Agency
            </Link>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
            {sectionData.title}
          </h1>
          <p className="text-white/90 text-lg">{sectionData.subtitle}</p>
        </div>
      </div>

      <div className="container-shoham py-12">
        {sectionData.content}

        <div className="mt-12 pt-8 border-t">
          <h3 className="font-heading font-semibold text-lg mb-4">Other ZIM Services</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(sectionsData)
              .filter(([key]) => key !== section)
              .map(([key, s]) => (
                <Link
                  key={key}
                  to={`/zim-agency-in-cyprus/${key}`}
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

export default ZimSectionPage;
