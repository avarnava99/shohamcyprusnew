import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Package, Truck, Shield, Clock, DollarSign, CheckCircle } from "lucide-react";
import SEO from "@/components/SEO";

const EcommerceUSA = () => {
  const benefits = [
    {
      icon: Package,
      title: "Package Consolidation",
      description: "Combine multiple orders into one shipment to maximize savings on international shipping."
    },
    {
      icon: Truck,
      title: "International Shipping",
      description: "Reliable air and sea freight options to suit your timeline and budget."
    },
    {
      icon: Shield,
      title: "Insured Shipments",
      description: "Full insurance coverage available for valuable electronics and fragile items."
    },
    {
      icon: Clock,
      title: "Express Options",
      description: "Air freight available for time-sensitive deliveries with faster transit times."
    },
    {
      icon: DollarSign,
      title: "Save on Shipping",
      description: "Access US-only deals and avoid expensive international shipping fees from retailers."
    },
    {
      icon: CheckCircle,
      title: "Full Customs Support",
      description: "Complete customs clearance and duty calculation assistance included."
    }
  ];

  const popularStores = [
    "Amazon.com",
    "eBay",
    "Walmart",
    "Best Buy",
    "Target",
    "Newegg",
    "B&H Photo",
    "Nike",
    "Apple Store",
    "Nordstrom"
  ];

  return (
    <Layout>
      <SEO title="E-commerce from USA to Cyprus" description="Shop from American online retailers and have purchases shipped to Cyprus with our forwarding service." path="/ecommerce-purchases-from-usa" />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-shoham-navy to-shoham-dark-blue text-white py-16">
        <div className="container-shoham">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            E-commerce Purchases from USA
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Access the best American online retailers and have your purchases shipped to Cyprus with our comprehensive forwarding service.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container-shoham">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-3xl font-bold text-shoham-navy mb-6">
                Shop America, Deliver to Cyprus
              </h2>
              <p className="text-gray-600 mb-6">
                The United States offers an incredible variety of products often at significantly lower prices than available locally. From the latest electronics and fashion to specialty items and collectibles, American retailers have it all.
              </p>
              <p className="text-gray-600 mb-6">
                Many US stores either don't ship internationally or charge prohibitive shipping fees. Our forwarding service solves this problem by providing you with a US delivery address. Shop freely, and we'll handle the rest.
              </p>
              <p className="text-gray-600 mb-8">
                Whether you're buying electronics from Best Buy, fashion from Nordstrom, or specialty items from smaller retailers, we ensure your purchases reach you safely and affordably.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-shoham-gold hover:bg-shoham-gold/90 text-shoham-navy">
                  <Link to="/quote">Get a Quote</Link>
                </Button>
                <Button asChild variant="outline" className="border-shoham-navy text-shoham-navy hover:bg-shoham-navy hover:text-white">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="font-heading text-xl font-semibold text-shoham-navy mb-6">
                Popular US Stores
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {popularStores.map((store, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-shoham-gold" />
                    <span>{store}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-6">
                * We accept packages from virtually any US retailer!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-shoham">
          <h2 className="font-heading text-3xl font-bold text-shoham-navy text-center mb-12">
            Why Choose Our Service?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <benefit.icon className="h-10 w-10 text-shoham-gold mb-4" />
                <h3 className="font-heading text-lg font-semibold text-shoham-navy mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16 bg-white">
        <div className="container-shoham">
          <h2 className="font-heading text-3xl font-bold text-shoham-navy text-center mb-12">
            Shipping Options
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border border-gray-200 rounded-lg p-8">
              <h3 className="font-heading text-xl font-semibold text-shoham-navy mb-4">
                Air Freight
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-shoham-gold flex-shrink-0 mt-0.5" />
                  <span>7-14 days transit time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-shoham-gold flex-shrink-0 mt-0.5" />
                  <span>Ideal for electronics and valuable items</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-shoham-gold flex-shrink-0 mt-0.5" />
                  <span>Full tracking throughout journey</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-shoham-gold flex-shrink-0 mt-0.5" />
                  <span>Express options available</span>
                </li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-8">
              <h3 className="font-heading text-xl font-semibold text-shoham-navy mb-4">
                Sea Freight
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-shoham-gold flex-shrink-0 mt-0.5" />
                  <span>4-6 weeks transit time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-shoham-gold flex-shrink-0 mt-0.5" />
                  <span>Most economical for large/heavy items</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-shoham-gold flex-shrink-0 mt-0.5" />
                  <span>Ideal for furniture and bulk orders</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-shoham-gold flex-shrink-0 mt-0.5" />
                  <span>Container consolidation service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container-shoham">
          <h2 className="font-heading text-3xl font-bold text-shoham-navy text-center mb-12">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                { step: 1, title: "Get Your US Address", description: "Register with us and receive your personal US delivery address." },
                { step: 2, title: "Shop US Stores", description: "Purchase from any American online retailer using your US address." },
                { step: 3, title: "Package Arrives", description: "Your packages are received at our US facility and logged in your account." },
                { step: 4, title: "Choose Shipping", description: "Select air or sea freight based on your timeline and budget." },
                { step: 5, title: "Delivery to Cyprus", description: "We handle shipping, customs, and deliver to your door." }
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-shoham-gold rounded-full flex items-center justify-center text-shoham-navy font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-shoham-navy mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-shoham-navy text-white">
        <div className="container-shoham text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Start Shopping from the USA Today
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Unlock access to American retailers and enjoy competitive international shipping to Cyprus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-shoham-gold hover:bg-shoham-gold/90 text-shoham-navy">
              <Link to="/quote">Request a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-shoham-navy">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EcommerceUSA;
