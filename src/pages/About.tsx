import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, Users, Globe, Ship, Anchor, FileText } from "lucide-react";
import famagustaPainting from "@/assets/famagusta-painting.jpg";
import { CONTACT } from "@/constants/contact";
const About = () => {
  return <Layout>
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">About us</h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Shipping and freight forwarding agent in Cyprus since 1951
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="section-title">Our History</h2>
              <div className="mb-6">
                <img src={famagustaPainting} alt="Historic Port of Famagusta - Painting" className="rounded-lg shadow-lg w-full max-w-md float-right ml-6 mb-4" />
                <p className="text-muted-foreground mb-4">
                  Established in Famagusta in 1951, SHOHAM (CYPRUS) LTD is one of the main liner and 
                  tramp shipping agents in Cyprus. With our vast experience in every aspect of ship 
                  agency and cargo handling activity we serve with dedication the import, export and 
                  transhipment trade of Cyprus.
                </p>
                <p className="text-muted-foreground mb-4">
                  After the Turkish invasion of 1974, when the port of Famagusta was closed, the company 
                  moved to Limassol port. Today we are a team of more than 60 staff members working in 
                  all major ports of Cyprus: Limassol, Larnaca, Vassiliko and Dhekelia.
                </p>
                <p className="text-sm text-muted-foreground italic clear-both">
                  Image: Historic Port of Famagusta
                </p>
              </div>
            </section>

            <section>
              <h2 className="section-title">Our Services</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-secondary p-6 rounded-lg">
                  <Ship className="h-8 w-8 text-accent mb-3" />
                  <h3 className="font-heading font-semibold text-lg mb-2">ZIM Agency</h3>
                  <p className="text-muted-foreground text-sm">
                    Official representative of ZIM Integrated Shipping Services Ltd in Cyprus since 1951.
                  </p>
                </div>
                <div className="bg-secondary p-6 rounded-lg">
                  <Anchor className="h-8 w-8 text-accent mb-3" />
                  <h3 className="font-heading font-semibold text-lg mb-2">Port Agency</h3>
                  <p className="text-muted-foreground text-sm">
                    Full ship agency services for all Cyprus ports including Limassol, Larnaca, Vassiliko and Dhekelia.
                  </p>
                </div>
                <div className="bg-secondary p-6 rounded-lg">
                  <Globe className="h-8 w-8 text-accent mb-3" />
                  <h3 className="font-heading font-semibold text-lg mb-2">Freight Forwarding</h3>
                  <p className="text-muted-foreground text-sm">
                    Complete import and export freight forwarding services by sea, air and land.
                  </p>
                </div>
                <div className="bg-secondary p-6 rounded-lg">
                  <FileText className="h-8 w-8 text-accent mb-3" />
                  <h3 className="font-heading font-semibold text-lg mb-2">Customs Clearing</h3>
                  <p className="text-muted-foreground text-sm">
                    Expert customs brokerage and clearance services for all types of cargo.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="section-title">Professional Affiliations</h2>
              <p className="text-muted-foreground mb-4">
                A number of our staff members are accredited with PQE of the Institute of Chartered 
                Shipbrokers. The Institute of Chartered Shipbrokers is the only internationally 
                recognised professional body in the maritime arena and it represents shipbrokers, 
                ship managers and agents throughout the world.
              </p>
              <p className="text-muted-foreground mb-4">
                Young staff of our company and our company are members and supporters of YoungShip Cyprus. 
                The main objectives of YoungShip Cyprus are to promote dialogue and exchange of ideas 
                and experiences, cooperation among its members, and with the wider maritime community.
              </p>
            </section>

            <section>
              <h2 className="section-title">Why Choose Shoham?</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-accent mb-2">70+</div>
                  <div className="text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-accent mb-2">60+</div>
                  <div className="text-muted-foreground">Team Members</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-accent mb-2">4</div>
                  <div className="text-muted-foreground">Cyprus Ports</div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="font-heading font-semibold text-lg mb-4">Contact Us</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Have questions about our services? Get in touch with our experienced team.
              </p>
              <Button asChild className="w-full bg-accent hover:bg-shoham-orange-dark">
                <Link to="/contact-us">Contact Us</Link>
              </Button>
            </div>

            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="font-heading font-semibold text-lg mb-4">Request A Quote</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Need a quote for shipping or logistics services?
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/quote">Get Quote</Link>
              </Button>
            </div>

            <div className="bg-primary text-white p-6 rounded-lg">
              <h3 className="font-heading font-semibold text-lg mb-4">Our Offices</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold">Limassol (Head Office)</div>
                </div>
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-white/80">{CONTACT.primary.phone}</div>
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-white/80">{CONTACT.mail.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};
export default About;