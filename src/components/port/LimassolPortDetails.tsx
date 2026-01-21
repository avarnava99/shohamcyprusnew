import { Link } from "react-router-dom";
import { Building2, Phone, Mail, Ship, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { limassolPortData, getTotalQuayLength, getEquipmentCount } from "@/data/limassolPortData";
import QuayInfoCard from "./QuayInfoCard";
import EquipmentTable from "./EquipmentTable";
import MarineServicesSection from "./MarineServicesSection";
import PortSpecsGrid from "./PortSpecsGrid";
import YardCapacitySection from "./YardCapacitySection";
import VesselTypesSection from "./VesselTypesSection";

const LimassolPortDetails = () => {
  const totalQuayLength = getTotalQuayLength();
  const equipmentCount = getEquipmentCount();

  return (
    <div className="space-y-12">
      {/* Terminal Operator Header */}
      <section>
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold">{limassolPortData.operator}</h2>
            <p className="text-muted-foreground">{limassolPortData.concessionInfo}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">IMO: {limassolPortData.imoNumber}</Badge>
              <Badge variant="outline">UN Code: {limassolPortData.unLocationCode}</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 text-center rounded-lg bg-primary text-primary-foreground">
          <div className="text-3xl font-heading font-bold">{totalQuayLength}m</div>
          <div className="text-sm opacity-90">Total Quay Length</div>
        </div>
        <div className="p-4 text-center rounded-lg bg-accent text-accent-foreground">
          <div className="text-3xl font-heading font-bold">4</div>
          <div className="text-sm opacity-90">Multi-Purpose Quays</div>
        </div>
        <div className="p-4 text-center rounded-lg bg-primary text-primary-foreground">
          <div className="text-3xl font-heading font-bold">{equipmentCount}+</div>
          <div className="text-sm opacity-90">Equipment Units</div>
        </div>
        <div className="p-4 text-center rounded-lg bg-accent text-accent-foreground">
          <div className="text-3xl font-heading font-bold">16m</div>
          <div className="text-sm opacity-90">Max Draft (SW Quay)</div>
        </div>
      </section>

      <Separator />

      {/* Port Specifications */}
      <section>
        <h3 className="section-title">Port Specifications</h3>
        <PortSpecsGrid portData={limassolPortData} />
      </section>

      <Separator />

      {/* Quay Information */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="section-title mb-0">Quay Information</h3>
          <Badge variant="secondary" className="text-sm">
            Total: {totalQuayLength}m
          </Badge>
        </div>
        <div className="grid gap-4">
          {limassolPortData.quays.map((quay, idx) => (
            <QuayInfoCard key={idx} quay={quay} />
          ))}
        </div>
      </section>

      <Separator />

      {/* Terminal Equipment */}
      <section>
        <h3 className="section-title">Terminal Equipment</h3>
        <EquipmentTable equipment={limassolPortData.equipment} />
      </section>

      <Separator />

      {/* Marine Services */}
      <section>
        <h3 className="section-title">Marine Services</h3>
        <MarineServicesSection services={limassolPortData.marineServices} />
      </section>

      <Separator />

      {/* Yard & Storage */}
      <section>
        <h3 className="section-title">Yard & Storage Capacity</h3>
        <YardCapacitySection portData={limassolPortData} />
      </section>

      <Separator />

      {/* Vessel Types */}
      <section>
        <h3 className="section-title">Vessel Types Served</h3>
        <VesselTypesSection vesselTypes={limassolPortData.vesselTypesServed} />
      </section>

      <Separator />

      {/* Max Vessel Size */}
      <section>
        <h3 className="section-title">Maximum Vessel Size Handled</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Limassol Port can accommodate the world's largest cruise vessels
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {limassolPortData.maxVesselSize.map((vessel, idx) => (
            <div key={idx} className="p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Ship className="w-5 h-5 text-primary" />
                <span className="font-semibold">{vessel.name}</span>
              </div>
              <div className="text-sm text-muted-foreground mb-1">{vessel.type}</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">LOA:</span>
                  <span className="ml-1 font-mono font-semibold">{vessel.loa}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Beam:</span>
                  <span className="ml-1 font-mono font-semibold">{vessel.beam}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Contact Information */}
      <section className="p-6 rounded-lg bg-muted/50">
        <h3 className="font-heading font-semibold text-lg mb-4">Terminal Contacts</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Emergency</div>
              <div className="font-semibold">{limassolPortData.contacts.emergency}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Commercial</div>
              <div className="font-semibold text-sm">{limassolPortData.contacts.commercial}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Operations</div>
              <div className="font-semibold text-sm">{limassolPortData.contacts.operations}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">HSSE</div>
              <div className="font-semibold text-sm">{limassolPortData.contacts.hsse}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="text-center">
          <h3 className="font-heading text-xl font-bold mb-2">Need Port Agency Services?</h3>
          <p className="opacity-90 mb-4">
            Shoham Shipping provides comprehensive port agency services at Limassol Port
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="secondary">
              <Link to="/quote">Request Quote</Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent border-white hover:bg-white/20">
              <Link to="/contact-us">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LimassolPortDetails;
