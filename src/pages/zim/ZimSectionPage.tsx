import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ExternalLink, Package, Calendar, MapPin, Globe, Thermometer, ChevronDown, ChevronUp, Box, Layers, Ship } from "lucide-react";
import { CONTACT } from "@/constants/contact";
import { useState } from "react";
import SEO from "@/components/SEO";
interface SectionData {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}
interface ContainerSpec {
  name: string;
  category: "dry" | "reefer" | "opentop" | "flatrack" | "special";
  externalDimensions: {
    length: string;
    width: string;
    height: string;
  };
  internalDimensions: {
    length: string;
    width: string;
    height: string;
  };
  doorOpening?: {
    width: string;
    height: string;
  };
  capacity: string;
  maxPayload: string;
  tareWeight: string;
  description: string;
  temperatureRange?: string;
  floorLoadStrength?: string;
}
const containerSpecs: ContainerSpec[] = [
// Dry Containers
{
  name: "20' Standard",
  category: "dry",
  externalDimensions: {
    length: "6,058 mm / 19'10½\"",
    width: "2,438 mm / 8'",
    height: "2,591 mm / 8'6\""
  },
  internalDimensions: {
    length: "5,898 mm / 19'4\"",
    width: "2,352 mm / 7'9\"",
    height: "2,393 mm / 7'10\""
  },
  doorOpening: {
    width: "2,340 mm / 7'8\"",
    height: "2,280 mm / 7'6\""
  },
  capacity: "33.2 CBM / 1,172 cu ft",
  maxPayload: "28,230 kg / 62,236 lbs",
  tareWeight: "2,250 kg / 4,960 lbs",
  floorLoadStrength: "4,880 kg/m²",
  description: "Standard general-purpose container. Ideal for dry goods, boxed cargo, palletized freight, and most general merchandise."
}, {
  name: "40' Standard",
  category: "dry",
  externalDimensions: {
    length: "12,192 mm / 40'",
    width: "2,438 mm / 8'",
    height: "2,591 mm / 8'6\""
  },
  internalDimensions: {
    length: "12,032 mm / 39'6\"",
    width: "2,352 mm / 7'9\"",
    height: "2,393 mm / 7'10\""
  },
  doorOpening: {
    width: "2,340 mm / 7'8\"",
    height: "2,280 mm / 7'6\""
  },
  capacity: "67.7 CBM / 2,390 cu ft",
  maxPayload: "28,700 kg / 63,273 lbs",
  tareWeight: "3,800 kg / 8,380 lbs",
  floorLoadStrength: "4,880 kg/m²",
  description: "Most popular container size for long-distance shipping. Double the length of a 20' with optimized cost per cubic meter."
}, {
  name: "40' High Cube",
  category: "dry",
  externalDimensions: {
    length: "12,192 mm / 40'",
    width: "2,438 mm / 8'",
    height: "2,896 mm / 9'6\""
  },
  internalDimensions: {
    length: "12,032 mm / 39'6\"",
    width: "2,352 mm / 7'9\"",
    height: "2,698 mm / 8'10\""
  },
  doorOpening: {
    width: "2,340 mm / 7'8\"",
    height: "2,585 mm / 8'6\""
  },
  capacity: "76.3 CBM / 2,694 cu ft",
  maxPayload: "28,580 kg / 63,009 lbs",
  tareWeight: "3,920 kg / 8,643 lbs",
  floorLoadStrength: "4,880 kg/m²",
  description: "Extra height for voluminous cargo. Perfect for furniture, tall machinery, and goods that require maximum vertical space."
}, {
  name: "45' High Cube",
  category: "dry",
  externalDimensions: {
    length: "13,716 mm / 45'",
    width: "2,438 mm / 8'",
    height: "2,896 mm / 9'6\""
  },
  internalDimensions: {
    length: "13,556 mm / 44'6\"",
    width: "2,352 mm / 7'9\"",
    height: "2,698 mm / 8'10\""
  },
  doorOpening: {
    width: "2,340 mm / 7'8\"",
    height: "2,585 mm / 8'6\""
  },
  capacity: "86.0 CBM / 3,037 cu ft",
  maxPayload: "27,700 kg / 61,068 lbs",
  tareWeight: "4,800 kg / 10,582 lbs",
  floorLoadStrength: "4,880 kg/m²",
  description: "Maximum volume container. Ideal for lightweight, high-volume cargo like retail goods and consumer products."
},
// Reefer Containers
{
  name: "20' Reefer",
  category: "reefer",
  externalDimensions: {
    length: "6,058 mm / 19'10½\"",
    width: "2,438 mm / 8'",
    height: "2,591 mm / 8'6\""
  },
  internalDimensions: {
    length: "5,444 mm / 17'10\"",
    width: "2,268 mm / 7'5\"",
    height: "2,272 mm / 7'5\""
  },
  doorOpening: {
    width: "2,260 mm / 7'5\"",
    height: "2,182 mm / 7'2\""
  },
  capacity: "28.1 CBM / 992 cu ft",
  maxPayload: "27,400 kg / 60,406 lbs",
  tareWeight: "3,080 kg / 6,790 lbs",
  temperatureRange: "-30°C to +30°C / -22°F to +86°F",
  description: "Temperature-controlled container for perishables. Equipped with integral refrigeration unit for frozen or chilled cargo."
}, {
  name: "40' Reefer",
  category: "reefer",
  externalDimensions: {
    length: "12,192 mm / 40'",
    width: "2,438 mm / 8'",
    height: "2,591 mm / 8'6\""
  },
  internalDimensions: {
    length: "11,561 mm / 37'11\"",
    width: "2,268 mm / 7'5\"",
    height: "2,198 mm / 7'3\""
  },
  doorOpening: {
    width: "2,260 mm / 7'5\"",
    height: "2,182 mm / 7'2\""
  },
  capacity: "57.8 CBM / 2,041 cu ft",
  maxPayload: "29,500 kg / 65,036 lbs",
  tareWeight: "4,800 kg / 10,582 lbs",
  temperatureRange: "-30°C to +30°C / -22°F to +86°F",
  description: "Large capacity reefer for bulk perishable shipments. Ideal for fruits, vegetables, meat, pharmaceuticals, and frozen goods."
}, {
  name: "40' High Cube Reefer",
  category: "reefer",
  externalDimensions: {
    length: "12,192 mm / 40'",
    width: "2,438 mm / 8'",
    height: "2,896 mm / 9'6\""
  },
  internalDimensions: {
    length: "11,561 mm / 37'11\"",
    width: "2,268 mm / 7'5\"",
    height: "2,509 mm / 8'3\""
  },
  doorOpening: {
    width: "2,260 mm / 7'5\"",
    height: "2,419 mm / 7'11\""
  },
  capacity: "65.8 CBM / 2,324 cu ft",
  maxPayload: "29,100 kg / 64,154 lbs",
  tareWeight: "4,900 kg / 10,803 lbs",
  temperatureRange: "-30°C to +30°C / -22°F to +86°F",
  description: "Extra height reefer for temperature-sensitive cargo requiring maximum volume. Popular for hanging garments and tall pallets."
},
// Open Top Containers
{
  name: "20' Open Top",
  category: "opentop",
  externalDimensions: {
    length: "6,058 mm / 19'10½\"",
    width: "2,438 mm / 8'",
    height: "2,591 mm / 8'6\""
  },
  internalDimensions: {
    length: "5,888 mm / 19'4\"",
    width: "2,340 mm / 7'8\"",
    height: "2,315 mm / 7'7\""
  },
  doorOpening: {
    width: "2,340 mm / 7'8\"",
    height: "2,280 mm / 7'6\""
  },
  capacity: "31.8 CBM / 1,123 cu ft",
  maxPayload: "28,100 kg / 61,950 lbs",
  tareWeight: "2,400 kg / 5,291 lbs",
  description: "Removable tarpaulin roof for top-loading with crane. Ideal for tall machinery, timber, pipes, and over-height cargo."
}, {
  name: "40' Open Top",
  category: "opentop",
  externalDimensions: {
    length: "12,192 mm / 40'",
    width: "2,438 mm / 8'",
    height: "2,591 mm / 8'6\""
  },
  internalDimensions: {
    length: "12,022 mm / 39'5\"",
    width: "2,340 mm / 7'8\"",
    height: "2,315 mm / 7'7\""
  },
  doorOpening: {
    width: "2,340 mm / 7'8\"",
    height: "2,280 mm / 7'6\""
  },
  capacity: "65.2 CBM / 2,302 cu ft",
  maxPayload: "28,600 kg / 63,052 lbs",
  tareWeight: "3,900 kg / 8,598 lbs",
  description: "Large open-top container for oversized cargo. Perfect for industrial machinery, construction materials, and project cargo."
},
// Flat Rack Containers
{
  name: "20' Flat Rack",
  category: "flatrack",
  externalDimensions: {
    length: "6,058 mm / 19'10½\"",
    width: "2,438 mm / 8'",
    height: "2,591 mm / 8'6\""
  },
  internalDimensions: {
    length: "5,620 mm / 18'5\"",
    width: "2,200 mm / 7'3\"",
    height: "2,233 mm / 7'4\""
  },
  capacity: "N/A (open structure)",
  maxPayload: "31,000 kg / 68,343 lbs",
  tareWeight: "2,740 kg / 6,040 lbs",
  floorLoadStrength: "6,000 kg/m²",
  description: "Collapsible end walls for over-width/over-height cargo. Ideal for heavy machinery, vehicles, boats, and construction equipment."
}, {
  name: "40' Flat Rack",
  category: "flatrack",
  externalDimensions: {
    length: "12,192 mm / 40'",
    width: "2,438 mm / 8'",
    height: "2,591 mm / 8'6\""
  },
  internalDimensions: {
    length: "12,064 mm / 39'7\"",
    width: "2,374 mm / 7'9\"",
    height: "2,014 mm / 6'7\""
  },
  capacity: "N/A (open structure)",
  maxPayload: "45,000 kg / 99,208 lbs",
  tareWeight: "5,300 kg / 11,684 lbs",
  floorLoadStrength: "7,500 kg/m²",
  description: "Large flat rack for heavy project cargo. Collapsible ends allow stacking when empty. Perfect for industrial equipment and oversized machinery."
}, {
  name: "40' High Cube Flat Rack",
  category: "flatrack",
  externalDimensions: {
    length: "12,192 mm / 40'",
    width: "2,438 mm / 8'",
    height: "2,896 mm / 9'6\""
  },
  internalDimensions: {
    length: "12,080 mm / 39'8\"",
    width: "2,410 mm / 7'11\"",
    height: "2,103 mm / 6'11\""
  },
  capacity: "N/A (open structure)",
  maxPayload: "47,200 kg / 104,058 lbs",
  tareWeight: "6,300 kg / 13,889 lbs",
  floorLoadStrength: "9,000 kg/m²",
  description: "Heavy-duty flat rack for extra-tall and heavy cargo. Reinforced floor for maximum load capacity. Ideal for transformers and industrial equipment."
},
// Special Equipment
{
  name: "20' Platform",
  category: "special",
  externalDimensions: {
    length: "6,058 mm / 19'10½\"",
    width: "2,438 mm / 8'",
    height: "224 mm / 9\""
  },
  internalDimensions: {
    length: "6,000 mm / 19'8\"",
    width: "2,400 mm / 7'10\"",
    height: "N/A"
  },
  capacity: "N/A (flat platform)",
  maxPayload: "28,000 kg / 61,730 lbs",
  tareWeight: "2,480 kg / 5,468 lbs",
  floorLoadStrength: "10,000 kg/m²",
  description: "Flat platform without walls or roof. For extra-heavy or oversized cargo that cannot fit in standard containers."
}, {
  name: "40' Platform",
  category: "special",
  externalDimensions: {
    length: "12,192 mm / 40'",
    width: "2,438 mm / 8'",
    height: "625 mm / 2'1\""
  },
  internalDimensions: {
    length: "12,120 mm / 39'9\"",
    width: "2,380 mm / 7'10\"",
    height: "N/A"
  },
  capacity: "N/A (flat platform)",
  maxPayload: "41,000 kg / 90,390 lbs",
  tareWeight: "5,700 kg / 12,566 lbs",
  floorLoadStrength: "10,000 kg/m²",
  description: "Large platform for project cargo and breakbulk. Suitable for pipes, cables, vehicles, and extremely heavy industrial equipment."
}, {
  name: "20' Tank Container",
  category: "special",
  externalDimensions: {
    length: "6,058 mm / 19'10½\"",
    width: "2,438 mm / 8'",
    height: "2,591 mm / 8'6\""
  },
  internalDimensions: {
    length: "N/A (cylindrical tank)",
    width: "N/A",
    height: "N/A"
  },
  capacity: "24,000 liters / 6,340 gallons",
  maxPayload: "26,000 kg / 57,320 lbs",
  tareWeight: "3,500 kg / 7,716 lbs",
  description: "ISO tank for liquid and gas cargo. Suitable for chemicals, food-grade liquids, pharmaceuticals, and hazardous materials with proper certification."
}];
const categoryInfo = {
  dry: {
    title: "Dry Containers",
    description: "Standard steel containers for general cargo. Weatherproof with double doors at one end. The most common container types for international shipping.",
    icon: Box
  },
  reefer: {
    title: "Reefer Containers",
    description: "Temperature-controlled units with integrated refrigeration. Maintain temperatures from -30°C to +30°C. Ideal for perishables, pharmaceuticals, and temperature-sensitive goods.",
    icon: Thermometer
  },
  opentop: {
    title: "Open Top Containers",
    description: "Removable tarpaulin roof and swing-out door header for crane loading. Perfect for tall cargo like machinery, timber, and pipes that cannot be loaded through doors.",
    icon: Package
  },
  flatrack: {
    title: "Flat Rack Containers",
    description: "Collapsible or fixed end walls with no roof or side walls. Designed for over-width, over-height, and heavy cargo like vehicles, boats, and construction equipment.",
    icon: Layers
  },
  special: {
    title: "Special Equipment",
    description: "Specialized containers including tank containers for liquids/gases and platform containers for extra-heavy or oversized cargo that requires special handling.",
    icon: Ship
  }
};
const ContainerCard = ({
  container
}: {
  container: ContainerSpec;
}) => {
  const [expanded, setExpanded] = useState(false);
  return <div className="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-primary" />
            <h3 className="font-heading font-semibold text-lg">{container.name}</h3>
          </div>
          {container.temperatureRange && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Thermometer className="w-3 h-3" />
              Reefer
            </span>}
        </div>
        
        {/* Quick Specs */}
        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div className="bg-muted/50 rounded p-2">
            <span className="text-muted-foreground block text-xs">Capacity</span>
            <span className="font-medium">{container.capacity.split('/')[0].trim()}</span>
          </div>
          <div className="bg-muted/50 rounded p-2">
            <span className="text-muted-foreground block text-xs">Max Payload</span>
            <span className="font-medium">{container.maxPayload.split('/')[0].trim()}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{container.description}</p>

        <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-primary text-sm font-medium hover:underline">
          {expanded ? "Hide Details" : "View Full Specifications"}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Details */}
      {expanded && <div className="border-t bg-muted/30 p-6 space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">External Dimensions</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
              <div><span className="text-muted-foreground">Length:</span> {container.externalDimensions.length}</div>
              <div><span className="text-muted-foreground">Width:</span> {container.externalDimensions.width}</div>
              <div><span className="text-muted-foreground">Height:</span> {container.externalDimensions.height}</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Internal Dimensions</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
              <div><span className="text-muted-foreground">Length:</span> {container.internalDimensions.length}</div>
              <div><span className="text-muted-foreground">Width:</span> {container.internalDimensions.width}</div>
              <div><span className="text-muted-foreground">Height:</span> {container.internalDimensions.height}</div>
            </div>
          </div>

          {container.doorOpening && <div>
              <h4 className="font-semibold text-sm mb-2">Door Opening</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-muted-foreground">Width:</span> {container.doorOpening.width}</div>
                <div><span className="text-muted-foreground">Height:</span> {container.doorOpening.height}</div>
              </div>
            </div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Weights</h4>
              <div className="space-y-1 text-sm">
                <div><span className="text-muted-foreground">Tare Weight:</span> {container.tareWeight}</div>
                <div><span className="text-muted-foreground">Max Payload:</span> {container.maxPayload}</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Capacity</h4>
              <div className="text-sm">{container.capacity}</div>
              {container.floorLoadStrength && <div className="text-sm mt-1">
                  <span className="text-muted-foreground">Floor Strength:</span> {container.floorLoadStrength}
                </div>}
            </div>
          </div>

          {container.temperatureRange && <div>
              <h4 className="font-semibold text-sm mb-2">Temperature Range</h4>
              <div className="text-sm flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-blue-600" />
                {container.temperatureRange}
              </div>
            </div>}
        </div>}
    </div>;
};
const ContainerTypesContent = () => {
  return <div className="space-y-10">
      <div className="prose max-w-none">
        <p className="text-lg text-muted-foreground">
          ZIM offers a comprehensive range of container types to meet all shipping requirements. 
          Below you'll find detailed specifications for each container type including dimensions, 
          capacity, payload limits, and typical applications.
        </p>
      </div>

      {/* External Resources */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg mb-3 flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-primary" />
          Official ZIM Resources
        </h3>
        <div className="flex flex-wrap gap-4">
          <a href="https://www.zim.com/services/shipping-equipment" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1 text-sm">
            ZIM Equipment Specifications <ExternalLink className="w-3 h-3" />
          </a>
          <a href="https://www.zim.com/tools-and-info/container-specifications" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1 text-sm">
            Container Guide PDF <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Container Categories */}
      {(["dry", "reefer", "opentop", "flatrack", "special"] as const).map(category => {
      const info = categoryInfo[category];
      const Icon = info.icon;
      const containers = containerSpecs.filter(c => c.category === category);
      return <div key={category} className="space-y-6">
            <div className="border-b pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-heading font-bold text-2xl">{info.title}</h2>
              </div>
              <p className="text-muted-foreground">{info.description}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {containers.map(container => <ContainerCard key={container.name} container={container} />)}
            </div>
          </div>;
    })}

      {/* CTA Section */}
      <div className="bg-secondary p-8 rounded-lg mt-8">
        <h3 className="font-heading font-semibold text-xl mb-4">Need Container Equipment?</h3>
        <p className="text-muted-foreground mb-6">
          As ZIM's exclusive agent in Cyprus, Shoham can help you select the right container for your cargo 
          and arrange bookings on ZIM vessels. Contact us for equipment availability and pricing.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button asChild className="bg-accent hover:bg-shoham-orange-dark">
            <Link to="/quote">Request A Quote</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact-us">Contact Our Team</Link>
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        * Specifications are approximate and may vary slightly. Contact us for exact specifications and equipment availability.
      </p>
    </div>;
};
const sectionsData: Record<string, SectionData> = {
  "zim-worldwide": {
    title: "ZIM Worldwide",
    subtitle: "Global Network of ZIM Agents",
    content: <div className="space-y-6">
        <p className="text-muted-foreground">
          Zim Integrated Shipping Services Ltd is represented worldwide by approximately 180 Agents 
          who will be happy to assist our customers, suppliers or receivers alike with any enquiries.
        </p>
        <div className="bg-secondary p-8 rounded-lg text-center">
          <Globe className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-xl mb-3">Find ZIM Agents Worldwide</h3>
          <p className="text-muted-foreground mb-6">
            Access the complete list of ZIM agents around the world through the official ZIM website.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <a href="https://www.zim.com/contacts/worldwide-offices" target="_blank" rel="noopener noreferrer">
              ZIM Worldwide Offices <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-secondary p-6 rounded-lg">
            <h3 className="font-heading font-semibold text-lg mb-3">Export Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Competitive freight rates</li>
              <li>• Container booking and allocation</li>
              <li>• Documentation support</li>
              <li>• Customs clearance assistance</li>
            </ul>
          </div>
          <div className="bg-secondary p-6 rounded-lg">
            <h3 className="font-heading font-semibold text-lg mb-3">Import Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Arrival notifications</li>
              <li>• Cargo release coordination</li>
              <li>• Delivery arrangements</li>
              <li>• Storage solutions</li>
            </ul>
          </div>
        </div>
        <div className="bg-card border p-6 rounded-lg">
          <h3 className="font-heading font-semibold text-lg mb-3">Trade Routes</h3>
          <p className="text-muted-foreground mb-4">
            ZIM offers containerized shipping services connecting Cyprus to:
          </p>
          <div className="flex flex-wrap gap-2">
            {["Europe", "Israel", "USA", "Far East", "Mediterranean", "Black Sea", "Middle East", "Africa"].map(route => <span key={route} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {route}
              </span>)}
          </div>
        </div>
      </div>
  },
  "zim-container-types": {
    title: "ZIM Container Types & Specifications",
    subtitle: "Complete specifications for ZIM's container fleet",
    content: <ContainerTypesContent />
  },
  "sailing-schedules": {
    title: "Sailing Schedules",
    subtitle: "ZIM Vessel Schedules",
    content: <div className="space-y-6">
        <p className="text-muted-foreground">
          Access real-time sailing schedules directly from ZIM's official schedule system. 
          Get accurate departure and arrival times for all ZIM services.
        </p>
        <div className="bg-secondary p-8 rounded-lg text-center">
          <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-xl mb-3">View Live Schedules</h3>
          <p className="text-muted-foreground mb-6">
            Click below to access ZIM's official sailing schedule system
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <a href="https://www.zim.com/schedules" target="_blank" rel="noopener noreferrer">
              ZIM Sailing Schedules <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
        <div className="bg-card border p-6 rounded-lg">
          <h3 className="font-heading font-semibold text-lg mb-3">Need Assistance?</h3>
          <p className="text-muted-foreground">
            Our team can help you find the best sailing options for your cargo. 
            Contact us for personalized schedule recommendations and booking support.
          </p>
        </div>
      </div>
  },
  "track-your-container": {
    title: "Track Your Container",
    subtitle: "Container Tracking Service",
    content: <div className="space-y-6">
        <p className="text-muted-foreground">
          Track your ZIM container shipments in real-time using ZIM's official tracking system. 
          Get instant updates on your cargo's location and status.
        </p>
        <div className="bg-secondary p-8 rounded-lg text-center">
          <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-xl mb-3">Track Your Shipment</h3>
          <p className="text-muted-foreground mb-6">
            Click below to access ZIM's official container tracking system
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <a href="https://www.zim.com/tools/track-a-shipment" target="_blank" rel="noopener noreferrer">
              ZIM Container Tracking <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border p-6 rounded-lg">
            <h3 className="font-heading font-semibold text-lg mb-3">Track by Container Number</h3>
            <p className="text-muted-foreground text-sm">
              Enter your container number (e.g., ZIMU1234567) to get real-time location and status updates.
            </p>
          </div>
          <div className="bg-card border p-6 rounded-lg">
            <h3 className="font-heading font-semibold text-lg mb-3">Track by Bill of Lading</h3>
            <p className="text-muted-foreground text-sm">
              Use your B/L number to track all containers associated with your shipment.
            </p>
          </div>
        </div>
      </div>
  },
  "marketing-and-sales": {
    title: "ZIM Marketing and Sales",
    subtitle: "Commercial Services & Rate Quotations",
    content: <div className="space-y-6">
        <p className="text-muted-foreground">Shoham , as the exclusive ZIM agent in Cyprus, provides comprehensive support for all your shipping needs. Our dedicated commercial team is here to assist with rate quotations and service inquiries</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-secondary p-6 rounded-lg">
            <h3 className="font-heading font-semibold text-lg mb-3">Rate Quotations</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• Competitive freight rates for all destinations</li>
              <li>• FCL and LCL pricing</li>
              <li>• Special cargo rates</li>
              <li>• Volume contract negotiations</li>
              <li>• Seasonal rate programs</li>
            </ul>
          </div>
          <div className="bg-secondary p-6 rounded-lg">
            <h3 className="font-heading font-semibold text-lg mb-3">Commercial Services</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• New customer onboarding</li>
              <li>• Service route consultations</li>
              <li>• Transit time inquiries</li>
              <li>• Equipment availability</li>
              <li>• Partnership opportunities</li>
            </ul>
          </div>
        </div>

        <div className="bg-card border p-6 rounded-lg">
          <h3 className="font-heading font-semibold text-lg mb-3">Contact Our Sales Team</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">For Rate Inquiries</h4>
              <p className="text-muted-foreground text-sm mb-1">Email: {CONTACT.primary.email}</p>
              <p className="text-muted-foreground text-sm">Phone: {CONTACT.primary.phone}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Business Hours</h4>
              <p className="text-muted-foreground text-sm mb-1">{CONTACT.hours.weekdays}</p>
              <p className="text-muted-foreground text-sm">{CONTACT.hours.weekend}</p>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 p-6 rounded-lg">
          <h3 className="font-heading font-semibold text-lg mb-3">Request a Quote</h3>
          <p className="text-muted-foreground mb-4">
            Need shipping rates? Contact our sales team with the following information:
          </p>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>• Origin and destination ports</li>
            <li>• Cargo type and commodity</li>
            <li>• Container type and quantity</li>
            <li>• Estimated shipping date</li>
            <li>• Any special requirements</li>
          </ul>
        </div>
      </div>
  }
};
const ZimSectionPage = () => {
  const {
    section
  } = useParams<{
    section: string;
  }>();
  const sectionData = section ? sectionsData[section] : null;
  if (!sectionData) {
    return <Layout>
        <div className="container-shoham py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Section Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested section could not be found.</p>
          <Button asChild>
            <Link to="/zim-agency-in-cyprus">Back to ZIM Agency</Link>
          </Button>
        </div>
      </Layout>;
  }
  return <Layout>
      <SEO
        title={sectionData.title}
        description={sectionData.subtitle}
        path={`/zim-agency-in-cyprus/${section}`}
      />
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <div className="mb-2">
            <Link to="/zim-agency-in-cyprus" className="text-white/70 hover:text-white text-sm">
              ← Back to ZIM Agency
            </Link>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
            {sectionData.title}
          </h1>
          <p className="text-white/90 text-lg">{sectionData.subtitle}</p>
        </div>
      </div>

      <div className="container-shoham py-12">
        {sectionData.content}

        <div className="mt-12 pt-8 border-t">
          <h3 className="font-heading font-semibold text-lg mb-4">Other ZIM Services</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(sectionsData).filter(([key]) => key !== section).map(([key, s]) => <Link key={key} to={`/zim-agency-in-cyprus/${key}`} className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors">
                  {s.title}
                </Link>)}
          </div>
        </div>
      </div>
    </Layout>;
};
export default ZimSectionPage;