import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

const containerTypes = [
  {
    name: "20' Standard",
    type: "Dry Container",
    externalDimensions: "20' x 8' x 8'6\"",
    internalDimensions: "19'4\" x 7'8\" x 7'10\"",
    doorOpening: "7'8\" x 7'6\"",
    capacity: "33 CBM / 1,165 cu ft",
    maxPayload: "28,200 kg / 62,170 lbs",
    tareWeight: "2,300 kg / 5,070 lbs"
  },
  {
    name: "40' Standard",
    type: "Dry Container",
    externalDimensions: "40' x 8' x 8'6\"",
    internalDimensions: "39'5\" x 7'8\" x 7'10\"",
    doorOpening: "7'8\" x 7'6\"",
    capacity: "67 CBM / 2,366 cu ft",
    maxPayload: "28,800 kg / 63,492 lbs",
    tareWeight: "3,750 kg / 8,268 lbs"
  },
  {
    name: "40' High Cube",
    type: "Dry Container",
    externalDimensions: "40' x 8' x 9'6\"",
    internalDimensions: "39'5\" x 7'8\" x 8'10\"",
    doorOpening: "7'8\" x 8'5\"",
    capacity: "76 CBM / 2,684 cu ft",
    maxPayload: "28,600 kg / 63,052 lbs",
    tareWeight: "3,940 kg / 8,686 lbs"
  },
  {
    name: "20' Refrigerated",
    type: "Reefer Container",
    externalDimensions: "20' x 8' x 8'6\"",
    internalDimensions: "17'10\" x 7'5\" x 7'5\"",
    doorOpening: "7'5\" x 7'2\"",
    capacity: "28 CBM / 989 cu ft",
    maxPayload: "27,400 kg / 60,406 lbs",
    tareWeight: "3,080 kg / 6,790 lbs"
  },
  {
    name: "40' Refrigerated",
    type: "Reefer Container",
    externalDimensions: "40' x 8' x 8'6\"",
    internalDimensions: "37'8\" x 7'5\" x 7'4\"",
    doorOpening: "7'5\" x 7'2\"",
    capacity: "59 CBM / 2,084 cu ft",
    maxPayload: "29,500 kg / 65,036 lbs",
    tareWeight: "4,800 kg / 10,582 lbs"
  },
  {
    name: "40' High Cube Reefer",
    type: "Reefer Container",
    externalDimensions: "40' x 8' x 9'6\"",
    internalDimensions: "37'11\" x 7'6\" x 8'2\"",
    doorOpening: "7'6\" x 8'",
    capacity: "67 CBM / 2,366 cu ft",
    maxPayload: "29,000 kg / 63,934 lbs",
    tareWeight: "4,900 kg / 10,802 lbs"
  },
  {
    name: "20' Open Top",
    type: "Open Top Container",
    externalDimensions: "20' x 8' x 8'6\"",
    internalDimensions: "19'4\" x 7'7\" x 7'8\"",
    doorOpening: "7'7\" x 7'6\"",
    capacity: "32 CBM / 1,130 cu ft",
    maxPayload: "28,100 kg / 61,950 lbs",
    tareWeight: "2,400 kg / 5,291 lbs"
  },
  {
    name: "40' Open Top",
    type: "Open Top Container",
    externalDimensions: "40' x 8' x 8'6\"",
    internalDimensions: "39'5\" x 7'7\" x 7'8\"",
    doorOpening: "7'7\" x 7'6\"",
    capacity: "65 CBM / 2,295 cu ft",
    maxPayload: "28,600 kg / 63,052 lbs",
    tareWeight: "3,900 kg / 8,598 lbs"
  },
  {
    name: "20' Flat Rack",
    type: "Flat Rack Container",
    externalDimensions: "20' x 8' x 8'6\"",
    internalDimensions: "18'5\" x 7'3\" x 7'4\"",
    doorOpening: "N/A",
    capacity: "N/A",
    maxPayload: "31,000 kg / 68,343 lbs",
    tareWeight: "2,740 kg / 6,040 lbs"
  },
  {
    name: "40' Flat Rack",
    type: "Flat Rack Container",
    externalDimensions: "40' x 8' x 8'6\"",
    internalDimensions: "39'7\" x 7'3\" x 6'5\"",
    doorOpening: "N/A",
    capacity: "N/A",
    maxPayload: "40,000 kg / 88,185 lbs",
    tareWeight: "5,000 kg / 11,023 lbs"
  }
];

const ContainerTypes = () => {
  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Container Types
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Complete specifications for shipping containers available through ZIM and other carriers.
            Choose the right container for your cargo requirements.
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="mb-8">
          <p className="text-muted-foreground">
            Below you'll find detailed specifications for the most common container types used in 
            international shipping. Contact us if you need help selecting the right container for your cargo.
          </p>
        </div>

        <div className="space-y-8">
          {["Dry Container", "Reefer Container", "Open Top Container", "Flat Rack Container"].map((type) => (
            <div key={type}>
              <h2 className="section-title mb-6">{type}s</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {containerTypes
                  .filter((c) => c.type === type)
                  .map((container) => (
                    <div key={container.name} className="bg-card border rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Package className="w-8 h-8 text-primary" />
                        <h3 className="font-heading font-semibold text-lg">{container.name}</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">External:</span>
                          <span className="font-medium">{container.externalDimensions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Internal:</span>
                          <span className="font-medium">{container.internalDimensions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Door Opening:</span>
                          <span className="font-medium">{container.doorOpening}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Capacity:</span>
                          <span className="font-medium">{container.capacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Max Payload:</span>
                          <span className="font-medium">{container.maxPayload}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tare Weight:</span>
                          <span className="font-medium">{container.tareWeight}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-secondary p-8 rounded-lg">
          <h3 className="font-heading font-semibold text-xl mb-4">Need Help Choosing?</h3>
          <p className="text-muted-foreground mb-6">
            Not sure which container type is right for your cargo? Our team can help you select the 
            optimal container based on your cargo dimensions, weight, and special requirements.
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

        <p className="text-sm text-muted-foreground mt-8">
          * Specifications are approximate and may vary by manufacturer. Contact us for exact specifications.
        </p>
      </div>
    </Layout>
  );
};

export default ContainerTypes;
