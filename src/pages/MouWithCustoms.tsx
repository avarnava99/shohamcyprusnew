import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CONTACT } from "@/constants/contact";
import SEO from "@/components/SEO";
import mouImage from "@/assets/customs-cyprus-mou.webp";

const MouWithCustoms = () => {
  return (
    <Layout>
      <SEO
        title="MOU with Customs"
        description="Shoham Cyprus upholds the Memorandum of Understanding between the Cyprus Shipping Association and Cyprus Customs for the prevention of trade in illegal substances."
        path="/about-us/general-information/mou-with-customs"
      />

      <div className="bg-primary py-16">
        <div className="container-shoham">
          <Link to="/about-us" className="text-white/80 hover:text-white text-sm flex items-center gap-1 mb-4">
            <ArrowLeft className="h-4 w-4" /> About Us
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            MOU with Customs
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Memorandum of Understanding for the prevention of illegal substance trade
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="mb-6">
                <img
                  src={mouImage}
                  alt="Cyprus Customs MOU with Shipping Agents"
                  className="h-32 w-auto"
                />
              </div>

              <h2 className="section-title">Our Commitment</h2>
              <p className="text-muted-foreground mb-4">
                As a member of the Cyprus Shipping Association, Shoham upholds with dedication the
                Memorandum Of Understanding signed in July 1997 between the Cyprus Shipping
                Association and the Cyprus Customs for the prevention of the trade of illegal
                substances.
              </p>
              <p className="text-muted-foreground">
                This agreement reflects our unwavering commitment to operating with the highest
                ethical standards and supporting the efforts of Cyprus Customs in safeguarding
                the country's borders and maintaining the integrity of international trade.
              </p>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="font-heading font-semibold text-lg mb-4">Contact Us</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Have questions about our services? Get in touch with our experienced team.
              </p>
              <Button asChild className="w-full bg-accent hover:bg-[hsl(var(--shoham-orange-dark))]">
                <Link to="/contact-us">Contact Us</Link>
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
                  <div className="text-white/80">{CONTACT.primary.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MouWithCustoms;
