import { Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="bg-[#0a1628] text-white py-2 text-sm">
      <div className="container-shoham flex flex-wrap justify-between items-center gap-2">
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <a href="tel:+357-25-208700" className="flex items-center gap-2 hover:text-[#f59e0b] transition-colors">
            <Phone className="h-4 w-4" />
            <span>+357-25-208700</span>
          </a>
          <a href="mailto:websales@shoham.com.cy" className="flex items-center gap-2 hover:text-[#f59e0b] transition-colors">
            <Mail className="h-4 w-4" />
            <span>websales@shoham.com.cy</span>
          </a>
          <span className="flex items-center gap-2 text-white/70">
            <Clock className="h-4 w-4" />
            <span>08:00 - 17:00</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="hover:text-[#f59e0b] transition-colors">Login</Link>
          <span className="text-white/50">|</span>
          <Link to="/register" className="hover:text-[#f59e0b] transition-colors">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
