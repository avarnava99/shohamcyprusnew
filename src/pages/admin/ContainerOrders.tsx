import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ContainerOrderCard from "@/components/admin/ContainerOrderCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Package } from "lucide-react";

interface ContainerOrder {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  container_type: string;
  quantity: number;
  street_address: string;
  address_line_2: string | null;
  city: string;
  state_region: string | null;
  postal_code: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  location_address: string | null;
  crane_unloading: boolean;
  comments: string | null;
  status: string;
  created_at: string;
}

const ContainerOrders = () => {
  const [orders, setOrders] = useState<ContainerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("container_orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load container orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("container_orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update order status");
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesSearch = 
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.container_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.company?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    all: orders.length,
    new: orders.filter(o => o.status === "new").length,
    contacted: orders.filter(o => o.status === "contacted").length,
    quoted: orders.filter(o => o.status === "quoted").length,
    sold: orders.filter(o => o.status === "sold").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Container Orders</h1>
            <p className="text-muted-foreground mt-1">
              Manage container purchase requests and send offers
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">{orders.length}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, company, or container type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ({statusCounts.all})</SelectItem>
              <SelectItem value="new">New ({statusCounts.new})</SelectItem>
              <SelectItem value="contacted">Contacted ({statusCounts.contacted})</SelectItem>
              <SelectItem value="quoted">Quoted ({statusCounts.quoted})</SelectItem>
              <SelectItem value="sold">Sold ({statusCounts.sold})</SelectItem>
              <SelectItem value="cancelled">Cancelled ({statusCounts.cancelled})</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Package className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
            <p className="mt-2 text-muted-foreground">
              {statusFilter !== "all" 
                ? "Try changing the status filter or search query"
                : "Container orders will appear here when customers submit requests"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredOrders.map((order) => (
              <ContainerOrderCard
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
                onOfferSent={() => handleStatusChange(order.id, "quoted")}
              />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ContainerOrders;
