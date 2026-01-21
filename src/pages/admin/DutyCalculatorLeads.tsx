import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Calculator, RefreshCw, User, Mail, Phone, Building, Package, MapPin, Clock, Euro } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface DutyLead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  product_description: string;
  product_value: number;
  shipping_cost: number;
  insurance_cost: number;
  country_of_origin: string;
  cif_value: number | null;
  estimated_duty_rate: number | null;
  estimated_duty: number | null;
  vat_amount: number | null;
  total_cost: number | null;
  hs_code_estimate: string | null;
  product_category: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  quoted: "bg-purple-100 text-purple-800",
  converted: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
};

const DutyCalculatorLeads = () => {
  const [leads, setLeads] = useState<DutyLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("duty_calculator_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("duty_calculator_leads")
        .update({ status: newStatus })
        .eq("id", leadId);

      if (error) throw error;

      setLeads(prev =>
        prev.map(lead =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        )
      );
      toast.success("Status updated");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleSaveNotes = async (leadId: string) => {
    try {
      const { error } = await supabase
        .from("duty_calculator_leads")
        .update({ notes: editingNotes[leadId] || null })
        .eq("id", leadId);

      if (error) throw error;

      setLeads(prev =>
        prev.map(lead =>
          lead.id === leadId ? { ...lead, notes: editingNotes[leadId] || null } : lead
        )
      );
      toast.success("Notes saved");
    } catch (error) {
      console.error("Error saving notes:", error);
      toast.error("Failed to save notes");
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      lead.product_description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: leads.length,
    new: leads.filter(l => l.status === "new").length,
    contacted: leads.filter(l => l.status === "contacted").length,
    quoted: leads.filter(l => l.status === "quoted").length,
    converted: leads.filter(l => l.status === "converted").length,
    closed: leads.filter(l => l.status === "closed").length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Duty Calculator Leads</h1>
            <p className="text-muted-foreground mt-1">
              Manage leads from the Cyprus duty calculator tool
            </p>
          </div>
          <Button onClick={fetchLeads} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, company, or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ({statusCounts.all})</SelectItem>
              <SelectItem value="new">New ({statusCounts.new})</SelectItem>
              <SelectItem value="contacted">Contacted ({statusCounts.contacted})</SelectItem>
              <SelectItem value="quoted">Quoted ({statusCounts.quoted})</SelectItem>
              <SelectItem value="converted">Converted ({statusCounts.converted})</SelectItem>
              <SelectItem value="closed">Closed ({statusCounts.closed})</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Leads List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredLeads.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Calculator className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No leads found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <Card key={lead.id} className="overflow-hidden">
                <CardHeader
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">{lead.name}</CardTitle>
                        <Badge className={statusColors[lead.status] || statusColors.new}>
                          {lead.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5" />
                          {lead.email}
                        </span>
                        {lead.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5" />
                            {lead.phone}
                          </span>
                        )}
                        {lead.company && (
                          <span className="flex items-center gap-1">
                            <Building className="h-3.5 w-3.5" />
                            {lead.company}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {format(new Date(lead.created_at), "MMM d, yyyy 'at' HH:mm")}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {lead.total_cost && (
                        <div className="text-lg font-semibold text-accent">
                          €{lead.total_cost.toFixed(2)}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground">estimated total</div>
                    </div>
                  </div>
                </CardHeader>

                {expandedLead === lead.id && (
                  <CardContent className="border-t bg-muted/30 pt-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Product Details */}
                      <div className="space-y-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          Product Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="text-muted-foreground">Description:</span>{" "}
                            {lead.product_description}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Origin:</span>{" "}
                            {lead.country_of_origin}
                          </p>
                          {lead.product_category && (
                            <p>
                              <span className="text-muted-foreground">Category:</span>{" "}
                              {lead.product_category}
                            </p>
                          )}
                          {lead.hs_code_estimate && (
                            <p>
                              <span className="text-muted-foreground">Est. HS Code:</span>{" "}
                              {lead.hs_code_estimate}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Calculation Breakdown */}
                      <div className="space-y-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Euro className="h-4 w-4" />
                          Cost Breakdown
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Product Value:</span>
                            <span>€{lead.product_value.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping:</span>
                            <span>€{lead.shipping_cost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Insurance:</span>
                            <span>€{lead.insurance_cost.toFixed(2)}</span>
                          </div>
                          {lead.cif_value && (
                            <div className="flex justify-between font-medium border-t pt-2">
                              <span>CIF Value:</span>
                              <span>€{lead.cif_value.toFixed(2)}</span>
                            </div>
                          )}
                          {lead.estimated_duty !== null && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Duty ({lead.estimated_duty_rate}%):
                              </span>
                              <span>€{lead.estimated_duty.toFixed(2)}</span>
                            </div>
                          )}
                          {lead.vat_amount !== null && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">VAT (19%):</span>
                              <span>€{lead.vat_amount.toFixed(2)}</span>
                            </div>
                          )}
                          {lead.total_cost && (
                            <div className="flex justify-between font-bold text-accent border-t pt-2">
                              <span>Total Estimate:</span>
                              <span>€{lead.total_cost.toFixed(2)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-4 border-t space-y-4">
                      <div className="flex items-center gap-4">
                        <label className="text-sm font-medium">Status:</label>
                        <Select
                          value={lead.status}
                          onValueChange={(value) => handleStatusChange(lead.id, value)}
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="quoted">Quoted</SelectItem>
                            <SelectItem value="converted">Converted</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Notes:</label>
                        <Textarea
                          placeholder="Add notes about this lead..."
                          value={editingNotes[lead.id] ?? lead.notes ?? ""}
                          onChange={(e) =>
                            setEditingNotes({ ...editingNotes, [lead.id]: e.target.value })
                          }
                          rows={3}
                        />
                        <Button
                          size="sm"
                          onClick={() => handleSaveNotes(lead.id)}
                        >
                          Save Notes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default DutyCalculatorLeads;
