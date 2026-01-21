import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Globe, Home } from "lucide-react";

interface SubpageData {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

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

        <Button asChild className="bg-accent hover:bg-shoham-orange-dark">
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

        <Button asChild className="bg-accent hover:bg-shoham-orange-dark">
          <Link to="/contact-us">Request Form 1002 Assistance</Link>
        </Button>
      </div>
    )
  },
  "transfer-of-residence": {
    title: "Transfer of Residence",
    subtitle: "Moving to Cyprus from Outside the EU",
    content: (
      <div className="space-y-6">
        <div className="bg-secondary p-6 rounded-lg">
          <Home className="w-12 h-12 text-primary mb-4" />
          <h3 className="font-heading font-semibold text-xl mb-3">Transfer of Normal Residence</h3>
          <p className="text-muted-foreground">
            If you're relocating to Cyprus from a country outside the European Union, you may be 
            eligible for duty-free import of your personal effects and household goods under the 
            Transfer of Residence provisions.
          </p>
        </div>

        <div className="prose max-w-none">
          <h3>Eligibility Requirements</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span>Must have resided outside the EU for at least 12 months</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span>Personal effects must have been owned and used for at least 6 months</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span>Must intend to take up permanent residence in Cyprus</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span>Goods must be imported within 12 months of establishing residence</span>
            </li>
          </ul>
        </div>

        <div className="bg-card border p-6 rounded-lg">
          <h3 className="font-heading font-semibold text-lg mb-3">What Can Be Imported Duty-Free?</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Household furniture and furnishings</li>
            <li>• Personal effects and clothing</li>
            <li>• Books, artwork, and collections</li>
            <li>• Electrical appliances</li>
            <li>• One motor vehicle (subject to conditions)</li>
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
          <h4 className="font-semibold text-amber-800 mb-2">Required Documentation</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Proof of residence abroad (utility bills, rental agreement)</li>
            <li>• Passport with entry/exit stamps</li>
            <li>• Inventory of goods being imported</li>
            <li>• Proof of ownership of goods</li>
          </ul>
        </div>

        <Button asChild className="bg-accent hover:bg-shoham-orange-dark">
          <Link to="/contact-us">Get Help with Transfer of Residence</Link>
        </Button>
      </div>
    )
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
              .filter(([key]) => key !== subpage)
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
