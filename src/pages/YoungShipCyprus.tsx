import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CONTACT } from "@/constants/contact";
import SEO from "@/components/SEO";
import youngshipLogo from "@/assets/youngship-logo.webp";

const YoungShipCyprus = () => {
  return (
    <Layout>
      <SEO
        title="YoungShip Cyprus - Supporting Young Maritime Professionals"
        description="Shoham Cyprus staff and company are members and supporters of YoungShip Cyprus, promoting dialogue, education and development in the shipping industry."
        path="/about-us/general-information/youngship-cyprus"
      />

      <div className="bg-primary py-16">
        <div className="container-shoham">
          <Link to="/about-us" className="text-white/80 hover:text-white text-sm flex items-center gap-1 mb-4">
            <ArrowLeft className="h-4 w-4" /> About Us
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            YoungShip Cyprus
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Supporting the next generation of maritime professionals
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="section-title">Members & Supporters</h2>
              <p className="text-muted-foreground mb-4">
                Young staff of our company and our company are members and supporters of YoungShip Cyprus.
              </p>
            </section>

            <section>
              <h2 className="section-title">Main Objectives</h2>
              <p className="text-muted-foreground mb-4">
                The main objectives of YoungShip Cyprus are:
              </p>
              <ul className="space-y-4 text-muted-foreground list-disc pl-5">
                <li>
                  To promote dialogue and exchange of ideas and experiences, cooperation among its members, but also with the wider maritime community, government agencies and organizations in Cyprus and abroad engaged in the shipping industry.
                </li>
                <li>
                  Continuous education and training of members of the maritime industry through professional seminars, lectures and discussions on further development of the new generation of interest in entrepreneurship, environmental developments and innovations in the field of shipping.
                </li>
                <li>
                  To encourage members to develop ideas, implement projects and initiatives with a view to wider development of shipping in Cyprus and the active presence of members as young professionals in the global maritime community.
                </li>
              </ul>
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

export default YoungShipCyprus;
