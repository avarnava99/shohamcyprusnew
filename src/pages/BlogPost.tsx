import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DOMPurify from "dompurify";
import SEO, { blogPostJsonLd } from "@/components/SEO";

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

      {post.featured_image && (
        <div className="container-shoham -mt-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      <div className="container-shoham py-12">
        <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-sm p-8 md:p-12">
          <article 
            className="prose prose-lg max-w-none
              prose-headings:font-heading 
              prose-headings:text-foreground 
              prose-headings:mt-8 
              prose-headings:mb-4
              prose-p:text-foreground 
              prose-p:leading-relaxed
              prose-p:mb-6
              prose-a:text-primary 
              prose-a:underline
              prose-strong:text-foreground
              prose-ul:list-disc
              prose-ul:pl-6
              prose-ul:my-6
              prose-ol:list-decimal
              prose-ol:pl-6
              prose-li:text-foreground
              prose-li:my-2
              prose-li:marker:text-primary
              prose-blockquote:border-l-4
              prose-blockquote:border-primary
              prose-blockquote:pl-4
              prose-blockquote:italic"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
