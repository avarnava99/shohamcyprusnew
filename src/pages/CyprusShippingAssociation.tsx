import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { CONTACT } from "@/constants/contact";
import SEO from "@/components/SEO";
import csaWheel from "@/assets/csa-wheel.webp";
import csaLogo from "@/assets/cyprus-shipping-association.webp";

const CyprusShippingAssociation = () => {
  return (
    <Layout>
      <SEO
        title="Cyprus Shipping Association Membership"
        description="Shoham Cyprus is a proud member of the Cyprus Shipping Association (CSA), operating under the high professional standards established by the Association since 1945."
        path="/about-us/general-information/cyprus-shipping-association"
      />

      <div className="bg-primary py-16">
        <div className="container-shoham">
          <Link to="/about-us" className="text-white/80 hover:text-white text-sm flex items-center gap-1 mb-4">
            <ArrowLeft className="h-4 w-4" /> About Us
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Cyprus Shipping Association
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Proud member operating under the highest professional standards
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <img
                  src={csaWheel}
                  alt="Cyprus Shipping Association wheel logo"
                  className="h-24 w-auto"
                />
                <img
                  src={csaLogo}
                  alt="Cyprus Shipping Association"
                  className="h-16 w-auto"
                />
              </div>

              <h2 className="section-title">Our Membership</h2>
              <p className="text-muted-foreground mb-4">
                As a member of the Cyprus Shipping Association, Shoham is operating strictly under
                the high professional standards set up by the Association.
              </p>
              <p className="text-muted-foreground mb-4">
                All our business activities are governed by the "Standard Trading Conditions of the
                Cyprus Shipping Agents" established by the Association in 1998.
              </p>
              <p className="text-muted-foreground mb-6">
                A copy of these conditions is available at our office. You may also print a copy
                for reference directly from this site.
              </p>
            </section>

            <section>
              <h2 className="section-title">About the CSA</h2>
              <p className="text-muted-foreground mb-4">
                The Cyprus Shipping Association (CSA) was established in 1945, to provide a
                professional forum for the Shipping Agents of Cyprus. In 1954, following its
                registration under the provisions of the local Trade Unions Law, the Association
                became the official body representing the profession of the Shipping Agent in
                Cyprus.
              </p>
              <p className="text-muted-foreground">
                The Members of the Association are the leading and long established Shipping
                Agencies in the island.
              </p>
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

export default CyprusShippingAssociation;
