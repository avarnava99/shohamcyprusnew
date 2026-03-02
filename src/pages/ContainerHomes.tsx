import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Truck, Thermometer, Shield, CheckCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SEO from "@/components/SEO";

const ContainerHomes = () => {
  const features = [
    {
      icon: Truck,
      title: "Mobility",
      description: "Easily moves to different locations."
    },
    {
      icon: Thermometer,
      title: "Energy Efficiency",
      description: "Insulated for maximum energy efficiency. Winter or Summer."
    },
    {
      icon: Shield,
      title: "Guarantee of Quality",
      description: "Very high quality modification of containers."
    }
  ];

  const faqs = [
    {
      question: "What type of steel are sea containers made of?",
      answer: "Sea containers are made of corten type steel with increased resistance to weather conditions. Korten or COR-TEN steel has been specially designed and developed to minimize the corrosion process in very difficult weather conditions occurring in the marine environment."
    },
    {
      question: "How much does a container weigh?",
      answer: "The gross weight of an empty container is 2.5 tonnes for a 20' container and 4 tonnes for a 40' container. The equipped Home Container weighs approximately 8-9 tons."
    },
    {
      question: "How do you achieve thermal insulation?",
      answer: "The internal insulation of walls and ceilings is sprayed with closed-cell polyurethane foam with a thickness of 80 to 100 mm and supplemented with mineral wool (50 mm). The technology used eliminates thermal bridges. For floor insulation, we use closed-cell polyurethane with a thickness of 50 mm. The very good thermal insulation parameters of walls and ceiling [U 0.18 W / (m² × K)] allow relatively easy maintenance of a certain temperature, regardless of the season."
    },
    {
      question: "Can I have a fireplace?",
      answer: "Yes, it is best to plan its place during the planning process and to make connections at the construction stage."
    },
    {
      question: "Can photovoltaic panels be installed?",
      answer: "Yes, we can make the necessary connections for solar panels."
    },
    {
      question: "Will I be able to move it to another place?",
      answer: "Yes, it is possible to relocate the container home to a different location."
    },
    {
      question: "What is the manufacturing process?",
      answer: "This is the basic scope of adaptation of the container containing the following elements: a new shipping container (one way), construction changes of the container, polyurethane spray insulation, internal construction of walls and ceilings, water and sewage system, electrical installation (sockets, connectors), plasterboard smooth, interior painting, window and door woodwork (PVC anthracite, 3-pane package), flashing, external painting."
    }
  ];

  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Container Homes in Cyprus
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Ideal for country home, Airbnb or normal residence. Relatively cheap compared to conventional homes.
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4">
              <div className="bg-secondary p-3 rounded-full">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold mb-1">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="bg-card border rounded-lg p-8 mb-12 max-w-md mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-accent text-white text-sm font-semibold rounded-full mb-4">
            NEW
          </span>
          <h2 className="font-heading text-2xl font-bold mb-2">Price</h2>
          <p className="text-muted-foreground mb-4">Fully Furnished</p>
          <div className="text-4xl font-bold text-primary mb-6">
            €78,000
          </div>
          <ul className="text-left space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Includes delivery to your location</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Delivery time: 3 months</span>
            </li>
          </ul>
          <Button asChild className="w-full bg-accent hover:bg-shoham-orange-dark">
            <Link to="/contact-us">Contact Us</Link>
          </Button>
        </div>

        {/* Specifications */}
        <div className="bg-secondary p-8 rounded-lg mb-12">
          <h2 className="section-title mb-6">Specifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-heading font-semibold mb-3">External Dimensions</h3>
              <p className="text-muted-foreground">2.44 x 12.19 x h 2.89 m</p>
              <p className="text-muted-foreground">Building area: 29.8 m²</p>
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-3">Internal Dimensions</h3>
              <p className="text-muted-foreground">2.00 x 11.80 x h 2.45 m</p>
              <p className="text-muted-foreground">Gross internal (floor) area: 23.6 m²</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-heading font-semibold mb-3">Rooms</h3>
            <ul className="grid sm:grid-cols-3 gap-4 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Home className="w-4 h-4 text-primary" />
                Living room with kitchenette: 14.7 m²
              </li>
              <li className="flex items-center gap-2">
                <Home className="w-4 h-4 text-primary" />
                Bedroom: 5.9 m²
              </li>
              <li className="flex items-center gap-2">
                <Home className="w-4 h-4 text-primary" />
                Bathroom: 3 m²
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="section-title text-center mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="bg-card border p-8 rounded-lg text-center">
          <h3 className="font-heading font-semibold text-xl mb-4">
            Interested in a Container Home?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Contact us for more information about our container homes, customization options, 
            and delivery to your location in Cyprus.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-accent hover:bg-shoham-orange-dark">
              <Link to="/contact-us">Contact Us</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/quote">Request A Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContainerHomes;
