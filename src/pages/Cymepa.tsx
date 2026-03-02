import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { CONTACT } from "@/constants/contact";
import SEO from "@/components/SEO";
import cymepaLogo from "@/assets/cymepa-logo.webp";

const Cymepa = () => {
  return (
    <Layout>
      <SEO
        title="CYMEPA - Cyprus Marine Environment Protection Association"
        description="Shoham Cyprus is a supporting member of CYMEPA, the Cyprus Marine Environment Protection Association, committed to preventing marine pollution."
        path="/about-us/general-information/cymepa"
      />

      <div className="bg-primary py-16">
        <div className="container-shoham">
          <Link to="/about-us" className="text-white/80 hover:text-white text-sm flex items-center gap-1 mb-4">
            <ArrowLeft className="h-4 w-4" /> About Us
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            CYMEPA
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Cyprus Marine Environment Protection Association
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="mb-6">
                <img
                  src={cymepaLogo}
                  alt="CYMEPA - Cyprus Marine Environment Protection Association"
                  className="h-24 w-auto"
                />
              </div>

              <h2 className="section-title">Supporting Member</h2>
              <p className="text-muted-foreground mb-4">
                Shoham (Cyprus) Ltd is a supporting member of the Cyprus Marine Environment
                Protection Association (CYMEPA).
              </p>
            </section>

            <section>
              <h2 className="section-title">Marine Environment Protection</h2>
              <p className="text-muted-foreground mb-4">
                The principal aim of the Cyprus Marine Environment Protection Association (CYMEPA)
                is to encourage and actively assist effective efforts to prevent all forms of
                pollution of the sea. The Association also helps seafarers and executives to be
                more aware of safety and the protection of the marine environment. CYMEPA also
                operates extensive public awareness campaigns.
              </p>
              <p className="text-muted-foreground">
                CYMEPA supports and assists the Government of Cyprus in ratifying and implementing
                international conventions addressing the protection of the marine environment.
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

export default Cymepa;
