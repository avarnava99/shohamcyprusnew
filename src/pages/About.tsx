import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            About Shoham
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Shipping and freight forwarding agent in Cyprus since 1946
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="prose prose-lg max-w-none">
          <h2 className="section-title">Our History</h2>
          <p className="text-muted-foreground mb-6">
            Shoham Shipping & Logistics has been a cornerstone of Cyprus's maritime industry 
            since 1946. With the establishment of our sister company, Famagusta General Agency Ltd, 
            we began our journey in providing comprehensive shipping and logistics services.
          </p>
          
          <p className="text-muted-foreground mb-6">
            Over the decades, we have grown to become one of the leading shipping agents in Cyprus, 
            representing major international shipping lines and providing a full range of maritime services.
          </p>

          <h2 className="section-title mt-12">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="font-heading font-semibold text-lg mb-2">ZIM Agency</h3>
              <p className="text-muted-foreground">
                Official representative of ZIM Integrated Shipping Services Ltd in Cyprus.
              </p>
            </div>
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="font-heading font-semibold text-lg mb-2">Port Agency</h3>
              <p className="text-muted-foreground">
                Ship agency for Limassol, Vassiliko, Moni and Dhekelia ports.
              </p>
            </div>
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="font-heading font-semibold text-lg mb-2">Freight Forwarding</h3>
              <p className="text-muted-foreground">
                Complete import and export freight forwarding services.
              </p>
            </div>
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="font-heading font-semibold text-lg mb-2">Customs Clearing</h3>
              <p className="text-muted-foreground">
                Expert customs brokerage and clearance services.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-accent hover:bg-shoham-orange-dark">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
