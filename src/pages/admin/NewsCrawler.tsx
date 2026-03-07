import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Newspaper, Bot, RefreshCw, ExternalLink, Trash2 } from "lucide-react";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const NewsCrawler = () => {
  const [crawling, setCrawling] = useState(false);
  const [crawlResult, setCrawlResult] = useState<any>(null);

  const { data: aiPosts, isLoading, refetch } = useQuery({
    queryKey: ["ai-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, published, published_at, source_url, source_site, is_ai_generated, featured_image")
        .eq("is_ai_generated", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: stats } = useQuery({
    queryKey: ["ai-blog-stats"],
    queryFn: async () => {
      const { count: totalAi } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true })
        .eq("is_ai_generated", true);
      const { count: publishedAi } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true })
        .eq("is_ai_generated", true)
        .eq("published", true);
      return { total: totalAi || 0, published: publishedAi || 0 };
    },
  });

  const handleCrawl = async () => {
    setCrawling(true);
    setCrawlResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("crawl-shipping-news");
      if (error) throw error;
      setCrawlResult(data);
      toast.success(`Crawl complete: ${data.published} new articles published`);
      refetch();
    } catch (err) {
      console.error("Crawl error:", err);
      toast.error("Crawl failed. Check console for details.");
    } finally {
      setCrawling(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete post");
    } else {
      toast.success("Post deleted");
      refetch();
    }
  };

  const handleTogglePublish = async (id: string, currentPublished: boolean) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({ published: !currentPublished })
      .eq("id", id);
    if (error) {
      toast.error("Failed to update post");
    } else {
      toast.success(currentPublished ? "Post unpublished" : "Post published");
      refetch();
    }
  };

  const sourceLabel: Record<string, string> = {
    splash247: "Splash247",
    hellenicshippingnews: "Hellenic Shipping News",
    seatrade: "Seatrade Maritime",
    tradewinds: "TradeWinds",
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">News Crawler</h1>
            <p className="text-muted-foreground">
              Auto-crawl shipping news, rewrite with AI, and publish to blog
            </p>
          </div>
          <Button onClick={handleCrawl} disabled={crawling} size="lg">
            {crawling ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Crawling...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Run Crawler Now
              </>
            )}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <Bot className="h-4 w-4" /> AI-Generated Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats?.total ?? 0}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <Newspaper className="h-4 w-4" /> Published
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats?.published ?? 0}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Runs Daily At</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">06:00 UTC</p>
            </CardContent>
          </Card>
        </div>

        {/* Crawl Result */}
        {crawlResult && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Latest Crawl Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Found:</span> {crawlResult.totalFound}
                </div>
                <div>
                  <span className="text-muted-foreground">New:</span> {crawlResult.newArticles}
                </div>
                <div>
                  <span className="text-muted-foreground">Processed:</span> {crawlResult.processed}
                </div>
                <div>
                  <span className="text-muted-foreground">Published:</span> {crawlResult.published}
                </div>
              </div>
              {crawlResult.details && (
                <ul className="text-sm space-y-1">
                  {crawlResult.details.map((d: string, i: number) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}

        {/* Posts List */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : !aiPosts?.length ? (
              <p className="text-muted-foreground text-center py-8">
                No AI-generated posts yet. Click "Run Crawler Now" to start.
              </p>
            ) : (
              <div className="space-y-3">
                {aiPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {post.featured_image && (
                        <img
                          src={post.featured_image}
                          alt=""
                          className="h-12 w-16 object-cover rounded"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="font-medium truncate">{post.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {post.source_site && (
                            <Badge variant="outline" className="text-xs">
                              {sourceLabel[post.source_site] || post.source_site}
                            </Badge>
                          )}
                          {post.published_at && (
                            <span>{format(new Date(post.published_at), "MMM d, yyyy")}</span>
                          )}
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {post.source_url && (
                        <a href={post.source_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="icon" title="View source">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTogglePublish(post.id, post.published)}
                      >
                        {post.published ? "Unpublish" : "Publish"}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete post?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete "{post.title}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(post.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default NewsCrawler;
