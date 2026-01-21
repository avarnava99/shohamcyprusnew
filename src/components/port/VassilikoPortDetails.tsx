import { Link } from "react-router-dom";
import { 
  Building2, Phone, Mail, Ship, Anchor, Clock, Shield, 
  AlertTriangle, FileText, MapPin, Truck, Waves, Radio,
  Fuel, Package, HardHat, Calendar, Navigation, Info,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { vassilikoPortData } from "@/data/vassilikoPortData";

const VassilikoPortDetails = () => {
  return (
    <div className="space-y-12">
      {/* Terminal Operator Header */}
      <section>
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold">{vassilikoPortData.operator}</h2>
            <p className="text-muted-foreground">{vassilikoPortData.location.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">Port Code: {vassilikoPortData.portCode}</Badge>
              <Badge variant="outline">{vassilikoPortData.timeZone}</Badge>
              <Badge variant="secondary">Security Level {vassilikoPortData.security.level}</Badge>
            </div>
          </div>
        </div>
        
        {/* Location & Traffic */}
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-semibold">Coordinates</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Lat: {vassilikoPortData.location.latitude}<br />
              Long: {vassilikoPortData.location.longitude}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <Ship className="w-5 h-5 text-primary" />
              <span className="font-semibold">Annual Traffic</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {vassilikoPortData.annualTraffic.vessels}<br />
              {vassilikoPortData.annualTraffic.cargo}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 text-center rounded-lg bg-primary text-primary-foreground">
          <div className="text-3xl font-heading font-bold">{vassilikoPortData.totalQuayLength}</div>
          <div className="text-sm opacity-90">Total Quay Length</div>
        </div>
        <div className="p-4 text-center rounded-lg bg-accent text-accent-foreground">
          <div className="text-3xl font-heading font-bold">{vassilikoPortData.pilotage.tugsAvailable}</div>
          <div className="text-sm opacity-90">Tugboats Available</div>
        </div>
        <div className="p-4 text-center rounded-lg bg-primary text-primary-foreground">
          <div className="text-3xl font-heading font-bold">45,000m²</div>
          <div className="text-sm opacity-90">Storage Area</div>
        </div>
        <div className="p-4 text-center rounded-lg bg-accent text-accent-foreground">
          <div className="text-3xl font-heading font-bold">{vassilikoPortData.vesselRestrictions.maxDraft}</div>
          <div className="text-sm opacity-90">Max Safe Draft</div>
        </div>
      </section>

      <Separator />

      {/* Berth Information */}
      <section>
        <h3 className="section-title">Berth Information</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vassilikoPortData.quays.filter(q => q.name !== "North Quay 2" && q.name !== "North Quay 3").map((quay, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Anchor className="w-5 h-5 text-primary" />
                  {quay.name === "North Quay 1" ? "North Quay (1, 2, 3)" : quay.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Length:</span>
                    <span className="font-mono font-semibold">
                      {quay.name === "North Quay 1" ? "360m" : quay.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Draft:</span>
                    <span className="font-mono font-semibold">{quay.depth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max LOA:</span>
                    <span className="font-mono font-semibold">{quay.maxLOA}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <span className="text-muted-foreground text-xs">Cargo Types:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(quay.name === "North Quay 1" ? ["Cement", "Dry Bulk"] : quay.cargoTypes).map((cargo, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {cargo}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Additional notes */}
        <div className="mt-4 p-4 rounded-lg bg-muted/50">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-primary mt-0.5" />
            <div className="text-sm">
              <strong>Ro-Ro Capability:</strong> {vassilikoPortData.cargoTypes.roRo}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Vessel Restrictions */}
      <section>
        <h3 className="section-title">Vessel Restrictions</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border bg-card text-center">
            <div className="text-2xl font-heading font-bold text-primary">{vassilikoPortData.vesselRestrictions.maxDraft}</div>
            <div className="text-sm text-muted-foreground">Max Safe Draft</div>
          </div>
          <div className="p-4 rounded-lg border bg-card text-center">
            <div className="text-2xl font-heading font-bold text-primary">{vassilikoPortData.vesselRestrictions.maxBeam}</div>
            <div className="text-sm text-muted-foreground">Max Beam</div>
          </div>
          <div className="p-4 rounded-lg border bg-card text-center">
            <div className="text-2xl font-heading font-bold text-primary">{vassilikoPortData.vesselRestrictions.maxLOANorth}</div>
            <div className="text-sm text-muted-foreground">Max LOA (North Quay)</div>
          </div>
          <div className="p-4 rounded-lg border bg-card text-center">
            <div className="text-2xl font-heading font-bold text-primary">{vassilikoPortData.vesselRestrictions.maxLOAWest}</div>
            <div className="text-sm text-muted-foreground">Max LOA (West Quay)</div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          {vassilikoPortData.vesselRestrictions.note}
        </p>
      </section>

      <Separator />

      {/* Loading/Unloading Equipment */}
      <section>
        <h3 className="section-title">Loading / Unloading Equipment</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vassilikoPortData.equipment.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.type}</Badge>
                  </TableCell>
                  <TableCell className="font-mono">{item.capacity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <Separator />

      {/* Cargo Types */}
      <section>
        <h3 className="section-title">Cargo Types Handled</h3>
        <Tabs defaultValue="drybulk" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="drybulk" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Dry Bulk
            </TabsTrigger>
            <TabsTrigger value="liquid" className="flex items-center gap-2">
              <Fuel className="w-4 h-4" />
              Liquid
            </TabsTrigger>
            <TabsTrigger value="roro" className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Ro-Ro
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="drybulk" className="p-4 rounded-lg bg-muted/50">
            <div className="flex flex-wrap gap-2">
              {vassilikoPortData.cargoTypes.dryBulk.map((cargo, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm py-1 px-3">
                  {cargo}
                </Badge>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="liquid" className="p-4 rounded-lg bg-muted/50">
            <div className="flex flex-wrap gap-2">
              {vassilikoPortData.cargoTypes.liquid.map((cargo, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm py-1 px-3">
                  {cargo}
                </Badge>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="roro" className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">
              <strong>Ro-Ro Ramp:</strong> {vassilikoPortData.cargoTypes.roRo}
            </p>
          </TabsContent>
        </Tabs>
      </section>

      <Separator />

      {/* Tugboat Fleet */}
      <section>
        <h3 className="section-title">Tugboat Fleet</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tug Name</TableHead>
                <TableHead>BPT</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vassilikoPortData.tugboats.map((tug, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{tug.name}</TableCell>
                  <TableCell className="font-mono font-bold">{tug.bpt}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{tug.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          <strong>Note:</strong> {vassilikoPortData.pilotage.tugsRequired}
        </p>
      </section>

      <Separator />

      {/* Marine Services & Navigation */}
      <section>
        <h3 className="section-title">Marine Services & Navigation</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Navigation className="w-5 h-5 text-primary" />
                Pilotage
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="destructive">Compulsory</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">VHF Channels:</span>
                <span className="font-mono">{vassilikoPortData.pilotage.vhfChannels.join(", ")}</span>
              </div>
              <div className="pt-2 border-t text-xs text-muted-foreground">
                Boarding: {vassilikoPortData.pilotage.boardingPosition.latitude}, {vassilikoPortData.pilotage.boardingPosition.longitude}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Anchor className="w-5 h-5 text-primary" />
                Anchorage
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span>{vassilikoPortData.anchorage.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Depth:</span>
                <span className="font-mono">{vassilikoPortData.anchorage.depth}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Waves className="w-5 h-5 text-primary" />
                Navigation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Port Depth:</span>
                <span className="font-mono">{vassilikoPortData.navigation.portDepth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tidal Range:</span>
                <span className="font-mono">{vassilikoPortData.navigation.tidalRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Water Density:</span>
                <span className="font-mono">{vassilikoPortData.navigation.waterDensity}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Operating Hours */}
      <section>
        <h3 className="section-title">Operating Hours</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Working Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div>
                <span className="text-muted-foreground">Port Office:</span>
                <p className="font-medium">{vassilikoPortData.operatingHours.officeHours}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Port Working:</span>
                <p className="font-medium">{vassilikoPortData.operatingHours.portWorking}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Closed Days
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="flex flex-wrap gap-2">
                {vassilikoPortData.operatingHours.closedDays.map((day, idx) => (
                  <Badge key={idx} variant="destructive">{day}</Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Other holidays operate on overtime basis
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Facilities & Services */}
      <section>
        <h3 className="section-title">Facilities & Services</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg border bg-card flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm">ISPS Compliant</span>
          </div>
          <div className="p-3 rounded-lg border bg-card flex items-center gap-2">
            <Waves className="w-5 h-5 text-blue-600" />
            <span className="text-sm">Ballast/Slop Reception</span>
          </div>
          <div className="p-3 rounded-lg border bg-card flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-600" />
            <span className="text-sm">45,000m² Storage</span>
          </div>
          <div className="p-3 rounded-lg border bg-card flex items-center gap-2">
            <Fuel className="w-5 h-5 text-purple-600" />
            <span className="text-sm">Bunkering Available</span>
          </div>
          <div className="p-3 rounded-lg border bg-card flex items-center gap-2">
            <Waves className="w-5 h-5 text-cyan-600" />
            <span className="text-sm">Fresh Water</span>
          </div>
          <div className="p-3 rounded-lg border bg-card flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <span className="text-sm">MARPOL Standards</span>
          </div>
          <div className="p-3 rounded-lg border bg-card flex items-center gap-2">
            <Package className="w-5 h-5 text-green-600" />
            <span className="text-sm">Fumigation</span>
          </div>
          <div className="p-3 rounded-lg border bg-card flex items-center gap-2">
            <Package className="w-5 h-5 text-gray-600" />
            <span className="text-sm">Garbage Facilities</span>
          </div>
        </div>
        
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-semibold">Nearest Hospital</span>
            </div>
            <p className="text-sm text-muted-foreground">{vassilikoPortData.nearbyFacilities.hospital}</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-semibold">Nearest Airport</span>
            </div>
            <p className="text-sm text-muted-foreground">{vassilikoPortData.nearbyFacilities.airport}</p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Pre-Arrival Requirements */}
      <section>
        <h3 className="section-title">Pre-Arrival Requirements</h3>
        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                ETA Notices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {vassilikoPortData.preArrival.etaNotices.map((notice, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {notice}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Required Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm max-h-48 overflow-y-auto">
                {vassilikoPortData.preArrival.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1.5" />
                    <span className="text-muted-foreground">{doc}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Required Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm max-h-48 overflow-y-auto">
                {vassilikoPortData.preArrival.requiredCertificates.map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1.5" />
                    <span className="text-muted-foreground">{cert}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Safety Requirements */}
      <section>
        <h3 className="section-title">Safety Requirements</h3>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <HardHat className="w-5 h-5 text-primary" />
              Personal Safety Equipment (Minimum)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {vassilikoPortData.safetyEquipment.map((item, idx) => (
                <Badge key={idx} variant="outline" className="text-sm py-1 px-3">
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
            <div>
              <p className="font-semibold text-destructive">Non-Smoking Area</p>
              <p className="text-sm text-muted-foreground mt-1">
                {vassilikoPortData.regulations.smoking}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ISPS Security */}
      <section>
        <h3 className="section-title">ISPS Security</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                PFSO (Port Facility Security Officer)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p className="font-medium">{vassilikoPortData.security.pfso.name}</p>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{vassilikoPortData.security.pfso.tel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{vassilikoPortData.security.pfso.mobile} (Mobile)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs">{vassilikoPortData.security.pfso.email}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                APFSO (Alternate PFSO)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p className="font-medium">{vassilikoPortData.security.apfso.name}</p>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{vassilikoPortData.security.apfso.tel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{vassilikoPortData.security.apfso.mobile} (Mobile)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs">{vassilikoPortData.security.apfso.email}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Emergency Contacts */}
      <section className="p-6 rounded-lg bg-muted/50">
        <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          Emergency Contacts
        </h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {vassilikoPortData.contacts.map((contact, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-background border">
              <div className="font-semibold text-sm">{contact.role}</div>
              <div className="text-sm text-muted-foreground">{contact.name}</div>
              <div className="mt-2 space-y-1 text-xs">
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {contact.tel}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {contact.mobile} (24/7)
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-background border">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm">VHF (24/7)</span>
            </div>
            <div className="text-sm mt-1">Ch. {vassilikoPortData.vhfContact.channels}</div>
            <div className="text-xs text-muted-foreground">{vassilikoPortData.vhfContact.mobile24h}</div>
          </div>
          <div className="p-3 rounded-lg bg-background border">
            <div className="font-semibold text-sm">Fire Department</div>
            <div className="text-sm">{vassilikoPortData.emergencyContacts.fireDepartment}</div>
          </div>
          <div className="p-3 rounded-lg bg-background border">
            <div className="font-semibold text-sm">Medical Service</div>
            <div className="text-sm">{vassilikoPortData.emergencyContacts.medicalService}</div>
          </div>
          <div className="p-3 rounded-lg bg-background border">
            <div className="font-semibold text-sm">Police / Immigration</div>
            <div className="text-sm">{vassilikoPortData.emergencyContacts.policeImmigration}</div>
          </div>
          <div className="p-3 rounded-lg bg-background border">
            <div className="font-semibold text-sm">Customs Officer</div>
            <div className="text-sm">{vassilikoPortData.emergencyContacts.customsOfficer}</div>
          </div>
          <div className="p-3 rounded-lg bg-destructive text-destructive-foreground">
            <div className="font-semibold text-sm">Emergency Number</div>
            <div className="text-2xl font-bold">{vassilikoPortData.emergencyContacts.emergencyNumber}</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="text-center">
          <h3 className="font-heading text-xl font-bold mb-2">Need Port Agency Services at Vassiliko?</h3>
          <p className="opacity-90 mb-4">
            Shoham Shipping provides comprehensive port agency services at Vassiliko Port Facility
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

export default VassilikoPortDetails;
