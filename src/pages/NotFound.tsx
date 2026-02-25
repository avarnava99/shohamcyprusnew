import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const suggestedPages = [
  { label: "Duty Calculator", path: "/services/customs-clearing/duty-calculator-for-cyprus", desc: "Calculate import duties for Cyprus" },
  { label: "Container Tracking", path: "/services/container-tracking", desc: "Track your shipment in real time" },
  { label: "Used Containers", path: "/services/used-containers", desc: "Buy shipping containers in Cyprus" },
  { label: "Port Agency", path: "/port-agency", desc: "Full port agency services" },
  { label: "Freight Forwarding", path: "/services/freight-forwarding", desc: "Sea, air & road freight" },
  { label: "Contact Us", path: "/contact-us", desc: "Get in touch with our team" },
];

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkBlogRedirect = async () => {
      // Extract potential slug from pathname (strip leading/trailing slashes)
      const potentialSlug = location.pathname.replace(/^\/|\/$/g, '');
      
      if (!potentialSlug) {
        setChecking(false);
        return;
      }

      try {
        const { data } = await supabase
          .from('blog_posts')
          .select('slug')
          .eq('slug', potentialSlug)
          .eq('published', true)
          .maybeSingle();

        if (data) {
          navigate(`/blog/${data.slug}`, { replace: true });
          return;
        }
      } catch (e) {
        // Ignore errors, fall through to 404
      }

      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
      setChecking(false);
    };

    checkBlogRedirect();
  }, [location.pathname, navigate]);

  if (checking) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Search className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="mb-3 text-4xl font-bold text-foreground">Page Not Found</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            The page <code className="bg-muted px-2 py-0.5 rounded text-sm">{location.pathname}</code> doesn't exist. It may have been moved or removed.
          </p>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Popular Pages</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {suggestedPages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <div>
                    <div className="font-medium text-foreground group-hover:text-primary">{page.label}</div>
                    <div className="text-sm text-muted-foreground">{page.desc}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
