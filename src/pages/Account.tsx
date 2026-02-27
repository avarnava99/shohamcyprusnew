import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Save,
  Loader2,
  Lock,
  FileText,
  Package,
  Calendar,
  Mail,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";

const statusColor = (status: string) => {
  switch (status) {
    case "new":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "pending":
    case "in_progress":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "completed":
    case "replied":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Account = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [memberSince, setMemberSince] = useState("");

  // Submissions
  const [contactSubs, setContactSubs] = useState<any[]>([]);
  const [containerOrders, setContainerOrders] = useState<any[]>([]);
  const [subsLoading, setSubsLoading] = useState(true);

  // Security
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }

      const userEmail = session.user.email ?? "";
      setEmail(userEmail);

      // Load profile + submissions in parallel
      const [profileRes, contactRes, ordersRes] = await Promise.all([
        supabase
          .from("profiles")
          .select("full_name, phone, company, created_at")
          .eq("user_id", session.user.id)
          .single(),
        supabase
          .from("contact_submissions")
          .select("id, created_at, subject, submission_type, status, message")
          .order("created_at", { ascending: false }),
        supabase
          .from("container_orders")
          .select("id, created_at, container_type, quantity, status, city")
          .order("created_at", { ascending: false }),
      ]);

      if (profileRes.data) {
        setFullName(profileRes.data.full_name ?? "");
        setPhone(profileRes.data.phone ?? "");
        setCompany(profileRes.data.company ?? "");
        setMemberSince(profileRes.data.created_at ?? "");
      }

      setContactSubs(contactRes.data ?? []);
      setContainerOrders(ordersRes.data ?? []);
      setLoading(false);
      setSubsLoading(false);
    };

    load();
  }, [navigate]);

  const handleSave = async () => {
    setSaving(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        phone: phone || null,
        company: company || null,
      })
      .eq("user_id", session.user.id);

    setSaving(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    setChangingPassword(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    setChangingPassword(false);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully.",
      });
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-[#0a1628] text-white py-16">
        <div className="container-shoham">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-8 w-8 text-[#f59e0b]" />
            <h1 className="text-3xl md:text-4xl font-bold">My Account</h1>
          </div>
          <p className="text-white/70 text-lg">
            Manage your profile, view submissions, and update security settings
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container-shoham max-w-4xl">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="submissions" className="gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">My Submissions</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="gap-2">
                  <Lock className="h-4 w-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
              </TabsList>

              {/* PROFILE TAB */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    {memberSince && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        Member since{" "}
                        {format(new Date(memberSince), "MMMM yyyy")}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        disabled
                        className="bg-muted"
                      />
                      <p className="text-xs text-muted-foreground">
                        Email cannot be changed
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Enter your company name"
                      />
                    </div>
                    <Button
                      onClick={handleSave}
                      disabled={saving}
                      className="w-full"
                    >
                      {saving ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* SUBMISSIONS TAB */}
              <TabsContent value="submissions">
                <div className="space-y-6">
                  {/* Contact Submissions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <MessageSquare className="h-5 w-5" />
                        Contact & Quote Submissions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {subsLoading ? (
                        <div className="flex justify-center py-6">
                          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                      ) : contactSubs.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Mail className="h-10 w-10 mx-auto mb-3 opacity-40" />
                          <p>No submissions yet.</p>
                          <Link
                            to="/contact"
                            className="text-primary hover:underline text-sm mt-1 inline-block"
                          >
                            Contact us →
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {contactSubs.map((sub) => (
                            <div
                              key={sub.id}
                              className="flex items-start justify-between gap-4 p-3 rounded-lg border border-border bg-muted/30"
                            >
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-sm truncate">
                                  {sub.subject || sub.submission_type}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                  {sub.message}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {format(
                                    new Date(sub.created_at),
                                    "dd MMM yyyy"
                                  )}
                                </p>
                              </div>
                              <Badge
                                className={`text-xs shrink-0 ${statusColor(sub.status)}`}
                              >
                                {sub.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Container Orders */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Package className="h-5 w-5" />
                        Container Orders
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {subsLoading ? (
                        <div className="flex justify-center py-6">
                          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                      ) : containerOrders.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Package className="h-10 w-10 mx-auto mb-3 opacity-40" />
                          <p>No container orders yet.</p>
                          <Link
                            to="/used-containers"
                            className="text-primary hover:underline text-sm mt-1 inline-block"
                          >
                            Browse containers →
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {containerOrders.map((order) => (
                            <div
                              key={order.id}
                              className="flex items-start justify-between gap-4 p-3 rounded-lg border border-border bg-muted/30"
                            >
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-sm">
                                  {order.quantity}x {order.container_type}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  Delivery: {order.city}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {format(
                                    new Date(order.created_at),
                                    "dd MMM yyyy"
                                  )}
                                </p>
                              </div>
                              <Badge
                                className={`text-xs shrink-0 ${statusColor(order.status)}`}
                              >
                                {order.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* SECURITY TAB */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>
                    <Button
                      onClick={handlePasswordChange}
                      disabled={
                        changingPassword || !newPassword || !confirmPassword
                      }
                      className="w-full"
                    >
                      {changingPassword ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Lock className="h-4 w-4 mr-2" />
                      )}
                      Update Password
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Account;
