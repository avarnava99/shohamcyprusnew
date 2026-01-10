import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin, Printer } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0a1628] text-white">
      <div className="container-shoham py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Follow Us */}
          <div>
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
          </div>

          {/* ZIM Agency */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-white">ZIM Agency</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/zim-agency-in-cyprus" className="hover:text-[#f59e0b] transition-colors">ZIM Agency</Link></li>
              <li><Link to="/zim-agency-in-cyprus/zim-worldwide" className="hover:text-[#f59e0b] transition-colors">ZIM Worldwide</Link></li>
              <li><Link to="/zim-agency-in-cyprus/zim-container-types" className="hover:text-[#f59e0b] transition-colors">Container Types</Link></li>
              <li><Link to="/zim-agency-in-cyprus/sailing-schedules" className="hover:text-[#f59e0b] transition-colors">Sailing Schedules</Link></li>
              <li><Link to="/zim-agency-in-cyprus/track-your-container" className="hover:text-[#f59e0b] transition-colors">Track Container</Link></li>
            </ul>
          </div>

          {/* Port Agency */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-white">Port Agency</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/port-agency" className="hover:text-[#f59e0b] transition-colors">Port Agency</Link></li>
              <li><Link to="/port-agency/oil-gas-agency" className="hover:text-[#f59e0b] transition-colors">Oil & Gas Agency</Link></li>
              <li><Link to="/port-agency/crew-changes" className="hover:text-[#f59e0b] transition-colors">Crew Changes</Link></li>
              <li><Link to="/port-agency/sts-operations" className="hover:text-[#f59e0b] transition-colors">STS Operations</Link></li>
              <li><Link to="/port-agency/yacht-agency" className="hover:text-[#f59e0b] transition-colors">Yacht Agency</Link></li>
              <li><Link to="/port-agency/ports-in-cyprus" className="hover:text-[#f59e0b] transition-colors">Ports of Cyprus</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-white">Services</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/services/freight-forwarding" className="hover:text-[#f59e0b] transition-colors">Freight Forwarding</Link></li>
              <li><Link to="/services/customs-clearing" className="hover:text-[#f59e0b] transition-colors">Customs Clearing</Link></li>
              <li><Link to="/services/haulage-container-transport" className="hover:text-[#f59e0b] transition-colors">Haulage</Link></li>
              <li><Link to="/services/air-freight" className="hover:text-[#f59e0b] transition-colors">Air Freight</Link></li>
              <li><Link to="/chartering" className="hover:text-[#f59e0b] transition-colors">Chartering</Link></li>
            </ul>
          </div>

          {/* Ports */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-white">Ports</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/port-agency/ports-in-cyprus/limassol-port" className="hover:text-[#f59e0b] transition-colors">Limassol Port</Link></li>
              <li><Link to="/port-agency/ports-in-cyprus/larnaca-port" className="hover:text-[#f59e0b] transition-colors">Larnaca Port</Link></li>
              <li><Link to="/port-agency/ports-in-cyprus/larnaca-oil-terminal" className="hover:text-[#f59e0b] transition-colors">Larnaca Oil Terminal</Link></li>
              <li><Link to="/port-agency/ports-in-cyprus/vassiliko-port" className="hover:text-[#f59e0b] transition-colors">Vassiliko Port</Link></li>
              <li><Link to="/port-agency/ports-in-cyprus/vassiliko-oil-terminal" className="hover:text-[#f59e0b] transition-colors">Vassiliko Oil Terminal</Link></li>
              <li><Link to="/port-agency/ports-in-cyprus/dhekelia-oil-terminal" className="hover:text-[#f59e0b] transition-colors">Dhekelia Oil Terminal</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#f59e0b]" />
                <a href="tel:+357-25-208700" className="hover:text-[#f59e0b] transition-colors">T: +357-25-208700</a>
              </li>
              <li className="flex items-center gap-2">
                <Printer className="h-4 w-4 text-[#f59e0b]" />
                <span>F: +357-25-568990</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#f59e0b]" />
                <a href="mailto:websales@shoham.com.cy" className="hover:text-[#f59e0b] transition-colors">websales@shoham.com.cy</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#f59e0b] mt-0.5" />
                <span>Limassol, Cyprus</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Shoham Shipping and Logistics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
