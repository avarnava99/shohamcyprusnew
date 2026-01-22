import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

// Map of URL segments to readable labels
const labelMap: Record<string, string> = {
  "about-us": "About Us",
  "zim-agency-in-cyprus": "ZIM Agency",
  "port-agency": "Port Agency",
  "ports-in-cyprus": "Ports of Cyprus",
  "services": "Services",
  "chartering": "Chartering",
  "project-cargo": "Project Cargo",
  "contact-us": "Contact Us",
  "quote": "Request Quote",
  "blog": "News",
  "login": "Login",
  "register": "Register",
  "admin": "Admin",
  "contacts": "Contact Submissions",
  "container-orders": "Container Orders",
  "duty-leads": "Duty Calculator Leads",
  "frequently-asked-questions": "FAQ",
  "privacy-policy": "Privacy Policy",
  "terms-of-service": "Terms of Service",
  "container-types": "Container Types",
  "travel-agency": "Travel Agency",
  "container-homes": "Container Homes",
  "used-containers": "Used Containers",
  "iso-tank": "ISO Tank Containers",
  // ZIM subpages
  "zim-worldwide": "ZIM Worldwide",
  "zim-container-types": "Container Types",
  "sailing-schedules": "Sailing Schedules",
  "track-your-container": "Track Container",
  "marketing-and-sales": "Marketing & Sales",
  // Port Agency subpages
  "oil-gas-agency": "Oil & Gas Agency",
  "crew-changes": "Crew Changes",
  "sts-operations": "STS Operations",
  "owners-protecting-agency": "Owners Protecting Agency",
  "drydock-service": "DryDock Service",
  "vessel-repairs": "Vessel Repairs",
  "change-of-ownership": "Change of Ownership",
  "yacht-agency": "Yacht Agency",
  // Port pages
  "limassol-port": "Limassol Port",
  "limassol-port-schedule": "Limassol Port Schedule",
  "limassol-port-anchorage": "Limassol Port Anchorage",
  "limassol-cruise-terminal": "Limassol Cruise Terminal",
  "limassol-container-terminal": "Limassol Container Terminal",
  "larnaca-port": "Larnaca Port",
  "larnaca-oil-terminal": "Larnaca Oil Terminal",
  "vassiliko-port": "Vassiliko Port",
  "vassiliko-oil-terminal": "Vassiliko Oil Terminal",
  "vttv-vassiliko-terminal": "VTTV Vassiliko Terminal",
  "dhekelia-oil-terminal": "Dhekelia Oil Terminal",
  "raf-akrotiri-oil-terminal": "RAF Akrotiri Oil Terminal",
  // Services subpages
  "container-tracking": "Container Tracking",
  "shipping-rates": "Shipping Rates",
  "freight-forwarding": "Freight Forwarding",
  "sea-freight": "Sea Freight",
  "customs-clearing": "Customs Clearing",
  "duty-calculator-for-cyprus": "Duty Calculator",
  "transfer-of-normal-residence-from-a-country-outside-the-european-union-to-cyprus": "Transfer of Residence",
  "haulage-container-transport": "Haulage",
  "air-freight": "Air Freight",
  "car-shipping": "Car Shipping",
  "marine-logistics": "Marine Logistics",
  "marine-insurance": "Cargo Insurance",
  "parcel-forwarding": "Parcel Forwarding",
  "cross-shipments": "Cross Shipments",
  // E-commerce pages
  "online-purchases-shipped-to-cyprus-from-amazon-uk": "Amazon UK Shipping",
  "ecommerce-purchases-from-germany": "E-commerce from Germany",
  "ecommerce-purchases-from-usa": "E-commerce from USA",
};

// Convert slug to readable label
const getLabel = (segment: string): string => {
  if (labelMap[segment]) {
    return labelMap[segment];
  }
  // Fallback: convert kebab-case to Title Case
  return segment
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

interface BreadcrumbsProps {
  className?: string;
}

const Breadcrumbs = ({ className = "" }: BreadcrumbsProps) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Don't show breadcrumbs on home page
  if (pathSegments.length === 0) {
    return null;
  }

  // Build breadcrumb items with paths
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = getLabel(segment);
    const isLast = index === pathSegments.length - 1;

    return { path, label, isLast };
  });

  return (
    <nav aria-label="Breadcrumb" className={`py-3 ${className}`}>
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        <li className="flex items-center">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
            {crumb.isLast ? (
              <span className="text-foreground font-medium">{crumb.label}</span>
            ) : (
              <Link
                to={crumb.path}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
