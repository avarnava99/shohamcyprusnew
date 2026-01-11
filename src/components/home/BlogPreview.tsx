import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

const BlogPreview = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts-preview"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, published_at, blog_categories(name, slug)")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(4);
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-secondary">
        <div className="container-shoham">
          <h2 className="section-title text-center mb-12">Latest News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded shadow-md p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-4" />
                <div className="h-3 bg-muted rounded w-full mb-2" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-secondary">
      <div className="container-shoham">
        <h2 className="section-title text-center mb-12">Latest News</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts?.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-white rounded shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="p-6">
                {post.blog_categories && (
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {post.blog_categories.name}
                  </Badge>
                )}
                <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}
                  </span>
                  <span className="text-primary group-hover:text-accent transition-colors flex items-center">
                    Read <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-primary hover:text-accent font-semibold transition-colors"
          >
            View All News <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
