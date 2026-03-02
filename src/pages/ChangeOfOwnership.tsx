import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Anchor, CheckCircle } from "lucide-react";
import SEO from "@/components/SEO";
import ContactBox from "@/components/layout/ContactBox";
import combiDockImg from "@/assets/combi-dock-iii.webp";

const ChangeOfOwnership = () => {
  return (
    <Layout>
      <SEO
        title="Change of Ownership - Vessel Transfers at Limassol"
        description="Shoham provides experienced agency services for vessel ownership changes at Limassol port and anchorage, with available classification, diving inspections and repairs."
        path="/port-agency/change-of-ownership"
      />

      <div className="bg-primary py-16">
        <div className="container-shoham">
          <Link to="/port-agency" className="text-white/80 hover:text-white text-sm flex items-center gap-1 mb-4">
            <ArrowLeft className="h-4 w-4" /> Port Agency
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Anchor className="h-8 w-8 text-white" />
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white">
              Change of Ownership
            </h1>
          </div>
          <p className="text-white/90 text-lg max-w-2xl">
            Vessel Ownership Transfer at Limassol
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="section-title">Vessel Ownership Change</h2>
              <p className="text-muted-foreground mb-4">
                Limassol anchorage is a very well situated location for Changes of Vessel Ownership. Handovers can be performed with ease and efficiency for both parties.
              </p>
            </section>

            <section>
              <h2 className="section-title">Available Services</h2>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Classes available — DNV GL, Lloyds, Dromon",
                  "Diving inspection services available",
                  "Repairs available",
                  "Relaxed regulations for crew sign on and off for all nationalities",
                  "Provisions for supply in port and anchorage",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="section-title">Our Experience</h2>
              <p className="text-muted-foreground mb-6">
                Our company is experienced in the process of handover of vessels at Limassol port and can act as an agent in these cases.
              </p>

              <figure className="rounded-lg overflow-hidden">
                <img
                  src={combiDockImg}
                  alt="Combi Dock III — vessel sold to new owners at Limassol port under Shoham agency"
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
                <figcaption className="text-sm text-muted-foreground mt-2 italic">
                  Combi Dock III — sold to new owners at Limassol port under our agency for both seller and buyers.
                </figcaption>
              </figure>
            </section>
          </div>

          <div className="space-y-6">
            <ContactBox
              title="Need Assistance?"
              description="Contact our team for vessel ownership transfer services at Limassol."
              variant="default"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChangeOfOwnership;
