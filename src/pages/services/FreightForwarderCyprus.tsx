import Layout from "@/components/layout/Layout";
import SEO, { serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Package, Globe, FileCheck, Truck, Ship, Clock, ArrowRight } from "lucide-react";
import freightImg from "@/assets/freight-forwarding.jpg";

const faqs = [
  {
    question: "What does a freight forwarder in Cyprus do?",
    answer: "A freight forwarder in Cyprus acts as an intermediary between shippers and transportation services, managing the entire logistics chain including documentation, customs clearance, cargo insurance, warehousing, and door-to-door delivery for imports and exports through Cyprus ports and airports.",
  },
  {
    question: "How long does freight forwarding from Europe to Cyprus take?",
    answer: "Sea freight from major European ports typically takes 5–10 days to Limassol Port. Air freight arrivals from Europe take 1–3 days. Transit times vary based on origin, routing, and customs processing. Shoham provides estimated delivery timelines for every shipment.",
  },
  {
    question: "What is the difference between LCL and FCL shipping?",
    answer: "LCL (Less than Container Load) means your cargo shares container space with other shipments, ideal for smaller volumes. FCL (Full Container Load) means you book an entire container exclusively for your goods. LCL is more cost-effective for small shipments, while FCL offers faster transit and better security for larger volumes.",
  },
  {
    question: "Do I need a freight forwarder for customs clearance in Cyprus?",
    answer: "While not legally required, using a licensed freight forwarder with customs brokerage expertise significantly speeds up the clearance process. Shoham's in-house customs team handles all documentation, tariff classification, duty calculations, and regulatory compliance, preventing costly delays and penalties.",
  },
  {
    question: "What documents are needed for importing goods to Cyprus?",
    answer: "Typical import documents include a commercial invoice, packing list, bill of lading or airway bill, certificate of origin, and any product-specific certificates (phytosanitary, CE marking, etc.). As your freight forwarder, Shoham prepares and verifies all required documentation.",
  },
  {
    question: "How much does freight forwarding to Cyprus cost?",
    answer: "Costs depend on cargo volume, weight, origin, transport mode (sea/air/road), and additional services like insurance or warehousing. Shoham provides transparent, competitive quotes with no hidden fees. Request a free quote online or call our Limassol office.",
  },
];

const FreightForwarderCyprus = () => {
  const jsonLd = [
    serviceJsonLd({
      name: "Freight Forwarding Cyprus",
      description: "Professional freight forwarding services in Cyprus — import/export, LCL/FCL sea freight, air cargo, customs clearance, and door-to-door delivery since 1951.",
      url: "/services/freight-forwarding",
    }),
    faqJsonLd(faqs),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Freight Forwarding", url: "/services/freight-forwarding" },
    ]),
  ];

  return (
    <Layout>
      <SEO
        title="Freight Forwarder in Cyprus"
        description="Leading freight forwarder in Cyprus since 1951. Import & export services, LCL/FCL sea freight, air cargo, customs clearance, and door-to-door logistics from Limassol."
        path="/services/freight-forwarding"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <div className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img src={freightImg} alt="Freight forwarding operations at Limassol port" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container-shoham relative z-10">
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Freight Forwarder in Cyprus
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl">
            Over 70 years of expertise in international freight forwarding — connecting Cyprus to the world through sea, air, and road logistics.
          </p>
        </div>
      </div>

      <div className="container-shoham py-12 md:py-16">
        {/* Intro */}
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
              Your Trusted Freight Forwarding Partner in Cyprus
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Since 1951, Shoham (Cyprus) Ltd has been the island's leading freight forwarder, handling thousands of shipments annually through Limassol Port, Larnaca Airport, and all Cyprus terminals. As a FONASBA Quality Standard-certified agency, we deliver reliable, cost-effective logistics solutions for businesses of every size.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Whether you're importing raw materials, exporting finished goods, or managing complex project cargo, our team of experienced freight professionals ensures your shipments arrive on time, on budget, and fully compliant with international trade regulations.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our integrated approach combines freight forwarding with in-house customs brokerage, warehousing, and local haulage — giving you a single point of contact for your entire supply chain in Cyprus.
            </p>
          </section>

          {/* Services Grid */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
              Comprehensive Freight Forwarding Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Ship, title: "Sea Freight (LCL & FCL)", desc: "Full and part-container ocean freight from all major ports worldwide to Limassol and Vassiliko." },
                { icon: Package, title: "Air Freight", desc: "Express and standard air cargo services through Larnaca and Paphos airports." },
                { icon: Truck, title: "Road Freight", desc: "Overland transport connections from Europe via Greece, including groupage services." },
                { icon: FileCheck, title: "Customs Clearance", desc: "Licensed customs brokerage handling all import/export formalities and tariff classification." },
                { icon: Globe, title: "Door-to-Door Delivery", desc: "Complete logistics from pickup at origin to final delivery at your premises in Cyprus." },
                { icon: Clock, title: "Supply Chain Management", desc: "Inventory management, order fulfillment, and just-in-time delivery solutions." },
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
              Why Choose Shoham as Your Freight Forwarder?
            </h2>
            <div className="space-y-4">
              {[
                "Over 70 years of freight forwarding experience in Cyprus (est. 1951)",
                "FONASBA Quality Standard certified — internationally recognised service standards",
                "In-house customs brokerage — no third-party delays or miscommunication",
                "ZIM Line agents in Cyprus — direct access to one of the world's top container carriers",
                "Full-service warehousing and distribution from our Limassol facilities",
                "Dedicated project cargo team for oversized and heavy-lift shipments",
                "Real-time shipment tracking and proactive status updates",
                "Competitive rates with transparent, no-surprise pricing",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Industries */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
              Industries We Serve
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Our freight forwarding expertise spans every sector of Cyprus's economy. We handle shipments for construction and infrastructure projects, energy and oil & gas operations, retail and e-commerce distribution, pharmaceutical and healthcare logistics, automotive imports, food and beverage supply chains, and diplomatic and UN operations across the island.
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
              Get a Freight Forwarding Quote
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-6 max-w-2xl mx-auto">
              Tell us about your shipment and our team will provide a competitive quote within 24 hours.
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

export default FreightForwarderCyprus;
