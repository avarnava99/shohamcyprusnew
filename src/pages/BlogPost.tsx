import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*, blog_categories(name, slug)")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container-shoham py-12">
          <div className="max-w-3xl mx-auto animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4 mb-4" />
            <div className="h-4 bg-muted rounded w-1/4 mb-8" />
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container-shoham py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested blog post does not exist.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-white/80 flex-wrap">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}
            </span>
            {post.blog_categories && (
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                <Tag className="h-3 w-3 mr-1" />
                {post.blog_categories.name}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="container-shoham py-12">
        <article 
          className="max-w-3xl mx-auto prose prose-lg prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </Layout>
  );
};

export default BlogPost;
