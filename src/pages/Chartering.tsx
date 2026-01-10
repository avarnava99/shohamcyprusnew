import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Chartering = () => {
  return (
    <Layout>
      <div className="bg-primary py-16">
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
          <div className="lg:col-span-2">
            <h2 className="section-title">Vessel Chartering Services</h2>
            <p className="text-muted-foreground mb-6">
              Shoham provides full and part vessel chartering for cargo when liner services 
              are not available. Our projects team works with an extensive network of fleet 
              owners to find suitable vessels for charter whilst negotiating the best routes 
              and prices.
            </p>
            
            <h3 className="font-heading font-semibold text-lg mb-4">Our Chartering Services Include:</h3>
            <ul className="space-y-3 mb-8">
              {[
                "Full vessel chartering for large cargo movements",
                "Part chartering for smaller shipments",
                "Voyage and time charter arrangements",
                "Competitive rate negotiations",
                "Project cargo chartering",
                "Break bulk cargo solutions",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Button asChild className="bg-accent hover:bg-shoham-orange-dark">
              <Link to="/quote">Request A Quote</Link>
            </Button>
          </div>

          <div className="bg-secondary p-6 rounded-lg h-fit">
            <h3 className="font-heading font-semibold text-lg mb-4">Contact Our Chartering Team</h3>
            <p className="text-muted-foreground mb-4">
              Need to charter a vessel? Our experienced team is ready to help you find 
              the perfect solution for your cargo.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chartering;
