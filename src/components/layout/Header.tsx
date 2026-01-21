import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, Settings, User } from "lucide-react";
import shohamLogo from "@/assets/shoham-logo.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
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
    setMobileMenuOpen(false);
    navigate("/");
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    {
      label: "ZIM Agency",
      href: "/zim-agency-in-cyprus",
      children: [
        { label: "ZIM Worldwide", href: "/zim-agency-in-cyprus/zim-worldwide" },
        { label: "Container Types", href: "/zim-agency-in-cyprus/zim-container-types" },
        { label: "Sailing Schedules", href: "/zim-agency-in-cyprus/sailing-schedules" },
        { label: "Track Container", href: "/zim-agency-in-cyprus/track-your-container" },
      ],
    },
    {
      label: "Port Agency",
      href: "/port-agency",
      children: [
        { label: "Port Agency Overview", href: "/port-agency" },
        { label: "Oil & Gas Agency", href: "/port-agency/oil-gas-agency" },
        { label: "Crew Changes", href: "/port-agency/crew-changes" },
        { label: "STS Operations", href: "/port-agency/sts-operations" },
        { label: "Owners Protecting Agency", href: "/port-agency/owners-protecting-agency" },
        { label: "DryDock Service", href: "/port-agency/drydock-service" },
        { label: "Vessel Repairs", href: "/port-agency/vessel-repairs" },
        { label: "Change of Ownership", href: "/port-agency/change-of-ownership" },
        { label: "Yacht Agency", href: "/port-agency/yacht-agency" },
        { label: "Ports of Cyprus", href: "/port-agency/ports-in-cyprus" },
      ],
    },
    {
      label: "Services",
      href: "/services",
      children: [
        { label: "Container Tracking", href: "/services/container-tracking" },
        { label: "Shipping Rates", href: "/services/shipping-rates" },
        { label: "Freight Forwarding", href: "/services/freight-forwarding" },
        { label: "Sea Freight", href: "/services/sea-freight" },
        { label: "Customs Clearing", href: "/services/customs-clearing" },
        { label: "Duty Calculator", href: "/services/customs-clearing/duty-calculator-for-cyprus" },
        { label: "Transfer of Residence", href: "/services/customs-clearing/transfer-of-normal-residence-from-a-country-outside-the-european-union-to-cyprus" },
        { label: "Haulage", href: "/services/haulage-container-transport" },
        { label: "Air Freight", href: "/services/air-freight" },
        { label: "Car Shipping", href: "/services/car-shipping" },
        { label: "Used Containers", href: "/used-containers" },
      ],
    },
    { label: "Chartering", href: "/chartering" },
    { label: "Project Cargo", href: "/project-cargo" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-shoham py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={shohamLogo} 
              alt="Shoham Shipping & Logistics" 
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors outline-none">
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56 bg-white border shadow-lg z-50">
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.label} asChild>
                          <Link
                            to={child.href}
                            className="w-full cursor-pointer"
                          >
                            {child.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to={item.href}
                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild className="bg-accent hover:bg-shoham-orange-dark text-white font-semibold uppercase tracking-wide">
              <Link to="/quote">Request A Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="block py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="ml-4 space-y-1 mt-1">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            to={child.href}
                            className="block py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              
              {/* Mobile Auth Section */}
              <li className="pt-4 border-t mt-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 py-2 text-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 py-2 text-foreground hover:text-primary transition-colors w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <Link
                      to="/login"
                      className="py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </li>
              
              <li className="pt-2">
                <Button asChild className="w-full bg-accent hover:bg-shoham-orange-dark">
                  <Link to="/quote" onClick={() => setMobileMenuOpen(false)}>
                    Request A Quote
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
