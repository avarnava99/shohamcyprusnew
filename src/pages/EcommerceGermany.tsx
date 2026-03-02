import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Package, Truck, Shield, Clock, Euro, CheckCircle } from "lucide-react";
import SEO from "@/components/SEO";

const EcommerceGermany = () => {
  const benefits = [
    {
      icon: Package,
      title: "Consolidation Service",
      description: "We consolidate multiple purchases into one shipment to save on shipping costs."
    },
    {
      icon: Truck,
      title: "Door-to-Door Delivery",
      description: "Complete delivery service from German retailers directly to your address in Cyprus."
    },
    {
      icon: Shield,
      title: "Secure Handling",
      description: "Professional handling and insurance coverage for your valuable purchases."
    },
    {
      icon: Clock,
      title: "Fast Transit Times",
      description: "Regular departures ensure your packages arrive quickly and reliably."
    },
    {
      icon: Euro,
      title: "Competitive Rates",
      description: "Affordable shipping rates with transparent pricing and no hidden fees."
    },
    {
      icon: CheckCircle,
      title: "Customs Clearance",
      description: "We handle all customs documentation and clearance procedures for you."
    }
  ];

  const popularStores = [
    "Amazon.de",
    "Zalando",
    "Otto",
    "MediaMarkt",
    "Saturn",
    "About You",
    "Lidl Online",
    "Douglas",
    "Thomann",
    "Alternate"
  ];

  return (
    <Layout>
      <SEO title="E-commerce from Germany to Cyprus" description="Shop from German online stores and have purchases shipped to Cyprus with our forwarding service." path="/ecommerce-purchases-from-germany" />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-shoham-navy to-shoham-dark-blue text-white py-16">
        <div className="container-shoham">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            E-commerce Purchases from Germany
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Shop from your favorite German online stores and have your purchases shipped directly to Cyprus with our reliable forwarding service.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container-shoham">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-3xl font-bold text-shoham-navy mb-6">
                Shop Germany, Deliver to Cyprus
              </h2>
              <p className="text-gray-600 mb-6">
                Germany is home to some of Europe's best online retailers, offering quality products at competitive prices. However, many German stores don't ship directly to Cyprus or charge high delivery fees.
              </p>
              <p className="text-gray-600 mb-6">
                Our e-commerce forwarding service bridges this gap. We provide you with a German delivery address where you can send your purchases. Once your packages arrive at our facility, we consolidate them and ship everything to Cyprus in one cost-effective shipment.
              </p>
              <p className="text-gray-600 mb-8">
                From electronics and fashion to automotive parts and specialty items, we handle all types of products with care and professionalism.
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
                Popular German Stores
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
                * And many more! We can receive packages from any German retailer.
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

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container-shoham">
          <h2 className="font-heading text-3xl font-bold text-shoham-navy text-center mb-12">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                { step: 1, title: "Register with Us", description: "Sign up for our service and receive your personal German delivery address." },
                { step: 2, title: "Shop Online", description: "Purchase items from any German online store and use your German address for delivery." },
                { step: 3, title: "We Receive & Consolidate", description: "Your packages arrive at our German facility where we consolidate them." },
                { step: 4, title: "Ship to Cyprus", description: "We ship your consolidated package to Cyprus with full tracking." },
                { step: 5, title: "Customs & Delivery", description: "We handle customs clearance and deliver directly to your door." }
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
            Ready to Start Shopping?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Contact us today to set up your German delivery address and start enjoying the best of German e-commerce.
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

export default EcommerceGermany;
