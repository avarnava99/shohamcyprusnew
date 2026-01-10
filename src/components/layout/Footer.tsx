import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-shoham-navy text-white">
      <div className="container-shoham py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Follow Us */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-white/10 rounded hover:bg-accent transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded hover:bg-accent transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded hover:bg-accent transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded hover:bg-accent transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* ZIM Agency */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">ZIM Agency</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/zim-agency" className="hover:text-accent transition-colors">ZIM Agency</Link></li>
              <li><Link to="/zim-agency/marketing" className="hover:text-accent transition-colors">Marketing and Sales</Link></li>
              <li><Link to="/zim-agency/containers" className="hover:text-accent transition-colors">Container Types</Link></li>
              <li><Link to="/zim-agency/schedules" className="hover:text-accent transition-colors">Sailing Schedules</Link></li>
            </ul>
          </div>

          {/* Port Agency */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Port Agency</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/port-agency" className="hover:text-accent transition-colors">Port Agency</Link></li>
              <li><Link to="/port-agency/oil-gas" className="hover:text-accent transition-colors">Oil & Gas Agency</Link></li>
              <li><Link to="/port-agency/crew-changes" className="hover:text-accent transition-colors">Crew Changes</Link></li>
              <li><Link to="/port-agency/yacht" className="hover:text-accent transition-colors">Yacht Agency</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/services/freight-forwarding" className="hover:text-accent transition-colors">Freight Forwarding</Link></li>
              <li><Link to="/services/customs" className="hover:text-accent transition-colors">Customs Clearing</Link></li>
              <li><Link to="/services/haulage" className="hover:text-accent transition-colors">Haulage</Link></li>
              <li><Link to="/chartering" className="hover:text-accent transition-colors">Chartering</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <a href="tel:+357-25-208700" className="hover:text-accent transition-colors">+357-25-208700</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:websales@shoham.com.cy" className="hover:text-accent transition-colors">websales@shoham.com.cy</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent mt-0.5" />
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
