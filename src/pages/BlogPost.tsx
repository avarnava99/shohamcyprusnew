import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ArrowLeft, ArrowRight, Tag } from "lucide-react";
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

  // Related posts: same category, then fill with latest
  const { data: relatedPosts } = useQuery({
    queryKey: ["related-posts", post?.id, post?.category_id],
    queryFn: async () => {
      const results: typeof sameCat = [];

      // First try same category
      if (post!.category_id) {
        const { data: sameCatData } = await supabase
          .from("blog_posts")
          .select("id, title, slug, featured_image, published_at")
          .eq("published", true)
          .eq("category_id", post!.category_id)
          .neq("id", post!.id)
          .order("published_at", { ascending: false })
          .limit(3);
        if (sameCatData) results.push(...sameCatData);
      }

      // Fill remaining slots with latest from any category
      if (results.length < 3) {
        const excludeIds = [post!.id, ...results.map((r) => r.id)];
        const { data: latest } = await supabase
          .from("blog_posts")
          .select("id, title, slug, featured_image, published_at")
          .eq("published", true)
          .not("id", "in", `(${excludeIds.join(",")})`)
          .order("published_at", { ascending: false })
          .limit(3 - results.length);
        if (latest) results.push(...latest);
      }

      return results;
      // Type helper
      var sameCat: { id: string; title: string; slug: string; featured_image: string | null; published_at: string | null }[];
    },
    enabled: !!post?.id,
  });

  // Prev/Next posts by published_at
  const { data: prevPost } = useQuery({
    queryKey: ["prev-post", post?.published_at],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("title, slug")
        .eq("published", true)
        .lt("published_at", post!.published_at!)
        .order("published_at", { ascending: false })
        .limit(1)
        .single();
      return data;
    },
    enabled: !!post?.published_at,
  });

  const { data: nextPost } = useQuery({
    queryKey: ["next-post", post?.published_at],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("title, slug")
        .eq("published", true)
        .gt("published_at", post!.published_at!)
        .order("published_at", { ascending: true })
        .limit(1)
        .single();
      return data;
    },
    enabled: !!post?.published_at,
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
      <SEO
        title={post.title}
        description={post.excerpt || `${post.title} - Shoham Shipping & Logistics blog`}
        path={`/blog/${post.slug}`}
        image={post.featured_image || undefined}
        type="article"
        jsonLd={blogPostJsonLd(post)}
      />
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
              <Link to={`/blog?category=${post.blog_categories.slug}`}>
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  <Tag className="h-3 w-3 mr-1" />
                  {post.blog_categories.name}
                </Badge>
              </Link>
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
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />
        </div>

        {/* Prev/Next Navigation */}
        {(prevPost || nextPost) && (
          <div className="max-w-4xl mx-auto mt-8 grid grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="group flex items-center gap-2 p-4 bg-card rounded-lg shadow-sm hover:shadow transition-shadow"
              >
                <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Previous</p>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">{prevPost.title}</p>
                </div>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="group flex items-center justify-end gap-2 p-4 bg-card rounded-lg shadow-sm hover:shadow transition-shadow text-right"
              >
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Next</p>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">{nextPost.title}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0" />
              </Link>
            ) : <div />}
          </div>
        )}

        {/* Related Articles */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12">
            <h2 className="font-heading text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.slug}`}
                  className="group bg-card rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                >
                  {related.featured_image ? (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={related.featured_image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted" />
                  )}
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {related.title}
                    </h3>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {related.published_at ? new Date(related.published_at).toLocaleDateString() : ""}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BlogPost;
