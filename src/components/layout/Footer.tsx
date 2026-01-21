import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin, Printer } from "lucide-react";
import shohamLogo from "@/assets/shoham-logo.png";

const Footer = () => {
  const zimAgencyLinks = [
    { label: "Marketing and Sales", href: "/zim-agency-in-cyprus/marketing-and-sales" },
    { label: "Container Types", href: "/zim-agency-in-cyprus/zim-container-types" },
    { label: "ZIM Sailing Schedules", href: "/zim-agency-in-cyprus/sailing-schedules" },
    { label: "ZIM Worldwide", href: "/zim-agency-in-cyprus/zim-worldwide" },
    { label: "Track Container Cyprus", href: "/zim-agency-in-cyprus/track-your-container" },
    { label: "Track Your Cargo", href: "/zim-agency-in-cyprus/track-your-container" },
  ];

  const portAgencyLinks = [
    { label: "Port Agency", href: "/port-agency" },
    { label: "Oil & Gas Agency", href: "/port-agency/oil-gas-agency" },
    { label: "Crew Changes", href: "/port-agency/crew-changes" },
    { label: "STS Operations", href: "/port-agency/sts-operations" },
    { label: "Owners Protecting Agency", href: "/port-agency/owners-protecting-agency" },
    { label: "DryDock Service", href: "/port-agency/drydock-service" },
    { label: "Vessel Repairs", href: "/port-agency/vessel-repairs" },
    { label: "Change of Ownership", href: "/port-agency/change-of-ownership" },
    { label: "Yacht Agency", href: "/port-agency/yacht-agency" },
  ];

  const servicesLinks = [
    { label: "All Services", href: "/services" },
    { label: "Freight Forwarding", href: "/services/freight-forwarding" },
    { label: "Project Cargo", href: "/project-cargo" },
    { label: "Chartering", href: "/chartering" },
    { label: "Air Freight", href: "/services/air-freight" },
    { label: "Sea Freight", href: "/services/sea-freight" },
    { label: "Customs Clearing", href: "/services/customs-clearing" },
    { label: "Haulage", href: "/services/haulage-container-transport" },
    { label: "Car Shipping", href: "/services/car-shipping" },
    { label: "Marine Logistics", href: "/services/marine-logistics" },
    { label: "Cargo Insurance", href: "/services/marine-insurance" },
    { label: "Parcel Forwarding", href: "/services/parcel-forwarding" },
    { label: "Shop UK Stores & Ship to Cyprus", href: "/online-purchases-shipped-to-cyprus-from-amazon-uk" },
    { label: "E-commerce from Germany", href: "/ecommerce-purchases-from-germany" },
    { label: "E-commerce from USA", href: "/ecommerce-purchases-from-usa" },
    { label: "Tank Containers", href: "/iso-tank" },
    { label: "Cross Shipments", href: "/services/cross-shipments" },
    { label: "Used Containers", href: "/services/used-containers" },
    { label: "Travel Agency", href: "/travel-agency" },
  ];

  const portsLinks = [
    { label: "Limassol Port", href: "/port-agency/ports-in-cyprus/limassol-port" },
    { label: "Limassol Port Schedule", href: "/port-agency/ports-in-cyprus/limassol-port-schedule" },
    { label: "Limassol Port Anchorage", href: "/port-agency/ports-in-cyprus/limassol-port-anchorage" },
    { label: "Limassol Cruise Terminal", href: "/port-agency/ports-in-cyprus/limassol-cruise-terminal" },
    { label: "Larnaca Port", href: "/port-agency/ports-in-cyprus/larnaca-port" },
    { label: "Larnaca Oil Terminal", href: "/port-agency/ports-in-cyprus/larnaca-oil-terminal" },
    { label: "Vassiliko Port", href: "/port-agency/ports-in-cyprus/vassiliko-port" },
    { label: "Vassiliko Oil Terminal", href: "/port-agency/ports-in-cyprus/vassiliko-oil-terminal" },
    { label: "VTTV Vassiliko Terminal", href: "/port-agency/ports-in-cyprus/vttv-vassiliko-terminal" },
    { label: "Dhekelia Oil Terminal", href: "/port-agency/ports-in-cyprus/dhekelia-oil-terminal" },
    { label: "RAF Akrotiri Oil Terminal", href: "/port-agency/ports-in-cyprus/raf-akrotiri-oil-terminal" },
  ];

  return (
    <footer className="bg-[#0a1628] text-white">
      <div className="container-shoham py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo & Follow Us */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img 
                src={shohamLogo} 
                alt="Shoham Shipping & Logistics" 
                className="h-12 w-auto bg-white p-2 rounded"
              />
            </Link>
            <h3 className="font-heading font-semibold text-lg mb-4 text-white">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-white/10 rounded hover:bg-[#f59e0b] transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded hover:bg-[#f59e0b] transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded hover:bg-[#f59e0b] transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded hover:bg-[#f59e0b] transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-white" />
              </a>
            </div>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-2 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#f59e0b]" />
                <a href="tel:+357-25-208700" className="hover:text-[#f59e0b] transition-colors">+357-25-208700</a>
              </div>
              <div className="flex items-center gap-2">
                <Printer className="h-4 w-4 text-[#f59e0b]" />
                <span>+357-25-568990</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#f59e0b]" />
                <a href="mailto:websales@shoham.com.cy" className="hover:text-[#f59e0b] transition-colors">websales@shoham.com.cy</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#f59e0b] mt-0.5" />
                <span>Limassol, Cyprus</span>
              </div>
            </div>
          </div>

          {/* ZIM Agency */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-white">ZIM Agency</h3>
            <ul className="space-y-2 text-sm text-white/80">
              {zimAgencyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link to={link.href} className="hover:text-[#f59e0b] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Port Agency */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-white">Port Agency</h3>
            <ul className="space-y-2 text-sm text-white/80">
              {portAgencyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link to={link.href} className="hover:text-[#f59e0b] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - Split into 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="font-heading font-semibold text-lg mb-4 text-white">Services</h3>
            <div className="grid grid-cols-2 gap-x-4">
              <ul className="space-y-2 text-sm text-white/80">
                {servicesLinks.slice(0, 10).map((link) => (
                  <li key={link.href + link.label}>
                    <Link to={link.href} className="hover:text-[#f59e0b] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2 text-sm text-white/80">
                {servicesLinks.slice(10).map((link) => (
                  <li key={link.href + link.label}>
                    <Link to={link.href} className="hover:text-[#f59e0b] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Ports */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-white">Ports</h3>
            <ul className="space-y-2 text-sm text-white/80">
              {portsLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link to={link.href} className="hover:text-[#f59e0b] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              &copy; {new Date().getFullYear()} Shoham Shipping and Logistics. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/60">
              <Link to="/frequently-asked-questions" className="hover:text-[#f59e0b] transition-colors">
                FAQ
              </Link>
              <Link to="/about-us/privacy-policy" className="hover:text-[#f59e0b] transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="hover:text-[#f59e0b] transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
