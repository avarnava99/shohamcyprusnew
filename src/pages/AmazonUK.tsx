import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Package, Truck, Clock, CreditCard, ShoppingCart, Globe, HelpCircle } from "lucide-react";
import Forward2MeBanner from "@/components/Forward2MeBanner";
import { Button } from "@/components/ui/button";
import SEO, { faqJsonLd } from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
  {
    question: "Does Amazon deliver to Cyprus?",
    answer: "Some Amazon UK sellers ship directly to Cyprus, but many products are restricted from international delivery. Our parcel forwarding service gives you a UK address so you can order any product from Amazon UK and have it shipped to Cyprus via our warehouse."
  },
  {
    question: "How to order from Amazon UK to Cyprus?",
    answer: "Register with Shoham to receive your personal UK warehouse address. Shop on Amazon UK using that address as the delivery destination. We receive your parcels, consolidate them if you wish, and forward everything to your Cyprus address with full customs clearance."
  },
  {
    question: "How long does Amazon UK delivery to Cyprus take?",
    answer: "After your parcel arrives at our UK warehouse, air freight delivery to Cyprus typically takes 5-7 working days. Sea freight is more economical and takes 2-3 weeks. We also offer express options for urgent shipments."
  },
  {
    question: "Is there Amazon Prime in Cyprus?",
    answer: "Amazon Prime is not available in Cyprus. However, you can still benefit from Prime deals by using a UK delivery address through our service. You'll get Prime's fast UK delivery to our warehouse, and we'll forward it to Cyprus."
  },
  {
    question: "How much does it cost to ship from Amazon UK to Cyprus?",
    answer: "Shipping costs depend on the weight and dimensions of your package. We offer competitive rates starting from a few pounds per kilogram. You can save further by consolidating multiple orders into one shipment. Contact us for a personalised quote."
  },
  {
    question: "Do I have to pay customs duty on Amazon UK orders to Cyprus?",
    answer: "Yes, since Brexit, goods from the UK are subject to EU customs duties and VAT when imported to Cyprus. We handle all customs formalities on your behalf. Use our duty calculator to estimate costs before ordering."
  }
];

const AmazonUK = () => {
  return (
    <Layout>
      <SEO
        title="Amazon Cyprus Delivery | Shop Amazon UK & Ship to Cyprus"
        description="Does Amazon deliver to Cyprus? Shop from Amazon UK and get your purchases shipped to Cyprus with our door-to-door parcel forwarding service. Fast delivery, customs handled."
        path="/online-purchases-shipped-to-cyprus-from-amazon-uk"
        jsonLd={faqJsonLd(faqData)}
      />
      {/* Hero Section */}
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <div className="mb-2">
            <Link to="/services" className="text-white/70 hover:text-white text-sm">
              ← Back to Services
            </Link>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Amazon Cyprus Delivery — Shop & Ship from Amazon UK
          </h1>
          <p className="text-white/90 text-lg max-w-3xl">
            Does Amazon deliver to Cyprus? With our parcel forwarding service, you can shop from Amazon UK and have everything delivered to your door in Cyprus.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-shoham py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">
                Shop from Amazon UK & Ship to Cyprus
              </h2>
              <p className="text-muted-foreground mb-4">
                Many products on Amazon UK don't ship directly to Cyprus, but with our parcel forwarding 
                service, you can now access millions of products and have them delivered straight to your door.
              </p>
              <p className="text-muted-foreground mb-4">
                Our UK-based warehouse receives your packages, consolidates them if needed, and forwards 
                them to Cyprus via air or sea freight depending on your preference and budget.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">
                How It Works
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Register with Us</h3>
                    <p className="text-muted-foreground text-sm">
                      Sign up for our parcel forwarding service and receive your unique UK delivery address.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Shop on Amazon UK</h3>
                    <p className="text-muted-foreground text-sm">
                      Purchase your items from Amazon UK and use your unique UK address as the delivery address.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">We Receive & Consolidate</h3>
                    <p className="text-muted-foreground text-sm">
                      We receive your packages at our UK warehouse and can consolidate multiple orders to save on shipping.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Delivery to Cyprus</h3>
                    <p className="text-muted-foreground text-sm">
                      We ship your packages to Cyprus via air or sea freight and handle all customs formalities.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">
                What You Can Order
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    Electronics & Gadgets
                  </li>
                  <li className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    Clothing & Fashion
                  </li>
                  <li className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    Books & Media
                  </li>
                  <li className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    Home & Garden
                  </li>
                </ul>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    Sports & Outdoor
                  </li>
                  <li className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    Baby & Kids Products
                  </li>
                  <li className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    Health & Beauty
                  </li>
                  <li className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    Pet Supplies
                  </li>
                </ul>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Note: Some items like hazardous materials, perishables, and certain electronics may have restrictions.
              </p>
            </section>

            <section className="bg-secondary p-6 rounded-lg">
              <h2 className="font-heading text-xl font-bold text-primary mb-4">
                Customs & Duties
              </h2>
              <p className="text-muted-foreground mb-4">
                As Cyprus is part of the EU, goods imported from the UK (post-Brexit) may be subject to 
                customs duties and VAT. We can help you understand the costs involved and handle all 
                customs clearance on your behalf.
              </p>
              <Link to="/services/customs-clearing/duty-calculator-for-cyprus">
                <Button variant="outline" className="mr-4">
                  Duty Calculator
                </Button>
              </Link>
              <Link to="/contact">
                <Button>Get a Quote</Button>
              </Link>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card border p-6 rounded-lg">
              <h3 className="font-heading font-semibold text-lg mb-4">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Package className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Package Consolidation</h4>
                    <p className="text-muted-foreground text-sm">Combine multiple orders to save on shipping</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Door-to-Door Delivery</h4>
                    <p className="text-muted-foreground text-sm">From UK warehouse to your Cyprus address</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Fast Transit Times</h4>
                    <p className="text-muted-foreground text-sm">Air freight option for urgent shipments</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CreditCard className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Customs Handling</h4>
                    <p className="text-muted-foreground text-sm">We handle all import formalities</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Globe className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Not Just Amazon</h4>
                    <p className="text-muted-foreground text-sm">Shop from any UK online store</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary text-white p-6 rounded-lg">
              <h3 className="font-heading font-semibold text-lg mb-3">Get Started Today</h3>
              <p className="text-white/80 text-sm mb-4">
                Contact us for your personal UK delivery address and start shopping from Amazon UK and 
                other UK retailers.
              </p>
              <Link to="/contact">
                <Button variant="secondary" className="w-full">
                  Contact Us
                </Button>
              </Link>
            </div>

            <Forward2MeBanner />

            <div className="bg-card border p-6 rounded-lg">
              <h3 className="font-heading font-semibold text-lg mb-3">Related Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/services/freight-forwarding" className="text-primary hover:underline text-sm">
                    Freight Forwarding →
                  </Link>
                </li>
                <li>
                  <Link to="/services/customs-clearing" className="text-primary hover:underline text-sm">
                    Customs Clearing →
                  </Link>
                </li>
                <li>
                  <Link to="/services/air-freight" className="text-primary hover:underline text-sm">
                    Air Freight →
                  </Link>
                </li>
              </ul>
           </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container-shoham py-12">
          <h2 className="font-heading text-2xl font-bold text-primary mb-6">
            Frequently Asked Questions About Amazon Delivery to Cyprus
          </h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl">
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
        </div>
      </div>
    </Layout>
  );
};

export default AmazonUK;
