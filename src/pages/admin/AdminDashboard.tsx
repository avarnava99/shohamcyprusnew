import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Package, Calculator, MessageCircle, ExternalLink, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAdminChat } from "@/hooks/useChat";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    read: 0,
    replied: 0,
  });
  const [containerStats, setContainerStats] = useState({
    total: 0,
    pending: 0,
  });
  const [dutyLeadStats, setDutyLeadStats] = useState({
    total: 0,
    new: 0,
  });
  const [loading, setLoading] = useState(true);
  const { sessions, totalUnread } = useAdminChat();

  const activeChatCount = sessions.filter(s => s.status === 'active').length;

  useEffect(() => {
    fetchStats();
    fetchContainerStats();
    fetchDutyLeadStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("status");

      if (error) throw error;

      const newStats = {
        total: data?.length || 0,
        new: data?.filter(s => s.status === "new").length || 0,
        read: data?.filter(s => s.status === "read").length || 0,
        replied: data?.filter(s => s.status === "replied").length || 0,
      };

      setStats(newStats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContainerStats = async () => {
    try {
      const { data, error } = await supabase
        .from("container_orders")
        .select("status");

      if (error) throw error;

      setContainerStats({
        total: data?.length || 0,
        pending: data?.filter(o => o.status === "new" || o.status === "contacted").length || 0,
      });
    } catch (error) {
      console.error("Error fetching container stats:", error);
    }
  };

  const fetchDutyLeadStats = async () => {
    try {
      const { data, error } = await supabase
        .from("duty_calculator_leads")
        .select("status");

      if (error) throw error;

      setDutyLeadStats({
        total: data?.length || 0,
        new: data?.filter(l => l.status === "new").length || 0,
      });
    } catch (error) {
      console.error("Error fetching duty lead stats:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to the Shoham admin dashboard</p>
        </div>

        {/* Analytics Section */}
        <AnalyticsDashboard />

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link to="/admin/live-chat">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                    Live Chat
                  </CardTitle>
                  <CardDescription>
                    Chat with website visitors in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {totalUnread > 0 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {totalUnread} unread message{totalUnread > 1 ? "s" : ""}
                    </span>
                  )}
                  {activeChatCount > 0 && totalUnread === 0 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {activeChatCount} active chat{activeChatCount > 1 ? "s" : ""}
                    </span>
                  )}
                </CardContent>
              </Card>
            </Link>
            <Link to="/admin/contacts">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Contact Submissions
                  </CardTitle>
                  <CardDescription>
                    Manage and respond to contact form submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {stats.new > 0 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {stats.new} new submission{stats.new > 1 ? "s" : ""}
                    </span>
                  )}
                </CardContent>
              </Card>
            </Link>
            <Link to="/admin/container-orders">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-purple-500" />
                    Container Orders
                  </CardTitle>
                  <CardDescription>
                    Manage container purchase requests and send offers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {containerStats.pending > 0 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {containerStats.pending} pending order{containerStats.pending > 1 ? "s" : ""}
                    </span>
                  )}
                </CardContent>
              </Card>
            </Link>
            <Link to="/admin/duty-leads">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-orange-500" />
                    Duty Calculator Leads
                  </CardTitle>
                  <CardDescription>
                    Manage leads from the Cyprus duty calculator tool
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {dutyLeadStats.new > 0 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {dutyLeadStats.new} new lead{dutyLeadStats.new > 1 ? "s" : ""}
                    </span>
                  )}
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
