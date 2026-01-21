import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Clock, CheckCircle, Reply, Package } from "lucide-react";
import { Link } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchContainerStats();
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

  const statCards = [
    { label: "Contact Submissions", value: stats.total, icon: Mail, color: "text-primary" },
    { label: "New Contacts", value: stats.new, icon: Clock, color: "text-blue-500" },
    { label: "Container Orders", value: containerStats.total, icon: Package, color: "text-purple-500" },
    { label: "Pending Orders", value: containerStats.pending, icon: Package, color: "text-orange-500" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to the Shoham admin dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {loading ? "..." : stat.value}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link to="/admin/contacts">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    View Contact Submissions
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
                    View Container Orders
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
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
