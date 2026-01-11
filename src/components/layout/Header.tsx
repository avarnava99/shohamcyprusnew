import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import shohamLogo from "@/assets/shoham-logo.png";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        { label: "Oil & Gas Agency", href: "/port-agency/oil-gas-agency" },
        { label: "Crew Changes", href: "/port-agency/crew-changes" },
        { label: "STS Operations", href: "/port-agency/sts-operations" },
        { label: "Yacht Agency", href: "/port-agency/yacht-agency" },
        { label: "DryDock Service", href: "/port-agency/drydock-service" },
        { label: "Vessel Repairs", href: "/port-agency/vessel-repairs" },
        { label: "Ports of Cyprus", href: "/port-agency/ports-in-cyprus" },
      ],
    },
    {
      label: "Services",
      href: "/services",
      children: [
        { label: "Freight Forwarding", href: "/services/freight-forwarding" },
        { label: "Customs Clearing", href: "/services/customs-clearing" },
        { label: "Haulage", href: "/services/haulage-container-transport" },
        { label: "Air Freight", href: "/services/air-freight" },
        { label: "Car Shipping", href: "/services/car-shipping" },
        { label: "Parcel Forwarding", href: "/services/parcel-forwarding" },
        { label: "Warehousing", href: "/services/warehousing" },
        { label: "Marine Insurance", href: "/services/marine-insurance" },
      ],
    },
    { label: "Chartering", href: "/chartering" },
    { label: "Projects", href: "/projects" },
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
          <nav className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className="text-foreground hover:text-primary">
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-56 gap-1 p-2">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={child.href}
                                    className="block p-2 text-sm hover:bg-secondary rounded transition-colors"
                                  >
                                    {child.label}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
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
