import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SEO, { faqJsonLd } from "@/components/SEO";

const FAQ = () => {
  const faqCategories = [
    {
      title: "Shipping & Freight",
      faqs: [
        {
          question: "How long does shipping from China to Cyprus take?",
          answer: "Sea freight from China to Cyprus typically takes 20-30 days depending on the port of origin and shipping line. Express services may be available for faster delivery."
        },
        {
          question: "What is the difference between FCL and LCL shipping?",
          answer: "FCL (Full Container Load) means you rent an entire container for your goods. LCL (Less than Container Load) means your goods share a container with other shipments. FCL is more cost-effective for larger shipments, while LCL is ideal for smaller volumes."
        },
        {
          question: "Do you offer door-to-door delivery?",
          answer: "Yes, we offer complete door-to-door delivery services. This includes pickup from the origin, all shipping and customs procedures, and final delivery to your specified address in Cyprus."
        },
        {
          question: "Can you ship hazardous goods?",
          answer: "Yes, we can handle hazardous goods (DG cargo) with proper documentation and packaging. Please contact us with details of your goods for specific requirements and pricing."
        },
        {
          question: "What shipping documents do I need?",
          answer: "Required documents typically include: Commercial Invoice, Packing List, Bill of Lading, and Certificate of Origin. Additional documents may be required depending on the type of goods."
        }
      ]
    },
    {
      title: "Customs & Duties",
      faqs: [
        {
          question: "How are import duties calculated in Cyprus?",
          answer: "Import duties are calculated based on the CIF value (Cost, Insurance, Freight) of the goods, the HS code classification, and the country of origin. VAT at 19% is also applied on most goods."
        },
        {
          question: "Do I need an EORI number to import goods?",
          answer: "Yes, an EORI number is required for all businesses importing or exporting goods to/from the European Union, including Cyprus. We can assist with EORI registration."
        },
        {
          question: "Are there any duty exemptions available?",
          answer: "Yes, various exemptions exist including: Transfer of Residence for personal effects, temporary imports, and certain goods under preferential trade agreements. Contact us for specific advice."
        },
        {
          question: "How long does customs clearance take?",
          answer: "Standard customs clearance typically takes 1-3 business days once all documents are in order. Complex shipments or those requiring inspections may take longer."
        }
      ]
    },
    {
      title: "Tracking & Delivery",
      faqs: [
        {
          question: "How can I track my shipment?",
          answer: "For ZIM shipments, you can track your container through the ZIM website. For other shipments, we provide regular status updates and can provide tracking information upon request."
        },
        {
          question: "What happens if my goods are damaged during shipping?",
          answer: "All shipments should be covered by marine insurance. If damage occurs, document it immediately upon receipt, notify us within 3 days, and we'll assist with the claims process."
        },
        {
          question: "Do you offer storage/warehousing services?",
          answer: "Yes, we offer both short-term and long-term warehousing services at strategic locations. We also provide inventory management and distribution services."
        }
      ]
    },
    {
      title: "Port Agency Services",
      faqs: [
        {
          question: "Which ports in Cyprus do you serve?",
          answer: "We provide port agency services at all major Cyprus ports including Limassol Port, Larnaca Port, Vassiliko Port, and Moni anchorage."
        },
        {
          question: "Do you handle yacht/pleasure craft arrivals?",
          answer: "Yes, we offer comprehensive yacht agency services including clearance, provisioning, bunkering, and crew assistance."
        },
        {
          question: "Can you arrange crew changes in Cyprus?",
          answer: "Yes, we handle all aspects of crew changes including immigration procedures, airport transfers, accommodation, and vessel visits."
        }
      ]
    }
  ];

  const allFaqs = faqCategories.flatMap(c => c.faqs);

  return (
    <Layout>
      <SEO
        title="Frequently Asked Questions"
        description="Find answers about shipping, customs duties, tracking, and port agency services in Cyprus."
        path="/frequently-asked-questions"
        jsonLd={faqJsonLd(allFaqs)}
      />
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Find answers to common questions about our shipping, freight forwarding, 
            and logistics services.
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="section-title mb-6">{category.title}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`${categoryIndex}-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="bg-secondary p-8 rounded-lg text-center max-w-2xl mx-auto">
          <h3 className="font-heading font-semibold text-xl mb-4">
            Still Have Questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Our team is here to help.
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

export default FAQ;
