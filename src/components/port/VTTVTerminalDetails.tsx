import { 
  Anchor, 
  Ship, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Clock, 
  Shield, 
  AlertTriangle,
  FileText,
  CheckCircle2,
  Droplets,
  Gauge,
  Radio,
  Navigation,
  Container,
  Fuel
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { vttvTerminalData, getMaxDWT, getMaxDraft, getBerthCount, getMaxLOA } from "@/data/vttvTerminalData";

const VTTVTerminalDetails = () => {
  const data = vttvTerminalData;

  return (
    <div className="space-y-8">
      {/* Terminal Operator Header */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Fuel className="h-6 w-6 text-primary" />
                {data.operator.name}
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Petroleum Tank Terminal & Jetty Facility
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-primary/10">
                Port Code: {data.operator.portCode}
              </Badge>
              <Badge variant="default" className="bg-green-600">
                <Shield className="h-3 w-3 mr-1" />
                ISPS Compliant
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{data.operator.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>{data.operator.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <a href={`mailto:${data.operator.email}`} className="text-primary hover:underline">
                {data.operator.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <a href={`https://${data.operator.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {data.operator.website}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Anchor className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-3xl font-bold text-primary">{getBerthCount()}</p>
            <p className="text-sm text-muted-foreground">Berths</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Gauge className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-3xl font-bold text-primary">{getMaxDraft()}m</p>
            <p className="text-sm text-muted-foreground">Max Draft</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Ship className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-3xl font-bold text-primary">{(getMaxDWT() / 1000).toFixed(0)}k</p>
            <p className="text-sm text-muted-foreground">Max DWT (tons)</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Clock className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-3xl font-bold text-primary">24/7</p>
            <p className="text-sm text-muted-foreground">Operations</p>
          </CardContent>
        </Card>
      </div>

      {/* Jetty Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Jetty Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">{data.operations.jettyFormation}</p>
                  <p className="text-sm text-muted-foreground">with {data.operations.berthCount} berthing positions</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">{data.operations.bottomType}</p>
                  <p className="text-sm text-muted-foreground">at all berths</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">No air draft restrictions</p>
                  <p className="text-sm text-muted-foreground">No daylight restrictions</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Operational Hours</p>
                  <p className="text-sm text-muted-foreground">{data.operations.hours}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Radio className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">VHF Channels</p>
                  <p className="text-sm text-muted-foreground">{data.vhfChannels.join(" and ")}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Handled */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary" />
            Products Handled
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                <Container className="h-4 w-4" />
                Via Shore Tanks
              </h4>
              <ul className="space-y-1">
                {data.products.shoreTanks.map((product, idx) => (
                  <li key={idx} className="text-sm text-blue-700 dark:text-blue-400">• {product}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
                <Ship className="h-4 w-4" />
                Via Ship-to-Ship Transfers
              </h4>
              <ul className="space-y-1">
                {data.products.stsTransfers.map((product, idx) => (
                  <li key={idx} className="text-sm text-amber-700 dark:text-amber-400">• {product}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Berth Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Anchor className="h-5 w-5 text-primary" />
            Berth Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Berth</TableHead>
                  <TableHead>DWT Range (tons)</TableHead>
                  <TableHead>Max Draft</TableHead>
                  <TableHead>LOA Range</TableHead>
                  <TableHead>Berthing Side</TableHead>
                  <TableHead>Loading Arms</TableHead>
                  <TableHead>Coordinates</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.berths.map((berth) => (
                  <TableRow key={berth.id}>
                    <TableCell className="font-medium">{berth.name}</TableCell>
                    <TableCell>{berth.deadweightMin.toLocaleString()} - {berth.deadweightMax.toLocaleString()}</TableCell>
                    <TableCell>{berth.maxDraft}m</TableCell>
                    <TableCell>{berth.loaMin}m - {berth.loaMax}m</TableCell>
                    <TableCell>
                      <Badge variant={berth.berthingSide === "Starboard" ? "default" : "secondary"}>
                        {berth.berthingSide}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{berth.loadingArms}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {berth.coordinates.lat}<br />{berth.coordinates.lon}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Berth Cards for Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 md:hidden">
            {data.berths.map((berth) => (
              <Card key={berth.id} className="border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {berth.name}
                    <Badge variant={berth.berthingSide === "Starboard" ? "default" : "secondary"}>
                      {berth.berthingSide}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">DWT:</span>
                    <span>{berth.deadweightMin.toLocaleString()} - {berth.deadweightMax.toLocaleString()} tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Draft:</span>
                    <span>{berth.maxDraft}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">LOA:</span>
                    <span>{berth.loaMin}m - {berth.loaMax}m</span>
                  </div>
                  <div className="pt-2 border-t">
                    <span className="text-muted-foreground">Loading Arms:</span>
                    <p>{berth.loadingArms}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-primary" />
            Technical Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Channel Allowable Draft</p>
              <p className="text-xl font-bold text-primary">{data.technicalSpecs.channelDraft}m</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Water Density</p>
              <p className="text-xl font-bold text-primary">{data.technicalSpecs.waterDensity} kg/m³</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Max LOA</p>
              <p className="text-xl font-bold text-primary">{getMaxLOA()}m</p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-3">
            <div>
              <p className="font-medium">Loading Arm Flange Specification</p>
              <p className="text-sm text-muted-foreground">{data.technicalSpecs.loadingArmFlange}</p>
            </div>
            <div>
              <p className="font-medium">Pigging Facilities</p>
              <p className="text-sm text-muted-foreground">
                {data.technicalSpecs.piggingFacilities} - Berths {data.technicalSpecs.berthsWithPigging.join(" & ")}
              </p>
            </div>
            <div>
              <p className="font-medium">Line Emptying (Berths 1 & 2)</p>
              <p className="text-sm text-muted-foreground">{data.technicalSpecs.emptyingMethod}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <Phone className="h-5 w-5" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Primary Phone</TableHead>
                  <TableHead>Alternative</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.emergencyContacts.map((contact, idx) => (
                  <TableRow key={idx} className={contact.service === "EMERGENCY" ? "bg-red-50 dark:bg-red-950/20" : ""}>
                    <TableCell className={`font-medium ${contact.service === "EMERGENCY" ? "text-red-600 dark:text-red-400" : ""}`}>
                      {contact.service}
                    </TableCell>
                    <TableCell>
                      <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">
                        {contact.phone}
                      </a>
                    </TableCell>
                    <TableCell>
                      {contact.alternative ? (
                        <a href={`tel:${contact.alternative.replace(/\s/g, '')}`} className="text-primary hover:underline">
                          {contact.alternative}
                        </a>
                      ) : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pre-Arrival & Documents */}
      <Tabs defaultValue="pre-arrival" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pre-arrival">Pre-Arrival</TabsTrigger>
          <TabsTrigger value="loading">Loading Docs</TabsTrigger>
          <TabsTrigger value="discharge">Discharge Docs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pre-arrival">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Pre-Arrival Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {data.preArrivalRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{req}</span>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  SOLAS Inert Gas Requirements
                </h4>
                <div className="space-y-2">
                  {data.solasRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="loading">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Documents Required for Loading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.loadingDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 bg-muted/30 rounded">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-sm">{doc.document}</span>
                      {doc.description && (
                        <p className="text-xs text-muted-foreground">{doc.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="discharge">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Documents Required for Discharge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.dischargeDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 bg-muted/30 rounded">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-sm">{doc.document}</span>
                      {doc.description && (
                        <p className="text-xs text-muted-foreground">{doc.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Restrictions */}
      <Card className="border-amber-200 dark:border-amber-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-5 w-5" />
            Restrictions & Important Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.restrictions.map((restriction, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{restriction}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Need Terminal Agency Services?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Shoham Shipping provides comprehensive port agency services at VTTV Vassiliko Terminal. 
              Contact us for petroleum cargo handling, vessel coordination, and documentation support.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Button asChild size="lg">
                <Link to="/quote">Request Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VTTVTerminalDetails;
