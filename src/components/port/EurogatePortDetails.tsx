import { Link } from "react-router-dom";
import { Building2, Phone, Mail, Ship, Container, Anchor, Clock, Globe, FileText, Truck, Snowflake, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { eurogatePortData, getTotalEquipmentCount } from "@/data/eurogatePortData";

const EurogatePortDetails = () => {
  const equipmentCount = getTotalEquipmentCount();

  return (
    <div className="space-y-12">
      {/* Terminal Operator Header */}
      <section>
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Container className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold">{eurogatePortData.operator}</h2>
            <p className="text-muted-foreground">{eurogatePortData.concessionInfo}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">UN Code: {eurogatePortData.unLocationCode}</Badge>
              <Badge variant="outline">Since: {eurogatePortData.operationsStart}</Badge>
            </div>
          </div>
        </div>
        
        {/* Shareholders */}
        <div className="mt-4 p-4 rounded-lg bg-muted/50">
          <h4 className="font-semibold text-sm mb-3">Shareholders</h4>
          <div className="grid sm:grid-cols-3 gap-4">
            {eurogatePortData.shareholders.map((shareholder, idx) => (
              <div key={idx} className="text-center p-3 rounded-lg bg-background">
                <div className="text-2xl font-heading font-bold text-primary">{shareholder.percentage}%</div>
                <div className="text-xs text-muted-foreground">{shareholder.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 text-center rounded-lg bg-primary text-primary-foreground">
          <div className="text-3xl font-heading font-bold">{eurogatePortData.totalQuayLength}</div>
          <div className="text-sm opacity-90">Total Quay Length</div>
        </div>
        <div className="p-4 text-center rounded-lg bg-accent text-accent-foreground">
          <div className="text-3xl font-heading font-bold">{eurogatePortData.totalSTSCranes}</div>
          <div className="text-sm opacity-90">STS Gantry Cranes</div>
        </div>
        <div className="p-4 text-center rounded-lg bg-primary text-primary-foreground">
          <div className="text-3xl font-heading font-bold">{eurogatePortData.terminalArea.yardCapacityTEU.toLocaleString()}</div>
          <div className="text-sm opacity-90">TEU Yard Capacity</div>
        </div>
        <div className="p-4 text-center rounded-lg bg-accent text-accent-foreground">
          <div className="text-3xl font-heading font-bold">{eurogatePortData.maxDraft}</div>
          <div className="text-sm opacity-90">Maximum Draft</div>
        </div>
      </section>

      <Separator />

      {/* Terminal Specifications */}
      <section>
        <h3 className="section-title">Terminal Specifications</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="text-sm text-muted-foreground">Total Area</div>
              <div className="text-xl font-semibold">{eurogatePortData.terminalArea.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-sm text-muted-foreground">Stacking Yard</div>
              <div className="text-xl font-semibold">{eurogatePortData.terminalArea.stackingYard}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-sm text-muted-foreground">Annual Capacity</div>
              <div className="text-xl font-semibold">{eurogatePortData.annualCapacity}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-sm text-muted-foreground">Reefer Plugs</div>
              <div className="text-xl font-semibold">{eurogatePortData.terminalArea.reeferPlugs}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Certifications */}
        <div className="mt-4 flex flex-wrap gap-2">
          {eurogatePortData.certifications.map((cert, idx) => (
            <Badge key={idx} variant="secondary">{cert}</Badge>
          ))}
        </div>
      </section>

      <Separator />

      {/* Quay Information */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="section-title mb-0">Quay Information</h3>
          <Badge variant="secondary" className="text-sm">
            Total: {eurogatePortData.totalQuayLength}
          </Badge>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {eurogatePortData.quays.map((quay, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Anchor className="w-5 h-5 text-primary" />
                  {quay.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Length:</span>
                    <span className="font-semibold">{quay.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Depth:</span>
                    <span className="font-semibold">{quay.depth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">STS Cranes:</span>
                    <span className="font-semibold">{quay.gantryCranes}</span>
                  </div>
                  {quay.notes && (
                    <div className="pt-2 border-t">
                      <span className="text-xs text-muted-foreground">{quay.notes}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* STS Gantry Cranes */}
      <section>
        <h3 className="section-title">STS Gantry Cranes</h3>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead>Outreach</TableHead>
                <TableHead>Height Under Spreader</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eurogatePortData.stsCranes.map((crane, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{crane.type}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{crane.qty}</Badge>
                  </TableCell>
                  <TableCell>{crane.outreach}</TableCell>
                  <TableCell>{crane.heightUnderSpreader}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <p className="text-sm text-muted-foreground mt-2">
          Total of {eurogatePortData.totalSTSCranes} Ship-to-Shore gantry cranes capable of handling the largest container vessels
        </p>
      </section>

      <Separator />

      {/* Yard Equipment */}
      <section>
        <h3 className="section-title">Yard Equipment</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {eurogatePortData.yardEquipment.map((equipment, idx) => (
            <Card key={idx}>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{equipment.type}</span>
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity:</span>
                    <Badge>{equipment.qty}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manufacturer:</span>
                    <span>{equipment.manufacturer}</span>
                  </div>
                  {equipment.capacity && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span>{equipment.capacity}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Total of {equipmentCount}+ equipment units for efficient terminal operations
        </p>
      </section>

      <Separator />

      {/* Services */}
      <section>
        <h3 className="section-title">Terminal Services</h3>
        <Tabs defaultValue={eurogatePortData.services[0].category.toLowerCase().replace(/\s+/g, '-')}>
          <TabsList className="flex flex-wrap h-auto gap-1">
            {eurogatePortData.services.map((service) => (
              <TabsTrigger 
                key={service.category} 
                value={service.category.toLowerCase().replace(/\s+/g, '-')}
                className="text-sm"
              >
                {service.category}
              </TabsTrigger>
            ))}
          </TabsList>
          {eurogatePortData.services.map((service) => (
            <TabsContent 
              key={service.category} 
              value={service.category.toLowerCase().replace(/\s+/g, '-')}
              className="mt-4"
            >
              <Card>
                <CardContent className="pt-4">
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <Separator />

      {/* IMDG Handling */}
      <section>
        <h3 className="section-title">IMDG Dangerous Goods Handling</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Accepted Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {eurogatePortData.imdgHandling.accepted.map((item, idx) => (
                  <li key={idx} className="text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Excluded Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {eurogatePortData.imdgHandling.excluded.map((item, idx) => (
                  <li key={idx} className="text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Storage & Reefer */}
      <section>
        <h3 className="section-title">Storage & Reefer Services</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-4 text-center">
              <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-heading font-bold">{eurogatePortData.storageInfo.customsBonded}</div>
              <div className="text-sm text-muted-foreground">Customs Bonded Storage</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <Container className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-heading font-bold">{eurogatePortData.storageInfo.freeDays} Days</div>
              <div className="text-sm text-muted-foreground">Free Import Storage</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <Snowflake className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-heading font-bold">{eurogatePortData.terminalArea.reeferPlugs}</div>
              <div className="text-sm text-muted-foreground">Reefer Plugs Available</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Operating Hours */}
      <section>
        <h3 className="section-title">Operating Hours</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5 text-primary" />
                Quayside Operations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold text-primary">{eurogatePortData.operatingHours.quayside}</div>
              <p className="text-sm text-muted-foreground mt-1">Vessel operations run continuously</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Truck className="w-5 h-5 text-primary" />
                Gate Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <div>{eurogatePortData.operatingHours.gate.weekdays}</div>
                <div>{eurogatePortData.operatingHours.gate.saturday}</div>
                <div>{eurogatePortData.operatingHours.gate.sunday}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Digital Interfaces */}
      <section>
        <h3 className="section-title">Digital Interfaces (INFOGATE)</h3>
        <Card>
          <CardContent className="pt-4">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Web Portal</div>
                  <div className="font-semibold">{eurogatePortData.webPortal}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Integration</div>
                  <div className="font-semibold text-sm">{eurogatePortData.portCommunitySystem}</div>
                </div>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Function</TableHead>
                  <TableHead>EDI Format</TableHead>
                  <TableHead>Direction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eurogatePortData.ediInterfaces.map((edi, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{edi.function}</TableCell>
                    <TableCell><code className="text-xs bg-muted px-2 py-1 rounded">{edi.format}</code></TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{edi.direction}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Contact Information */}
      <section className="p-6 rounded-lg bg-muted/50">
        <h3 className="font-heading font-semibold text-lg mb-4">Terminal Contacts</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">General</div>
              <div className="font-semibold">{eurogatePortData.phone}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">General Inquiries</div>
              <div className="font-semibold text-sm">{eurogatePortData.contacts.general}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Operations</div>
              <div className="font-semibold text-sm">{eurogatePortData.contacts.operations}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Website</div>
              <a 
                href={`https://${eurogatePortData.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-sm text-primary hover:underline"
              >
                {eurogatePortData.website}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="text-center">
          <h3 className="font-heading text-xl font-bold mb-2">Need Container Terminal Services?</h3>
          <p className="opacity-90 mb-4">
            Shoham Shipping provides comprehensive agency services at Eurogate Container Terminal Limassol
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

export default EurogatePortDetails;
