import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { CONTACT } from "@/constants/contact";
import SEO from "@/components/SEO";
import fonasbaLogo from "@/assets/fonasba-logo.webp";
import fonasbaQuality from "@/assets/fonasba-quality-standard.webp";

const Fonasba = () => {
  return (
    <Layout>
      <SEO
        title="FONASBA - Federation of National Associations of Ship Brokers and Agents"
        description="Shoham Cyprus holds the FONASBA Quality Standard, ensuring customers deal with a well-run and reputable shipping agency in Cyprus."
        path="/about-us/general-information/fonasba"
      />

      <div className="bg-primary py-16">
        <div className="container-shoham">
          <Link to="/about-us" className="text-white/80 hover:text-white text-sm flex items-center gap-1 mb-4">
            <ArrowLeft className="h-4 w-4" /> About Us
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            FONASBA
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            The Federation of National Associations of Ship Brokers and Agents
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <img
                  src={fonasbaLogo}
                  alt="FONASBA logo"
                  className="h-24 w-auto"
                />
                <img
                  src={fonasbaQuality}
                  alt="FONASBA Quality Standard - Shoham Cyprus"
                  className="h-24 w-auto"
                />
              </div>

              <h2 className="section-title">FONASBA Quality Standard</h2>
              <p className="text-muted-foreground mb-4">
                Shoham (Cyprus) Ltd holds the FONASBA Quality Standard.
              </p>
              <p className="text-muted-foreground mb-4">
                Working with an agent or broker displaying the FONASBA Quality Standard gives the
                customer peace of mind that they are dealing with a well run and reputable business.
                See more details at the{" "}
                <a
                  href="https://www.fonasba.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  FONASBA website <ExternalLink className="h-3 w-3" />
                </a>.
              </p>
            </section>

            <section>
              <h2 className="section-title">CSA Membership & Code of Conduct</h2>
              <p className="text-muted-foreground mb-4">
                The Cyprus Shipping Association is a full member of FONASBA, the Federation which
                groups together all National Ship Agents and Brokers Associations. Shoham abides
                fully by the Code of Conduct of FONASBA which was established in 1998.
              </p>
              <p className="text-muted-foreground">
                With this code, FONASBA aims towards the further improvement of the quality of
                services offered by the Members of the National Shipping Associations for the
                benefit of the Shipping Industry and more particularly the Shipowner on the one
                hand and the Merchant on the other.
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

export default Fonasba;
