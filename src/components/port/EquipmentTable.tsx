import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Container, Truck, Construction } from "lucide-react";
import type { EquipmentCategory } from "@/data/limassolPortData";

interface EquipmentTableProps {
  equipment: EquipmentCategory[];
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Crane":
      return <Construction className="w-4 h-4" />;
    case "Container":
      return <Container className="w-4 h-4" />;
    case "Truck":
    case "Trailer":
    case "Forklift":
      return <Truck className="w-4 h-4" />;
    default:
      return <Truck className="w-4 h-4" />;
  }
};

const EquipmentTable = ({ equipment }: EquipmentTableProps) => {
  const [activeTab, setActiveTab] = useState(equipment[0]?.category || "");

  // Group equipment into main categories for tabs
  const cranes = equipment.filter(e => e.category.includes("Crane"));
  const handlers = equipment.filter(e => e.category.includes("Stacker") || e.category.includes("Forklift"));
  const vehicles = equipment.filter(e => e.category.includes("Tractor") || e.category.includes("Trailer"));

  const categories = [
    { id: "cranes", label: "Cranes", data: cranes },
    { id: "handlers", label: "Handlers & Forklifts", data: handlers },
    { id: "vehicles", label: "Tractors & Trailers", data: vehicles }
  ].filter(cat => cat.data.length > 0);

  const getTotalItems = (cats: EquipmentCategory[]) => {
    return cats.reduce((total, cat) => {
      return total + cat.items.reduce((catTotal, item) => catTotal + item.qty, 0);
    }, 0);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue={categories[0]?.id} className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          {categories.map((cat) => (
            <TabsTrigger 
              key={cat.id} 
              value={cat.id}
              className="flex-1 min-w-fit data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {cat.label}
              <Badge variant="secondary" className="ml-2 bg-background/50">
                {getTotalItems(cat.data)}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat.id} value={cat.id} className="mt-4">
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Manufacturer</TableHead>
                    <TableHead className="font-semibold">Model</TableHead>
                    <TableHead className="font-semibold">Description</TableHead>
                    <TableHead className="font-semibold text-right">Capacity</TableHead>
                    <TableHead className="font-semibold text-center">Qty</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cat.data.map((category) => (
                    category.items.map((item, idx) => (
                      <TableRow key={`${category.category}-${idx}`}>
                        <TableCell className="font-medium">{item.manufacturer}</TableCell>
                        <TableCell>{item.model}</TableCell>
                        <TableCell className="text-muted-foreground">{item.description}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="font-mono">
                            {item.capacity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold">{item.qty}</TableCell>
                      </TableRow>
                    ))
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default EquipmentTable;
