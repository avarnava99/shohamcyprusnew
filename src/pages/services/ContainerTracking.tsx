import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Ship, 
  Plane, 
  Package, 
  Navigation, 
  Brain, 
  LayoutDashboard,
  ExternalLink,
  ArrowRight
} from "lucide-react";

const trackingCapabilities = [
  {
    icon: Ship,
    title: "Ocean Tracking",
    description: "Track containers across 14+ major shipping lines including ZIM, MSC, Maersk, and more.",
  },
  {
    icon: Plane,
    title: "Air Cargo",
    description: "Monitor air freight shipments with AWB tracking across global airlines.",
  },
  {
    icon: Package,
    title: "Courier Tracking",
    description: "50+ courier carriers including DHL, FedEx, UPS, and local Cyprus couriers.",
  },
  {
    icon: Navigation,
    title: "Vessel Tracking",
    description: "Live vessel positions with AIS integration for real-time ship monitoring.",
  },
  {
    icon: Brain,
    title: "AI-Powered ETAs",
    description: "Smart ETA predictions using machine learning for better supply chain planning.",
  },
  {
    icon: LayoutDashboard,
    title: "Unified Dashboard",
    description: "All your shipments in one place - ocean, air, and courier combined.",
  },
];

const ContainerTracking = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <div className="mb-2">
            <Link to="/services" className="text-white/70 hover:text-white text-sm">
              ← Back to Services
            </Link>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Container Tracking
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Powered by Shyppy - Your Complete Shipping Control Tower
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shyppy Main CTA Card */}
            <Card className="border-2 border-accent bg-gradient-to-br from-accent/5 to-accent/10 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent text-white p-3 rounded-lg">
                    <Ship className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-foreground">
                      Shyppy
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Complete Shipment Visibility Platform
                    </p>
                  </div>
                </div>
                
                <p className="text-foreground mb-6 text-lg leading-relaxed">
                  Track containers, parcels, air cargo, and vessels all in one unified platform. 
                  Get real-time updates, AI-powered ETA predictions, and automated notifications 
                  for every shipment milestone.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-white"
                  >
                    <a 
                      href="https://shyppy.cy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      Track Your Shipment
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg"
                  >
                    <a 
                      href="https://shyppy.cy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Learn More About Shyppy
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Capabilities Grid */}
            <div>
              <h2 className="section-title">Tracking Capabilities</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {trackingCapabilities.map((capability, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                          <capability.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">
                            {capability.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {capability.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* ZIM Direct Tracking */}
            <Card className="bg-secondary">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-1">
                      Track ZIM Containers Directly
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Already have a ZIM container number? Track it directly through ZIM's portal.
                    </p>
                  </div>
                  <Button asChild variant="outline" className="flex-shrink-0">
                    <a 
                      href="https://www.zim.com/tools/track-a-shipment" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      ZIM Tracking
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Benefits List */}
            <div>
              <h2 className="section-title">Why Use Shyppy?</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>One platform to track all your shipments - no more switching between carrier websites.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>AI-powered ETA predictions help you plan warehouse operations more effectively.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>Automated email and SMS notifications for every shipment milestone.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>Free to use - built by Shoham for our customers and partners.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-secondary">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-4">Need Tracking Help?</h3>
                <p className="text-muted-foreground mb-4">
                  Can't find your shipment? Our team is here to help you locate your cargo.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/contact-us">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-secondary">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-4">Ship With Us</h3>
                <p className="text-muted-foreground mb-4">
                  Looking to ship cargo? Get a competitive quote from our freight team.
                </p>
                <Button asChild className="w-full bg-accent hover:bg-accent/90">
                  <Link to="/quote">Request A Quote</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Supported Carriers</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>Ocean:</strong> ZIM, MSC, Maersk, CMA CGM, Hapag-Lloyd, ONE, Evergreen, and more</p>
                  <p><strong>Courier:</strong> DHL, FedEx, UPS, TNT, Aramex, Cyprus Post, ACS, and 40+ more</p>
                  <p><strong>Air:</strong> All major airlines via AWB tracking</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Other Services */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="font-heading font-semibold text-lg mb-4">Other Services</h3>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/services/freight-forwarding"
              className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
            >
              Freight Forwarding
            </Link>
            <Link
              to="/services/customs-clearing"
              className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
            >
              Customs Clearing
            </Link>
            <Link
              to="/services/sea-freight"
              className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
            >
              Sea Freight
            </Link>
            <Link
              to="/services/air-freight"
              className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
            >
              Air Cargo
            </Link>
            <Link
              to="/services/parcel-forwarding"
              className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
            >
              Parcel Forwarding
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContainerTracking;
