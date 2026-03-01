import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, PackageOpen, Monitor, Plane, CalendarCheck, Send, Clock, ShieldCheck, Truck } from "lucide-react";
import shohamLogo from "@/assets/shoham-logo.png";
import exnessLogo from "@/assets/exness-logo.webp";
import imgRelocations from "@/assets/exness/employee-relocations.jpg";
import imgPacking from "@/assets/exness/packing-removals.jpg";
import imgIT from "@/assets/exness/it-equipment.jpg";
import imgTravel from "@/assets/exness/corporate-travel.jpg";
import imgEvent from "@/assets/exness/event-logistics.jpg";
import imgParcel from "@/assets/exness/parcel-forwarding.jpg";

const services = [
  {
    title: "Employee Relocations",
    icon: Users,
    image: imgRelocations,
    points: [
      "Customs clearance for transfer of residence",
      "Duty-free vehicle imports",
      "Personal effects shipping",
      "Paperwork handled end to end",
    ],
  },
  {
    title: "Packing & Removals",
    icon: PackageOpen,
    image: imgPacking,
    points: [
      "Professional packing for staff moving in or out",
      "International door-to-door moves",
      "Temporary storage solutions",
    ],
  },
  {
    title: "IT & Equipment Shipping",
    icon: Monitor,
    image: imgIT,
    points: [
      "Networking gear, servers, office hardware",
      "Express and economy options",
      "Worldwide coverage",
      "Customs cleared and delivered",
    ],
  },
  {
    title: "Corporate Travel",
    icon: Plane,
    image: imgTravel,
    points: [
      "Business travel bookings",
      "Group arrangements for events",
      "Airport transfers",
    ],
  },
  {
    title: "Event Logistics",
    icon: CalendarCheck,
    image: imgEvent,
    points: [
      "Equipment transport for corporate events",
      "Exhibition stand shipping",
      "On-site coordination",
      "Project management from A to Z",
    ],
  },
  {
    title: "Parcel Forwarding",
    icon: Send,
    image: imgParcel,
    points: [
      "Regular forwarding from UK / EU / US",
      "Office supply shipments",
      "Tracked delivery to your door",
    ],
  },
];

const facts = [
  { icon: Clock, label: "Since 1946", sub: "78 years in Cyprus" },
  { icon: ShieldCheck, label: "Licensed Customs Broker", sub: "Full brokerage authority" },
  { icon: Truck, label: "Island-wide Delivery", sub: "Own fleet & warehousing" },
];

const ExnessPartnership = () => {
  return (
    <Layout hideBreadcrumbs>
      {/* Hero */}
      <section className="bg-primary py-20">
        <div className="container-shoham">
          <div className="flex items-center justify-center gap-6 mb-10">
            <img src={shohamLogo} alt="Shoham Shipping logo" className="h-14 md:h-20 object-contain" />
            <span className="text-white/60 text-3xl md:text-4xl font-light select-none">×</span>
            <img src={exnessLogo} alt="Exness logo" className="h-10 md:h-16 object-contain" />
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white text-center mb-4">
            Logistics Services for Exness Cyprus
          </h1>
          <p className="text-white/80 text-lg md:text-xl text-center max-w-2xl mx-auto">
            From employee relocations to event logistics — one team, one point of contact.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="container-shoham py-16">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-12">
          What We Handle
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-card rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <s.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-3">{s.title}</h3>
              <ul className="space-y-1.5">
                {s.points.map((p) => (
                  <li key={p} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Facts */}
      <section className="bg-secondary border-y">
        <div className="container-shoham py-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col items-center gap-2">
                <f.icon className="h-8 w-8 text-primary mb-1" />
                <span className="font-heading font-bold text-lg">{f.label}</span>
                <span className="text-sm text-muted-foreground">{f.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-shoham py-16 text-center">
        <h2 className="font-heading text-2xl font-bold mb-4">
          Let's talk about what you need
        </h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          We'll set up a dedicated contact for your team and handle everything from there.
        </p>
        <Button asChild size="lg" className="font-semibold uppercase tracking-wide">
          <Link to="/contact-us">Get in Touch</Link>
        </Button>
      </section>
    </Layout>
  );
};

export default ExnessPartnership;
