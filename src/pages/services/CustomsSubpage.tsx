import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Globe, Home, Download, Car, AlertTriangle, CheckCircle2, Users, Package, FileCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SubpageData {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

const TransferOfResidenceContent = () => (
  <div className="space-y-8">
    {/* Introduction Card */}
    <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 md:p-8 rounded-xl border">
      <div className="flex items-start gap-4">
        <Home className="w-12 h-12 text-primary flex-shrink-0" />
        <div>
          <h3 className="font-heading font-semibold text-xl mb-3">Moving to Cyprus from Outside the EU?</h3>
          <p className="text-muted-foreground mb-4">
            If you're relocating to Cyprus from a country outside the European Union, you may be eligible for 
            <strong className="text-foreground"> relief from import duties and VAT</strong> on your personal property and household goods. 
            This is known as "Transfer of Normal Residence" relief.
          </p>
          <p className="text-muted-foreground mb-4">
            You will need a customs broker to help you with this process, and <strong className="text-foreground">Shoham's customs broker team is at your disposal</strong> to handle all the paperwork and coordination with Cyprus Customs.
          </p>
          <Button asChild variant="outline" className="gap-2">
            <a href="/documents/cyprus-transfer-of-residence-form-ap2.pdf" target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4" />
              Download Official Form (Απ. 2)
            </a>
          </Button>
        </div>
      </div>
    </div>

    {/* Eligibility Requirements */}
    <div className="bg-card border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <CheckCircle2 className="h-6 w-6 text-green-600" />
        <h3 className="font-heading font-semibold text-xl">Eligibility Requirements</h3>
      </div>
      <p className="text-muted-foreground mb-4">To qualify for duty-free import of personal belongings, you must meet ALL of the following conditions:</p>
      <ul className="space-y-3">
        <li className="flex items-start gap-3">
          <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
          <span><strong>12+ months residence outside EU:</strong> You must have had your normal place of residence outside the European Union for at least 12 consecutive months before moving to Cyprus</span>
        </li>
        <li className="flex items-start gap-3">
          <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
          <span><strong>Items owned/used 6+ months:</strong> Personal property must have been in your possession and use for at least 6 months before the transfer</span>
        </li>
        <li className="flex items-start gap-3">
          <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
          <span><strong>Transferring normal residence:</strong> You must be genuinely transferring your normal place of residence to Cyprus</span>
        </li>
        <li className="flex items-start gap-3">
          <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
          <span><strong>No previous relief:</strong> You must not have previously received duty relief for transfer of residence in Cyprus</span>
        </li>
      </ul>
    </div>

    {/* What Can Be Imported */}
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Package className="h-6 w-6 text-primary" />
        <h3 className="font-heading font-semibold text-xl">What Can Be Imported Duty-Free?</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { icon: "🛋️", title: "Furniture & Furnishings", desc: "Household items" },
          { icon: "📺", title: "Electronics & Appliances", desc: "TVs, computers, etc." },
          { icon: "👔", title: "Clothing & Personal Effects", desc: "Wardrobe items" },
          { icon: "📚", title: "Books & Artwork", desc: "Personal collections" },
          { icon: "🎨", title: "Collections & Antiques", desc: "Hobby items" },
          { icon: "🚗", title: "Motor Vehicle*", desc: "Subject to conditions" },
        ].map((item, idx) => (
          <div key={idx} className="bg-secondary p-4 rounded-lg text-center">
            <span className="text-3xl mb-2 block">{item.icon}</span>
            <h4 className="font-semibold text-sm">{item.title}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground mt-3">*Motor vehicles have additional special conditions - see below</p>
    </div>

    {/* Family Members Section */}
    <div className="bg-card border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Users className="h-6 w-6 text-primary" />
        <h3 className="font-heading font-semibold text-xl">Family Members</h3>
      </div>
      <p className="text-muted-foreground">
        Relief can include household members accompanying you to Cyprus. For each family member, you'll need to provide:
      </p>
      <ul className="mt-3 space-y-2 text-muted-foreground">
        <li>• Full name and date of birth</li>
        <li>• Relationship to applicant</li>
        <li>• Passport number and nationality</li>
      </ul>
    </div>

    {/* Motor Vehicle Conditions - Accordion */}
    <Accordion type="single" collapsible className="bg-card border rounded-lg">
      <AccordionItem value="vehicle" className="border-none">
        <AccordionTrigger className="px-6 hover:no-underline">
          <div className="flex items-center gap-3">
            <Car className="h-6 w-6 text-primary" />
            <span className="font-heading font-semibold text-lg">Motor Vehicle Special Conditions</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <p className="text-muted-foreground mb-4">
            Importing a motor vehicle duty-free has additional requirements beyond personal effects:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span>Vehicle must be <strong>registered in your name</strong> for at least 6 months</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span><strong>Insurance certificates</strong> in your name for the past 6+ months required</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span>Valid <strong>driving license</strong> must be provided</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span><strong>Form C.104O</strong> required for vehicle import</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span>You must not have previously imported a duty-free vehicle to Cyprus</span>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4 italic">
            Note: Shoham also offers dedicated <Link to="/services/car-shipping" className="text-accent hover:underline">car shipping services</Link> if you need assistance with vehicle transport.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    {/* Required Documents Table */}
    <div className="bg-card border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <FileCheck className="h-6 w-6 text-primary" />
        <h3 className="font-heading font-semibold text-xl">Required Documentary Evidence</h3>
      </div>
      <p className="text-muted-foreground mb-4">
        Cyprus Customs requires substantial documentation to prove your eligibility. Below are the three categories of evidence needed:
      </p>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-secondary/50 p-4 rounded-lg">
          <h4 className="font-semibold text-primary mb-3 border-b pb-2">Proof of Residence Abroad</h4>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• Passport with entry/exit stamps</li>
            <li>• Property sale/rental termination</li>
            <li>• Employment termination letter</li>
            <li>• Tax records from abroad</li>
            <li>• Utility bills (last 12 months)</li>
            <li>• Council/municipal tax receipts</li>
            <li>• Children's school certificates</li>
            <li>• Bank statements</li>
          </ul>
        </div>
        
        <div className="bg-secondary/50 p-4 rounded-lg">
          <h4 className="font-semibold text-primary mb-3 border-b pb-2">Vehicle Documents (if applicable)</h4>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• Vehicle registration document</li>
            <li>• Insurance certificates (6+ months in your name)</li>
            <li>• Valid driving license</li>
            <li>• Form C.104O</li>
            <li>• Purchase invoice/receipt</li>
            <li>• Road tax receipts</li>
          </ul>
        </div>
        
        <div className="bg-secondary/50 p-4 rounded-lg">
          <h4 className="font-semibold text-primary mb-3 border-b pb-2">Proof of Transfer to Cyprus</h4>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• Property purchase/rental agreement</li>
            <li>• Employment contract in Cyprus</li>
            <li>• Children's school registration</li>
            <li>• ARC (Alien Registration Certificate)</li>
            <li>• Residence permit application</li>
            <li>• Cyprus bank account opening</li>
            <li>• Utility connection receipts</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Warning Section */}
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-6 rounded-lg">
      <div className="flex items-start gap-4">
        <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Important Conditions & Warnings</h4>
          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
            <li>• Goods imported under this relief <strong>cannot be sold, lent, pledged, or hired out</strong> without prior Customs approval</li>
            <li>• <strong>Heavy penalties</strong> apply for false declarations, including forfeiture of goods and prosecution</li>
            <li>• The declaration form (Απ. 2) must be signed in the presence of a Customs officer</li>
            <li>• Goods should be imported within 12 months of establishing residence in Cyprus</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Why Use Shoham CTA */}
    <div className="bg-primary text-primary-foreground p-6 md:p-8 rounded-xl">
      <h3 className="font-heading font-semibold text-xl mb-4">Why Use Shoham's Customs Team?</h3>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            <span>Licensed Cyprus customs brokers</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            <span>Handle all paperwork & forms</span>
          </li>
        </ul>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            <span>Direct coordination with Customs</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            <span>Door-to-door shipping available</span>
          </li>
        </ul>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link to="/contact-us">Get Free Consultation</Link>
        </Button>
        <Button asChild variant="secondary">
          <a href="/documents/cyprus-transfer-of-residence-form-ap2.pdf" target="_blank" rel="noopener noreferrer" className="gap-2">
            <Download className="h-4 w-4" />
            Download Form Απ. 2
          </a>
        </Button>
      </div>
    </div>
  </div>
);

const subpagesData: Record<string, SubpageData> = {
  "eori-registration-cyprus": {
    title: "EORI Registration Cyprus",
    subtitle: "Economic Operators Registration and Identification",
    content: (
      <div className="space-y-6">
        <div className="bg-secondary p-6 rounded-lg">
          <Globe className="w-12 h-12 text-primary mb-4" />
          <h3 className="font-heading font-semibold text-xl mb-3">What is an EORI Number?</h3>
          <p className="text-muted-foreground">
            An EORI (Economic Operators Registration and Identification) number is required for 
            businesses that import or export goods to/from the European Union. It's a unique 
            identification number used throughout the EU.
          </p>
        </div>

        <div className="prose max-w-none">
          <h3>Who Needs an EORI Number?</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span>Businesses importing goods into the EU (including Cyprus)</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span>Companies exporting goods from the EU</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span>Customs agents and freight forwarders</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span>Any economic operator involved in customs procedures</span>
            </li>
          </ul>
        </div>

        <div className="bg-card border p-6 rounded-lg">
          <h3 className="font-heading font-semibold text-lg mb-3">EORI Registration Process</h3>
          <p className="text-muted-foreground mb-4">
            We can assist you with the EORI registration process in Cyprus. Our team will guide you 
            through the application requirements and help ensure a smooth registration.
          </p>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>• Company registration documents required</li>
            <li>• Tax identification number needed</li>
            <li>• Processing time: typically 2-5 business days</li>
            <li>• Valid throughout the European Union</li>
          </ul>
        </div>

        <Button asChild className="bg-accent hover:bg-accent/90">
          <Link to="/contact-us">Get Help with EORI Registration</Link>
        </Button>
      </div>
    )
  },
  "form-1002": {
    title: "Customs Authority Form 1002",
    subtitle: "Customs Authority to Agent Authorization",
    content: (
      <div className="space-y-6">
        <div className="bg-secondary p-6 rounded-lg">
          <FileText className="w-12 h-12 text-primary mb-4" />
          <h3 className="font-heading font-semibold text-xl mb-3">What is Form 1002?</h3>
          <p className="text-muted-foreground">
            Form 1002 is the official customs authority to agent form used in Cyprus. This form 
            authorizes a customs broker or freight forwarder to act on your behalf for customs 
            clearance procedures.
          </p>
        </div>

        <div className="prose max-w-none">
          <h3>When You Need Form 1002</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span>Importing goods into Cyprus through a customs agent</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span>Exporting goods from Cyprus using a freight forwarder</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span>Authorizing representation for customs procedures</span>
            </li>
          </ul>
        </div>

        <div className="bg-card border p-6 rounded-lg">
          <h3 className="font-heading font-semibold text-lg mb-3">How to Complete Form 1002</h3>
          <p className="text-muted-foreground mb-4">
            Contact us to obtain the form and get assistance with completing it correctly. Our team 
            will ensure all required information is properly filled in to avoid any delays in your 
            customs clearance.
          </p>
        </div>

        <Button asChild className="bg-accent hover:bg-accent/90">
          <Link to="/contact-us">Request Form 1002 Assistance</Link>
        </Button>
      </div>
    )
  },
  "transfer-of-normal-residence-from-a-country-outside-the-european-union-to-cyprus": {
    title: "Transfer of Residence to Cyprus",
    subtitle: "Relief from Import Duties & VAT When Moving from Outside the EU",
    content: <TransferOfResidenceContent />
  },
  // Keep old slug as redirect for backwards compatibility
  "transfer-of-residence": {
    title: "Transfer of Residence to Cyprus",
    subtitle: "Relief from Import Duties & VAT When Moving from Outside the EU",
    content: <TransferOfResidenceContent />
  }
};

const CustomsSubpage = () => {
  const { subpage } = useParams<{ subpage: string }>();
  const pageData = subpage ? subpagesData[subpage] : null;

  if (!pageData) {
    return (
      <Layout>
        <div className="container-shoham py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested customs service page could not be found.</p>
          <Button asChild>
            <Link to="/services/customs-clearing">Back to Customs Clearing</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <div className="mb-2">
            <Link to="/services/customs-clearing" className="text-white/70 hover:text-white text-sm">
              ← Back to Customs Clearing
            </Link>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
            {pageData.title}
          </h1>
          <p className="text-white/90 text-lg">{pageData.subtitle}</p>
        </div>
      </div>

      <div className="container-shoham py-12">
        {pageData.content}

        <div className="mt-12 pt-8 border-t">
          <h3 className="font-heading font-semibold text-lg mb-4">Other Customs Services</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(subpagesData)
              .filter(([key]) => key !== subpage && key !== "transfer-of-residence") // Hide the backwards-compat slug
              .map(([key, s]) => (
                <Link
                  key={key}
                  to={`/services/customs-clearing/${key}`}
                  className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
                >
                  {s.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomsSubpage;
