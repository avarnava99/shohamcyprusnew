import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Anchor, Ship, Fuel, Container } from "lucide-react";

const ports = [
  {
    category: "Limassol",
    items: [
      { slug: "limassol-port", title: "DP World Limassol", description: "Multipurpose & general cargo terminal", icon: Anchor },
      { slug: "limassol-container-terminal", title: "Limassol Container Terminal", description: "Eurogate container handling facility", icon: Container },
      { slug: "limassol-port-schedule", title: "Limassol Port Schedule", description: "Vessel arrivals and departures", icon: Ship },
      { slug: "limassol-port-anchorage", title: "Limassol Port Anchorage", description: "Anchorage services", icon: Anchor },
      { slug: "limassol-cruise-terminal", title: "Limassol Cruise Terminal", description: "Cruise ship services", icon: Ship },
    ]
  },
  {
    category: "Larnaca",
    items: [
      { slug: "larnaca-port", title: "Larnaca Port", description: "Secondary commercial port", icon: Anchor },
      { slug: "larnaca-oil-terminal", title: "Larnaca Oil Terminal", description: "Petroleum products terminal", icon: Fuel },
      { slug: "dhekelia-oil-terminal", title: "Dhekelia Oil Terminal", description: "EAC power station fuel terminal", icon: Fuel },
    ]
  },
  {
    category: "Vassiliko",
    items: [
      { slug: "vassiliko-port", title: "Vassiliko Port", description: "Industrial and energy port", icon: Ship },
      { slug: "vassiliko-oil-terminal", title: "Vassiliko Oil Terminal", description: "EAC power station fuel terminal (SBM)", icon: Fuel },
      { slug: "vttv-vassiliko-terminal", title: "VTTV Vassiliko Terminal", description: "Tank terminal for petroleum", icon: Fuel },
    ]
  },
  {
    category: "British Forces",
    items: [
      { slug: "raf-akrotiri-oil-terminal", title: "RAF Akrotiri Oil Terminal", description: "RAF base fuel terminal", icon: Fuel },
    ]
  }
];

const Ports = () => {
  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <div className="mb-2">
            <Link to="/port-agency" className="text-white/70 hover:text-white text-sm">
              ← Back to Port Agency
            </Link>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ports of Cyprus
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Comprehensive port agency services across all major ports in Cyprus
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <p className="text-muted-foreground mb-8 max-w-3xl">
          Shoham provides professional ship agency services at all ports in Cyprus. With decades 
          of experience and deep local knowledge, we ensure smooth port operations for vessels 
          of all types and sizes.
        </p>

        {ports.map((group) => (
          <div key={group.category} className="mb-12">
            <h2 className="section-title">{group.category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {group.items.map((port) => {
                const Icon = port.icon;
                return (
                  <Link
                    key={port.slug}
                    to={`/port-agency/ports-in-cyprus/${port.slug}`}
                    className="bg-card p-6 rounded-lg shadow hover:shadow-lg transition-all group border border-transparent hover:border-primary"
                  >
                    <Icon className="w-10 h-10 text-primary mb-4 group-hover:text-accent transition-colors" />
                    <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {port.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{port.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Ports;
