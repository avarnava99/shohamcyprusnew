import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plane, Hotel, Car, Globe, ExternalLink, CheckCircle } from "lucide-react";
import SEO from "@/components/SEO";

const TravelAgency = () => {
  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Travel Agency
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            IATA Authorized Agent - Full Member of ACTA
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="section-title">Shoham Travel Services</h2>
            <p className="text-muted-foreground mb-6">
              As an IATA authorized agent and full member of ACTA (Association of Cyprus Travel Agents), 
              Shoham Travel offers comprehensive travel services for both business and leisure travelers.
            </p>
            <p className="text-muted-foreground mb-6">
              Our experienced travel consultants provide personalized service to ensure your travel 
              arrangements are handled professionally and efficiently.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>IATA Authorized Agent</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Full Member of ACTA</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Competitive Rates Worldwide</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>24/7 Customer Support</span>
              </div>
            </div>

            <Button asChild className="bg-accent hover:bg-shoham-orange-dark">
              <a href="https://www.shohamtravel.com.cy" target="_blank" rel="noopener noreferrer">
                Visit Shoham Travel Website <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>

          <div className="bg-secondary p-8 rounded-lg">
            <Globe className="w-16 h-16 text-primary mb-6" />
            <h3 className="font-heading font-semibold text-xl mb-4">
              Your One-Stop Travel Solution
            </h3>
            <p className="text-muted-foreground">
              Whether you're traveling for business or pleasure, our team is here to help you 
              plan the perfect trip. From flights and hotels to car rentals and complete packages, 
              we've got you covered.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card border p-6 rounded-lg text-center">
            <Plane className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-lg mb-3">Flight Bookings</h3>
            <p className="text-muted-foreground text-sm">
              Access to all major airlines with competitive fares. Business class, economy, 
              and first class options available worldwide.
            </p>
          </div>

          <div className="bg-card border p-6 rounded-lg text-center">
            <Hotel className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-lg mb-3">Hotel Reservations</h3>
            <p className="text-muted-foreground text-sm">
              From budget-friendly accommodations to luxury resorts. Special corporate rates 
              for business travelers.
            </p>
          </div>

          <div className="bg-card border p-6 rounded-lg text-center">
            <Car className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-lg mb-3">Car Hire</h3>
            <p className="text-muted-foreground text-sm">
              Rent cars at destinations worldwide. All vehicle types available from 
              economy to luxury.
            </p>
          </div>
        </div>

        <div className="bg-card border p-8 rounded-lg">
          <h3 className="font-heading font-semibold text-xl mb-4">Corporate Travel Services</h3>
          <p className="text-muted-foreground mb-6">
            We specialize in corporate travel management, offering companies streamlined booking 
            processes, cost control, and dedicated account management. Contact us to set up a 
            corporate travel account.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
              <span className="text-sm">Dedicated account manager</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
              <span className="text-sm">Monthly billing options</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
              <span className="text-sm">Travel policy compliance</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
              <span className="text-sm">Detailed reporting</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center">
          <h3 className="font-heading font-semibold text-lg mb-4">Ready to Book Your Trip?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Visit our dedicated travel website or contact our travel team directly 
            for personalized assistance with your travel plans.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-accent hover:bg-shoham-orange-dark">
              <a href="https://www.shohamtravel.com.cy" target="_blank" rel="noopener noreferrer">
                Shoham Travel Website <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact-us">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TravelAgency;
