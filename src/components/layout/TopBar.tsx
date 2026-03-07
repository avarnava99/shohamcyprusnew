import { useState, useEffect } from "react";
import { Phone, Mail, Clock, LogOut, Settings, UserCircle, Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
import XIcon from "@/components/icons/XIcon";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { CONTACT } from "@/constants/contact";

const TopBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin");
    
    setIsAdmin(data && data.length > 0);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="bg-[#0a1628] text-white py-2 text-sm">
      <div className="container-shoham flex flex-wrap justify-between items-center gap-2">
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <a href={CONTACT.primary.phoneHref} className="flex items-center gap-2 hover:text-[#f59e0b] transition-colors">
            <Phone className="h-4 w-4" />
            <span>{CONTACT.primary.phone}</span>
          </a>
          <a href={CONTACT.primary.emailHref} className="flex items-center gap-2 hover:text-[#f59e0b] transition-colors">
            <Mail className="h-4 w-4" />
            <span>{CONTACT.primary.email}</span>
          </a>
          <span className="flex items-center gap-2 text-white/70">
            <Clock className="h-4 w-4" />
            <span>{CONTACT.hours.display}</span>
          </span>
          <div className="hidden md:flex items-center gap-2 ml-2">
            <a href={CONTACT.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#f59e0b] transition-colors" aria-label="Facebook"><Facebook className="h-3.5 w-3.5" /></a>
            <a href={CONTACT.socials.x} target="_blank" rel="noopener noreferrer" className="hover:text-[#f59e0b] transition-colors" aria-label="X"><XIcon className="h-3.5 w-3.5" /></a>
            <a href={CONTACT.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#f59e0b] transition-colors" aria-label="LinkedIn"><Linkedin className="h-3.5 w-3.5" /></a>
            <a href={CONTACT.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#f59e0b] transition-colors" aria-label="Instagram"><Instagram className="h-3.5 w-3.5" /></a>
            <a href={CONTACT.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-[#f59e0b] transition-colors" aria-label="YouTube"><Youtube className="h-3.5 w-3.5" /></a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-white/70 hidden sm:inline">{user.email}</span>
              <span className="text-white/50">|</span>
              <Link to="/account" className="hover:text-[#f59e0b] transition-colors flex items-center gap-1">
                <UserCircle className="h-3 w-3" />
                My Account
              </Link>
              {isAdmin && (
                <>
                  <span className="text-white/50">|</span>
                  <Link to="/admin" className="hover:text-[#f59e0b] transition-colors flex items-center gap-1">
                    <Settings className="h-3 w-3" />
                    Admin
                  </Link>
                </>
              )}
              <span className="text-white/50">|</span>
              <button 
                onClick={handleLogout}
                className="hover:text-[#f59e0b] transition-colors flex items-center gap-1"
              >
                <LogOut className="h-3 w-3" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#f59e0b] transition-colors">Login</Link>
              <span className="text-white/50">|</span>
              <Link to="/register" className="hover:text-[#f59e0b] transition-colors">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
