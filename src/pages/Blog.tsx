import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, published_at, featured_image, blog_categories(name, slug)")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            News & Blog
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Latest news from the shipping and logistics industry
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-lg shadow p-6 animate-pulse">
                <div className="h-40 bg-muted rounded mb-4" />
                <div className="h-4 bg-muted rounded w-3/4 mb-4" />
                <div className="h-3 bg-muted rounded w-full mb-2" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-card rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
              >
                {post.featured_image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  {post.blog_categories && (
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {post.blog_categories.name}
                    </Badge>
                  )}
                  <h2 className="font-heading font-semibold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}
                    </span>
                    <span className="text-primary group-hover:text-accent transition-colors flex items-center">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts available yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
