import Layout from "@/components/layout/Layout";
import SEO, { serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Plane, Clock, Globe, Shield, Package, FileCheck, ArrowRight, Thermometer } from "lucide-react";
import airFreightImg from "@/assets/service-air-freight.jpg";

const faqs = [
  {
    question: "How long does air freight to Cyprus take?",
    answer: "Standard air freight from Europe typically arrives within 1–3 days, from the US and Asia within 3–5 days. Express services can deliver within 24–48 hours from most European cities. Transit times depend on origin, airline routing, and customs clearance speed.",
  },
  {
    question: "How much does air freight to Cyprus cost?",
    answer: "Air freight rates are based on the chargeable weight (actual or volumetric, whichever is greater), origin, and service level. Rates from Europe typically start from €2–5 per kg for standard service. Express and charter services cost more. Contact Shoham for a competitive quote tailored to your shipment.",
  },
  {
    question: "Can you ship dangerous goods by air to Cyprus?",
    answer: "Yes, Shoham is certified to handle IATA Dangerous Goods shipments by air. This includes chemicals, lithium batteries, flammable materials, and other regulated items. All dangerous goods must be properly classified, packaged, and documented according to IATA DGR regulations.",
  },
  {
    question: "What is the difference between air freight and air courier?",
    answer: "Air freight is a cargo service for larger or heavier shipments (typically 50kg+), loaded onto commercial or cargo aircraft. Courier services (like DHL, FedEx) are better for small parcels. Shoham's air freight service is more cost-effective for commercial volumes and offers customs-cleared, door-to-door delivery.",
  },
  {
    question: "Can perishable goods be shipped by air to Cyprus?",
    answer: "Yes, we regularly handle perishable air freight including pharmaceuticals, fresh produce, flowers, and temperature-sensitive products. We arrange temperature-controlled storage, cold chain documentation, and priority customs clearance to minimize transit time.",
  },
  {
    question: "Which airports in Cyprus handle air freight?",
    answer: "Larnaca International Airport is the primary air cargo hub in Cyprus, handling the majority of freight traffic. Paphos Airport also handles some cargo operations. Shoham manages customs clearance and delivery from both airports.",
  },
];

const AirFreightCyprus = () => {
  const jsonLd = [
    serviceJsonLd({
      name: "Air Freight Cyprus",
      description: "Professional air freight services to and from Cyprus. Express and standard air cargo, dangerous goods, perishables, customs clearance, and door-to-door delivery.",
      url: "/services/air-freight-cyprus",
    }),
    faqJsonLd(faqs),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Air Freight Cyprus", url: "/services/air-freight-cyprus" },
    ]),
  ];

  return (
    <Layout>
      <SEO
        title="Air Freight Cyprus"
        description="Fast, reliable air freight services to and from Cyprus. Express & standard air cargo, dangerous goods, perishables, full customs clearance. Get a quote from Shoham."
        path="/services/air-freight-cyprus"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <div className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img src={airFreightImg} alt="Air freight cargo operations at Cyprus airport" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container-shoham relative z-10">
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Air Freight Cyprus
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl">
            Fast, reliable air cargo services connecting Cyprus to the world — express delivery, dangerous goods, perishables, and full customs clearance.
          </p>
        </div>
      </div>

      <div className="container-shoham py-12 md:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Intro */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
              Professional Air Freight Services in Cyprus
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              When speed matters, Shoham's air freight service delivers. As Cyprus's leading freight forwarder since 1951, we provide comprehensive air cargo solutions for imports and exports through Larnaca and Paphos airports, connecting your business to every major destination worldwide.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Our air freight team works with all major airlines and cargo carriers to secure the best rates and routing for your shipments. From urgent spare parts to temperature-sensitive pharmaceuticals, we tailor every air freight solution to your specific requirements.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Combined with our in-house customs brokerage and island-wide delivery network, Shoham provides true door-to-door air freight — from pickup at origin to delivery at your premises in Cyprus.
            </p>
          </section>

          {/* Services Grid */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
              Air Freight Solutions
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Clock, title: "Express Air Freight", desc: "Next-day and time-definite delivery from Europe. Priority handling and customs clearance." },
                { icon: Globe, title: "Worldwide Air Cargo", desc: "Standard air freight services from any origin worldwide to Cyprus airports." },
                { icon: Plane, title: "Charter & Part-Charter", desc: "Dedicated aircraft for urgent, oversized, or high-value cargo that can't wait." },
                { icon: Thermometer, title: "Temperature-Controlled", desc: "Cold chain logistics for pharmaceuticals, perishables, and temperature-sensitive goods." },
                { icon: Shield, title: "Dangerous Goods (DG)", desc: "IATA-certified handling of hazardous materials by air with full regulatory compliance." },
                { icon: FileCheck, title: "Customs & Delivery", desc: "In-house customs clearance at Larnaca Airport and door-to-door delivery across Cyprus." },
              ].map((s) => (
                <div key={s.title} className="bg-card p-6 rounded-lg shadow border border-border">
                  <s.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Shoham */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
              Why Choose Shoham for Air Freight?
            </h2>
            <div className="space-y-4">
              {[
                "Competitive rates negotiated with major airlines — we pass volume savings to you",
                "In-house customs brokerage at Larnaca Airport for fast clearance",
                "IATA Dangerous Goods certified team",
                "Real-time shipment tracking from pickup to delivery",
                "Temperature-controlled chain of custody for sensitive cargo",
                "Same-day collection and delivery within Cyprus",
                "Expert handling of oversized and high-value air cargo",
                "Over 70 years of air freight experience in Cyprus",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Routes */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
              Key Air Freight Routes to Cyprus
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              We handle regular air freight services from all major origins including the United Kingdom, Germany, France, Italy, the Netherlands, the United States, China, India, and the Middle East. Our network of agents and partners ensures competitive rates and reliable service on every route.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              For exports from Cyprus, we arrange air freight to any global destination with full export documentation and customs formalities handled by our team.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-heading font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-primary text-primary-foreground p-8 md:p-12 rounded-xl text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Get an Air Freight Quote
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-6 max-w-2xl mx-auto">
              Tell us about your shipment and we'll provide a competitive air freight quote — usually within hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/quote" className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                Request a Quote
              </Link>
              <Link to="/contact-us" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AirFreightCyprus;
