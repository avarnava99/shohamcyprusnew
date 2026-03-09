import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Package, Truck, Clock, Shield, Globe, Plane, Ship, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO, { faqJsonLd, serviceJsonLd } from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
  {
    question: "How much does it cost to send a parcel to Cyprus?",
    answer: "Parcel shipping costs depend on weight, dimensions, and delivery speed. Air freight starts from a few pounds per kg with 5-7 day delivery. Sea freight is more economical for heavier items at 2-3 weeks transit. Contact us for an exact quote based on your parcel details."
  },
  {
    question: "What is the cheapest way to send a parcel to Cyprus?",
    answer: "Sea freight is the most affordable option for non-urgent parcels. You can save further by consolidating multiple packages into one shipment. We also offer group shipping schedules where your parcel travels with other consignments for reduced rates."
  },
  {
    question: "How long does parcel delivery to Cyprus take?",
    answer: "Air freight: 5-7 working days from our UK warehouse. Sea freight: 2-3 weeks. Express courier options are available for urgent deliveries within 2-3 days. Transit times start from when we receive your parcel at our warehouse."
  },
  {
    question: "Do I need to pay customs duty on parcels sent to Cyprus?",
    answer: "Parcels from outside the EU (including the UK post-Brexit) may be subject to customs duties and 19% VAT. Gifts under €45 and commercial goods under €150 may qualify for reduced or zero duty. We handle all customs clearance and can advise on expected costs."
  },
  {
    question: "Can I send parcels from Cyprus to the UK?",
    answer: "Yes, we offer outbound parcel shipping from Cyprus to the UK and worldwide. Whether you're sending personal items, commercial goods, or documents, we can arrange collection from your Cyprus address and delivery to any UK destination."
  },
  {
    question: "What items can I send to Cyprus?",
    answer: "Most personal and commercial goods can be shipped to Cyprus. Restricted items include hazardous materials, perishable foods, live animals, and certain electronics with lithium batteries. Contact us if you're unsure whether your item can be shipped."
  }
];

const ParcelForwardingCyprus = () => {
  return (
    <Layout>
      <SEO
        title="Send a Parcel to Cyprus | UK to Cyprus Delivery"
        description="Send parcels to Cyprus from the UK with fast, affordable delivery. Air and sea freight options. Full customs clearance included. Get a free quote today."
        path="/services/parcel-forwarding"
        jsonLd={[
          faqJsonLd(faqData),
          serviceJsonLd({
            name: "Parcel Forwarding to Cyprus",
            description: "Professional parcel forwarding and delivery service from the UK to Cyprus. Air and sea freight options with full customs clearance.",
            url: "/services/parcel-forwarding",
          })
        ]}
      />

      {/* Hero */}
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <div className="mb-2">
            <Link to="/services" className="text-white/70 hover:text-white text-sm">
              ← Back to Services
            </Link>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Send a Parcel to Cyprus
          </h1>
          <p className="text-white/90 text-lg max-w-3xl">
            Fast, reliable parcel delivery from the UK to Cyprus. Air and sea freight options with full customs clearance.
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">

            {/* Intro */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">
                Parcel Delivery to Cyprus Made Simple
              </h2>
              <p className="text-muted-foreground mb-4">
                Whether you're sending personal items, online purchases, or commercial goods, our parcel forwarding 
                service provides a hassle-free way to ship from the UK to Cyprus. We handle everything from collection 
                to customs clearance and door-to-door delivery.
              </p>
              <p className="text-muted-foreground">
                With our UK warehouse address, you can shop from any UK retailer — Amazon, eBay, ASOS, John Lewis, 
                Argos, and more — and have your purchases consolidated and shipped to Cyprus at competitive rates.
              </p>
            </section>

            {/* How it works */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">
                How to Send a Parcel to Cyprus
              </h2>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Get Your UK Address", desc: "Register with us and receive a personal UK warehouse address for your deliveries." },
                  { step: "2", title: "Ship to Our Warehouse", desc: "Order from any UK shop or send parcels to our warehouse. We accept deliveries from all couriers." },
                  { step: "3", title: "We Consolidate & Pack", desc: "Multiple parcels? We consolidate them into one shipment to save you money on shipping costs." },
                  { step: "4", title: "Choose Your Shipping Speed", desc: "Select air freight (5-7 days) or sea freight (2-3 weeks) based on your budget and urgency." },
                  { step: "5", title: "Customs & Delivery", desc: "We handle all customs formalities and deliver directly to your Cyprus address." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-primary">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Shipping options */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">
                Shipping Options & Delivery Times
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Plane className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Air Freight</h3>
                  </div>
                  <ul className="text-muted-foreground text-sm space-y-2">
                    <li>• Transit: 5-7 working days</li>
                    <li>• Best for: Urgent items, small parcels</li>
                    <li>• Weekly departures from UK</li>
                    <li>• Door-to-door tracking</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Ship className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Sea Freight</h3>
                  </div>
                  <ul className="text-muted-foreground text-sm space-y-2">
                    <li>• Transit: 2-3 weeks</li>
                    <li>• Best for: Heavy items, bulk orders</li>
                    <li>• Most economical option</li>
                    <li>• Ideal for consolidation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Pricing factors */}
            <section className="bg-secondary p-6 rounded-lg">
              <h2 className="font-heading text-xl font-bold text-primary mb-4">
                What Affects Parcel Shipping Costs?
              </h2>
              <div className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Package className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Weight & dimensions</strong> — charged by actual or volumetric weight, whichever is greater</span>
                </div>
                <div className="flex items-start gap-2">
                  <Plane className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Shipping method</strong> — air freight costs more but arrives faster than sea freight</span>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Insurance</strong> — optional coverage for valuable items during transit</span>
                </div>
                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Customs duties</strong> — EU import duty and 19% VAT may apply on UK goods</span>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <Link to="/services/customs-clearing/duty-calculator-for-cyprus">
                  <Button variant="outline" size="sm">Duty Calculator</Button>
                </Link>
                <Link to="/contact">
                  <Button size="sm">Get a Free Quote</Button>
                </Link>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card border p-6 rounded-lg">
              <h3 className="font-heading font-semibold text-lg mb-4">Why Ship With Us?</h3>
              <ul className="space-y-4">
                {[
                  { icon: Package, title: "Consolidation Savings", desc: "Combine multiple parcels into one shipment" },
                  { icon: Truck, title: "Door-to-Door", desc: "Collection in UK, delivery to your Cyprus address" },
                  { icon: Clock, title: "Fast Transit", desc: "Air freight option for urgent shipments" },
                  { icon: Shield, title: "Customs Handled", desc: "We manage all import formalities & paperwork" },
                  { icon: Globe, title: "Any UK Shop", desc: "Not just Amazon — any UK online or offline store" },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary text-primary-foreground p-6 rounded-lg">
              <h3 className="font-heading font-semibold text-lg mb-3">Get Your UK Address</h3>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Contact us today to receive your personal UK delivery address and start shipping parcels to Cyprus.
              </p>
              <Link to="/contact">
                <Button variant="secondary" className="w-full">
                  Contact Us <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="bg-card border p-6 rounded-lg">
              <h3 className="font-heading font-semibold text-lg mb-3">Shop & Ship Guides</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/online-purchases-shipped-to-cyprus-from-amazon-uk" className="text-primary hover:underline text-sm flex items-center gap-1">
                    Amazon UK to Cyprus <ArrowRight className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-purchases-from-germany" className="text-primary hover:underline text-sm flex items-center gap-1">
                    Germany to Cyprus <ArrowRight className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-purchases-from-usa" className="text-primary hover:underline text-sm flex items-center gap-1">
                    USA to Cyprus <ArrowRight className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/services/customs-clearing" className="text-primary hover:underline text-sm flex items-center gap-1">
                    Customs Clearing <ArrowRight className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ParcelForwardingCyprus;
