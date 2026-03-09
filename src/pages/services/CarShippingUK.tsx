import Layout from "@/components/layout/Layout";
import SEO, { serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Car, Ship, Shield, FileCheck, Clock, ArrowRight, Calculator } from "lucide-react";

const faqs = [
  {
    question: "How much does it cost to ship a car from UK to Cyprus?",
    answer: "Shipping costs typically range from £800 to £2,500 depending on the vehicle size, shipping method (RoRo or container), and collection/delivery requirements. RoRo is generally cheaper for standard vehicles, while container shipping offers more protection and is required for non-running vehicles. Contact Shoham for an exact quote based on your vehicle.",
  },
  {
    question: "How long does car shipping from UK to Cyprus take?",
    answer: "Transit time by sea from the UK to Limassol Port is typically 10–18 days depending on the shipping line and routing. RoRo sailings may take longer due to fewer direct services. Door-to-door delivery including collection in the UK and customs clearance in Cyprus usually takes 3–4 weeks total.",
  },
  {
    question: "What is the import duty on cars shipped to Cyprus?",
    answer: "Cars imported to Cyprus from the UK (post-Brexit) are subject to customs duty, excise duty, and 19% VAT. Duty rates depend on the vehicle's engine size, CO2 emissions, age, and value. Use our free Duty Calculator for an instant estimate, or contact our customs team for a detailed breakdown.",
  },
  {
    question: "What is the difference between RoRo and container car shipping?",
    answer: "RoRo (Roll-on/Roll-off) means your car is driven onto a specialist vessel — it's cost-effective but the vehicle must be driveable and personal items cannot be shipped inside. Container shipping places your vehicle inside a 20ft or 40ft container, providing full protection from weather and handling, and allowing you to ship personal belongings alongside the car.",
  },
  {
    question: "Can I ship a right-hand drive car to Cyprus?",
    answer: "Yes, right-hand drive (RHD) vehicles can be imported to Cyprus. However, Cyprus drives on the left like the UK, so RHD vehicles are legal and common. If you're bringing a UK-registered vehicle, you'll need to re-register it with Cyprus plates within 30 days of import.",
  },
  {
    question: "What documents do I need to ship my car from UK to Cyprus?",
    answer: "You'll need the original V5C registration document, a valid MOT certificate, proof of insurance, your passport or ID, a purchase invoice or proof of value, and a customs declaration form. If you're transferring residence to Cyprus, additional documents like proof of residency may reduce your duty obligations.",
  },
];

const CarShippingUK = () => {
  const jsonLd = [
    serviceJsonLd({
      name: "Car Shipping from UK to Cyprus",
      description: "Professional car shipping service from the UK to Cyprus. RoRo and container options, full customs clearance, door-to-door delivery. Trusted since 1951.",
      url: "/services/car-shipping-from-uk-to-cyprus",
    }),
    faqJsonLd(faqs),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Car Shipping from UK to Cyprus", url: "/services/car-shipping-from-uk-to-cyprus" },
    ]),
  ];

  return (
    <Layout>
      <SEO
        title="Car Shipping from UK to Cyprus"
        description="Ship your car from the UK to Cyprus with Shoham. RoRo & container shipping, customs clearance, duty calculation, and door-to-door delivery. Get a free quote."
        path="/services/car-shipping-from-uk-to-cyprus"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <div className="bg-primary py-16 md:py-24">
        <div className="container-shoham">
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Car Shipping from UK to Cyprus
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl">
            Reliable, affordable vehicle shipping with full customs clearance and door-to-door delivery — trusted by thousands of expats and businesses.
          </p>
        </div>
      </div>

      <div className="container-shoham py-12 md:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Intro */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
              Ship Your Car from the UK to Cyprus with Confidence
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Moving to Cyprus or importing a vehicle from the UK? Shoham has been shipping cars between the UK and Cyprus for over 70 years. We handle everything from collection at your UK address to customs clearance at Limassol Port and delivery to your door in Cyprus.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Since Brexit, importing a car from the UK to Cyprus involves customs duties and additional paperwork. Our experienced team manages the entire process, ensuring your vehicle clears customs smoothly and you pay the correct duty — no surprises, no delays.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Whether you're shipping a family car, a luxury vehicle, or a classic car, we offer both RoRo and container shipping options to suit your needs and budget.
            </p>
          </section>

          {/* Shipping Methods */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
              Shipping Methods
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg shadow border border-border">
                <Ship className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-heading font-semibold text-xl mb-3">RoRo Shipping</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Most cost-effective option for running vehicles</li>
                  <li>• Car driven directly onto specialist vessel</li>
                  <li>• Regular sailings from UK ports</li>
                  <li>• Transit time: 12–18 days</li>
                  <li>• Vehicle must be driveable</li>
                </ul>
              </div>
              <div className="bg-card p-6 rounded-lg shadow border border-border">
                <Car className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-heading font-semibold text-xl mb-3">Container Shipping</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Maximum protection in enclosed container</li>
                  <li>• Ship personal belongings with your car</li>
                  <li>• Ideal for luxury, classic, or non-running vehicles</li>
                  <li>• Transit time: 10–16 days</li>
                  <li>• Shared or dedicated container options</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Step by Step */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
              How It Works — Step by Step
            </h2>
            <div className="space-y-6">
              {[
                { step: "1", title: "Get a Quote", desc: "Contact us with your vehicle details (make, model, year, collection postcode) and we'll provide a competitive quote within hours." },
                { step: "2", title: "Collection in the UK", desc: "We arrange collection from your address or a convenient drop-off point. Your vehicle is inspected and documented before shipping." },
                { step: "3", title: "Ocean Transport", desc: "Your car is shipped via RoRo or container from a UK port (typically Tilbury, Southampton, or Bristol) to Limassol Port." },
                { step: "4", title: "Customs Clearance in Cyprus", desc: "Our licensed customs brokers handle all import formalities, duty calculations, and paperwork at Limassol Port." },
                { step: "5", title: "Delivery to Your Door", desc: "Once cleared, we deliver your vehicle to any address in Cyprus or you can collect from our Limassol depot." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Duty Calculator CTA */}
          <section className="mb-12 bg-accent/10 p-8 rounded-xl border border-accent/20">
            <div className="flex items-start gap-4">
              <Calculator className="h-10 w-10 text-accent flex-shrink-0" />
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-2">
                  Estimate Your Import Duty
                </h2>
                <p className="text-muted-foreground mb-4">
                  Use our free Duty Calculator to get an instant estimate of customs duty, excise duty, and VAT for importing your car to Cyprus.
                </p>
                <Link to="/services/customs-clearing/duty-calculator-for-cyprus" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  <Calculator className="h-4 w-4" />
                  Open Duty Calculator
                </Link>
              </div>
            </div>
          </section>

          {/* Customs Info */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
              Customs Duties & Taxes for UK Car Imports
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Since Brexit (1 January 2021), vehicles imported from the UK to Cyprus are subject to customs duty as the UK is no longer part of the EU single market. The main charges include:
            </p>
            <div className="space-y-3 mb-4">
              {[
                "Customs Duty — typically 6.5% on the vehicle's CIF value (cost + insurance + freight)",
                "Excise Duty — based on engine capacity and CO2 emissions, ranging from €0 to several thousand euros",
                "VAT — 19% applied on the total of CIF value + customs duty + excise duty",
                "Registration fees — paid to the Road Transport Department",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              If you're transferring your normal residence to Cyprus, you may qualify for duty relief. Our customs team will advise you on eligibility and handle the application.
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
              Ready to Ship Your Car?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-6 max-w-2xl mx-auto">
              Get a free, no-obligation quote for shipping your vehicle from the UK to Cyprus.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/quote" className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                Get a Free Quote
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

export default CarShippingUK;
