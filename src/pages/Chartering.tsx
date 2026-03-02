import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ship, Globe, Users, Clock } from "lucide-react";
import { CONTACT } from "@/constants/contact";
import SEO from "@/components/SEO";

const Chartering = () => {
  return (
    <Layout>
      <SEO title="Chartering" description="Full and part vessel chartering for cargo. Extensive network of fleet owners for the best routes and prices." path="/chartering" />
        <div className="container-shoham">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Chartering
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Full and part vessel chartering for cargo when liner services are not available
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="section-title">Vessel Chartering Services</h2>
              <p className="text-muted-foreground mb-6">
                Shoham provides full and part vessel chartering for cargo when liner services 
                are not available. Our projects team works with an extensive network of fleet 
                owners to find suitable vessels for charter whilst negotiating the best routes 
                and prices.
              </p>
              <p className="text-muted-foreground mb-6">
                With decades of experience in the Cyprus shipping industry, we understand the 
                unique requirements of chartering operations in the Eastern Mediterranean. 
                Whether you need to move project cargo, bulk commodities, or specialized 
                equipment, our team can arrange the right vessel for your needs.
              </p>
            </section>
            
            <section>
              <h3 className="font-heading font-semibold text-xl mb-4">Our Chartering Services Include:</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Full vessel chartering for large cargo movements",
                  "Part chartering for smaller shipments",
                  "Voyage and time charter arrangements",
                  "Competitive rate negotiations",
                  "Project cargo chartering",
                  "Break bulk cargo solutions",
                  "Heavy lift vessel chartering",
                  "Multi-purpose vessel arrangements",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-secondary p-4 rounded-lg">
                    <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-heading font-semibold text-xl mb-4">Why Choose Shoham for Chartering?</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Globe className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Extensive Network</h4>
                    <p className="text-sm text-muted-foreground">
                      Access to a global network of vessel owners and operators
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Expert Team</h4>
                    <p className="text-sm text-muted-foreground">
                      Experienced chartering professionals with local knowledge
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Ship className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Vessel Selection</h4>
                    <p className="text-sm text-muted-foreground">
                      Finding the right vessel type for your specific cargo
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Clock className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Fast Response</h4>
                    <p className="text-sm text-muted-foreground">
                      Quick turnaround on quotes and vessel availability
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex gap-4 pt-4">
              <Button asChild className="bg-accent hover:bg-shoham-orange-dark">
                <Link to="/quote">Request A Quote</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="font-heading font-semibold text-lg mb-4">Contact Our Team</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Need to charter a vessel? Our experienced team is ready to help you find 
                the perfect solution for your cargo.
              </p>
              <div className="space-y-2 text-sm mb-4">
                <p><strong>Phone:</strong> {CONTACT.primary.phone}</p>
                <p><strong>Email:</strong> {CONTACT.primary.email}</p>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link to="/contact-us">Get In Touch</Link>
              </Button>
            </div>

            <div className="bg-card border p-6 rounded-lg">
              <h3 className="font-heading font-semibold text-lg mb-4">Types of Cargo</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Project cargo & heavy lift</li>
                <li>• Break bulk cargo</li>
                <li>• Dry bulk commodities</li>
                <li>• Steel and metal products</li>
                <li>• Construction materials</li>
                <li>• Machinery and equipment</li>
                <li>• Out-of-gauge cargo</li>
              </ul>
            </div>

            <div className="bg-primary text-white p-6 rounded-lg">
              <h3 className="font-heading font-semibold text-lg mb-4">Related Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/port-agency" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                    <ArrowRight className="h-4 w-4" />
                    Port Agency
                  </Link>
                </li>
                <li>
                  <Link to="/services/freight-forwarding" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                    <ArrowRight className="h-4 w-4" />
                    Freight Forwarding
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                    <ArrowRight className="h-4 w-4" />
                    Our Projects
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chartering;
