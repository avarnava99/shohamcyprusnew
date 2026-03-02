import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, Settings, User, Ship, Anchor, Package, Plane, Truck, FileCheck, Container, MapPin } from "lucide-react";
import shohamLogo from "@/assets/shoham-logo.png";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

interface MegaMenuColumn {
  title: string;
  icon?: React.ReactNode;
  items: { label: string; href: string }[];
}

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
  megaMenu?: MegaMenuColumn[];
}

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => checkAdminRole(session.user.id), 0);
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

  const servicesMegaMenu: MegaMenuColumn[] = [
    {
      title: "Shipping",
      icon: <Ship className="h-4 w-4" />,
      items: [
        { label: "Sea Freight", href: "/services/sea-freight" },
        { label: "Air Freight", href: "/services/air-freight" },
        { label: "Car Shipping", href: "/services/car-shipping" },
        { label: "Shipping Rates", href: "/services/shipping-rates" },
      ],
    },
    {
      title: "Logistics",
      icon: <Truck className="h-4 w-4" />,
      items: [
        { label: "Freight Forwarding", href: "/services/freight-forwarding" },
        { label: "Haulage", href: "/services/haulage-container-transport" },
      ],
    },
    {
      title: "Customs",
      icon: <FileCheck className="h-4 w-4" />,
      items: [
        { label: "Customs Clearing", href: "/services/customs-clearing" },
        { label: "Duty Calculator", href: "/services/customs-clearing/duty-calculator-for-cyprus" },
        { label: "Transfer of Residence", href: "/services/customs-clearing/transfer-of-normal-residence-from-a-country-outside-the-european-union-to-cyprus" },
      ],
    },
    {
      title: "Containers",
      icon: <Container className="h-4 w-4" />,
      items: [
        { label: "Container Tracking", href: "/services/container-tracking" },
        { label: "Used Containers", href: "/services/used-containers" },
      ],
    },
  ];

  const portAgencyMegaMenu: MegaMenuColumn[] = [
    {
      title: "Vessel Services",
      icon: <Ship className="h-4 w-4" />,
      items: [
        { label: "Port Agency Overview", href: "/port-agency" },
        { label: "Oil & Gas Agency", href: "/port-agency/oil-gas-agency" },
        { label: "Crew Changes", href: "/port-agency/crew-changes" },
        { label: "Yacht Agency", href: "/port-agency/yacht-agency" },
        { label: "Owners Protecting Agency", href: "/port-agency/owners-protecting-agency" },
      ],
    },
    {
      title: "Operations",
      icon: <Anchor className="h-4 w-4" />,
      items: [
        { label: "STS Operations", href: "/port-agency/sts-operations" },
        { label: "DryDock Service", href: "/port-agency/drydock-service" },
        { label: "Vessel Repairs", href: "/port-agency/vessel-repairs" },
        { label: "Change of Ownership", href: "/port-agency/change-of-ownership" },
      ],
    },
    {
      title: "Ports",
      icon: <MapPin className="h-4 w-4" />,
      items: [
        { label: "Ports of Cyprus", href: "/port-agency/ports-in-cyprus" },
        { label: "Limassol Terminal", href: "/port-agency/ports-in-cyprus/limassol-container-terminal" },
        { label: "Berth Schedule", href: "/port-agency/ports-in-cyprus/limassol-port-schedule" },
      ],
    },
  ];

  const zimMegaMenu: MegaMenuColumn[] = [
    {
      title: "ZIM Services",
      icon: <Ship className="h-4 w-4" />,
      items: [
        { label: "ZIM Worldwide", href: "/zim-agency-in-cyprus/zim-worldwide" },
        { label: "Container Types", href: "/zim-agency-in-cyprus/zim-container-types" },
        { label: "Sailing Schedules", href: "/zim-agency-in-cyprus/sailing-schedules" },
        { label: "Track Container", href: "/zim-agency-in-cyprus/track-your-container" },
      ],
    },
  ];

  const navItems: NavItem[] = [
    { label: "About Us", href: "/about-us", children: [
      { label: "Ship. Association", href: "/about-us/general-information/cyprus-shipping-association" },
      { label: "MOU with Customs", href: "/about-us/general-information/mou-with-customs" },
      { label: "FONASBA", href: "/about-us/general-information/fonasba" },
      { label: "CYMEPA", href: "/about-us/general-information/cymepa" },
      { label: "ICS", href: "/about-us/general-information/ics-branch-cyprus" },
      { label: "YoungShip", href: "/about-us/general-information/youngship-cyprus" },
    ]},
    { label: "ZIM Agency", href: "/zim-agency-in-cyprus", megaMenu: zimMegaMenu },
    { label: "Port Agency", href: "/port-agency", megaMenu: portAgencyMegaMenu },
    { label: "Services", href: "/services", megaMenu: servicesMegaMenu },
    { label: "Chartering", href: "/chartering" },
    { label: "Project Cargo", href: "/project-cargo" },
    { label: "News", href: "/blog" },
  ];

  const isActivePath = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header 
      className={cn(
        "bg-white sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "shadow-lg py-2" : "shadow-md py-4"
      )}
    >
      <div className="container-shoham">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img 
              src={shohamLogo} 
              alt="Shoham Shipping & Logistics" 
              className={cn(
                "w-auto transition-all duration-300",
                isScrolled ? "h-10" : "h-12 md:h-14"
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li 
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => (item.megaMenu || item.children) && setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2.5 text-[15px] font-semibold tracking-wide transition-all duration-200 rounded-md whitespace-nowrap",
                      isActivePath(item.href) 
                        ? "text-primary" 
                        : "text-foreground hover:text-primary hover:bg-secondary/50"
                    )}
                  >
                    {item.label}
                    {(item.megaMenu || item.children) && (
                      <ChevronDown 
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          activeMenu === item.label && "rotate-180"
                        )} 
                      />
                    )}
                  </Link>
                  
                  {/* Active indicator */}
                  {isActivePath(item.href) && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
                  )}

                  {/* Simple Dropdown */}
                  {item.children && !item.megaMenu && activeMenu === item.label && (
                    <div
                      className="absolute top-full left-0 pt-2 z-50"
                      onMouseEnter={() => setActiveMenu(item.label)}
                      onMouseLeave={() => setActiveMenu(null)}
                    >
                      <div className="bg-white rounded-lg shadow-xl border border-border/50 py-2 animate-fade-in min-w-[220px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary/30 transition-colors"
                            onClick={() => setActiveMenu(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mega Menu Dropdown */}
                  {item.megaMenu && activeMenu === item.label && (
                    <div 
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                      onMouseEnter={() => setActiveMenu(item.label)}
                      onMouseLeave={() => setActiveMenu(null)}
                    >
                      <div className="bg-white rounded-lg shadow-xl border border-border/50 p-6 animate-fade-in min-w-[480px]">
                        <div className="flex gap-8">
                          {item.megaMenu.map((column) => (
                            <div key={column.title} className="min-w-[140px]">
                              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
                                <span className="text-primary">{column.icon}</span>
                                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                                  {column.title}
                                </h3>
                              </div>
                              <ul className="space-y-1">
                                {column.items.map((subItem) => (
                                  <li key={subItem.label}>
                                    <Link
                                      to={subItem.href}
                                      className="block py-1.5 text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200"
                                      onClick={() => setActiveMenu(null)}
                                    >
                                      {subItem.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button & Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/admin">
                      <Settings className="h-4 w-4 mr-1" />
                      Admin
                    </Link>
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : null}
            <Button asChild className="bg-accent hover:bg-[hsl(var(--shoham-orange-dark))] text-white font-semibold uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-200">
              <Link to="/quote">Request A Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-secondary/50 rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t pt-4 animate-fade-in">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={cn(
                      "block py-2.5 px-3 rounded-md font-medium transition-colors",
                      isActivePath(item.href)
                        ? "text-primary bg-secondary/50"
                        : "text-foreground hover:text-primary hover:bg-secondary/30"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.megaMenu && (
                    <ul className="ml-4 mt-1 space-y-1 border-l-2 border-border pl-3">
                      {item.megaMenu.flatMap((col) => col.items).map((child) => (
                        <li key={child.label}>
                          <Link
                            to={child.href}
                            className="block py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
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
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 py-2 px-3 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 py-2.5 px-3 rounded-md text-foreground hover:text-primary hover:bg-secondary/30 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 py-2.5 px-3 rounded-md text-foreground hover:text-primary hover:bg-secondary/30 transition-colors w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-4 px-3">
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
              
              <li className="pt-2 px-3">
                <Button asChild className="w-full bg-accent hover:bg-[hsl(var(--shoham-orange-dark))]">
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
