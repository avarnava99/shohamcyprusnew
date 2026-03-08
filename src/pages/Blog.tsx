import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ArrowRight, Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const POSTS_PER_PAGE = 12;

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySlug = searchParams.get("category") || "";
  const searchQuery = searchParams.get("q") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [localSearch, setLocalSearch] = useState(searchQuery);

  const { data: categories } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("id, name, slug")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, published_at, featured_image, category_id, blog_categories(name, slug)")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    let result = posts;

    if (categorySlug) {
      result = result.filter(
        (p) => p.blog_categories && p.blog_categories.slug === categorySlug
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(q))
      );
    }

    return result;
  }, [posts, categorySlug, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  );

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    // Reset page when filters change unless explicitly setting page
    if (!("page" in updates)) params.delete("page");
    setSearchParams(params);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ q: localSearch });
  };

  const handleCategoryClick = (slug: string) => {
    updateParams({ category: slug === categorySlug ? "" : slug });
  };

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page <= 1) params.delete("page");
    else params.set("page", String(page));
    setSearchParams(params);
  };

  const renderPageNumbers = () => {
    const items = [];
    const maxVisible = 5;
    let start = Math.max(1, safePage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

    if (start > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink onClick={() => setPage(1)}>1</PaginationLink>
        </PaginationItem>
      );
      if (start > 2) items.push(<PaginationItem key="e1"><PaginationEllipsis /></PaginationItem>);
    }

    for (let i = start; i <= end; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={i === safePage} onClick={() => setPage(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) items.push(<PaginationItem key="e2"><PaginationEllipsis /></PaginationItem>);
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => setPage(totalPages)}>{totalPages}</PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Layout>
      <SEO title="News & Blog" description="Latest news from the shipping and logistics industry in Cyprus." path="/blog" />
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
        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <form onSubmit={handleSearch} className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10"
            />
          </form>

          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={!categorySlug ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleCategoryClick("")}
              >
                All
              </Badge>
              {categories.map((cat) => (
                <Badge
                  key={cat.id}
                  variant={categorySlug === cat.slug ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleCategoryClick(cat.slug)}
                >
                  {cat.name}
                </Badge>
              ))}
            </div>
          )}

          {(searchQuery || categorySlug) && (
            <p className="text-sm text-muted-foreground">
              {filteredPosts.length} result{filteredPosts.length !== 1 ? "s" : ""} found
              {searchQuery && <> for "<strong>{searchQuery}</strong>"</>}
              {categorySlug && categories && (
                <> in <strong>{categories.find(c => c.slug === categorySlug)?.name}</strong></>
              )}
            </p>
          )}
        </div>

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
        ) : paginatedPosts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map((post) => (
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
                        loading="lazy"
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

            {totalPages > 1 && (
              <div className="mt-10">
                <Pagination>
                  <PaginationContent>
                    {safePage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious onClick={() => setPage(safePage - 1)} />
                      </PaginationItem>
                    )}
                    {renderPageNumbers()}
                    {safePage < totalPages && (
                      <PaginationItem>
                        <PaginationNext onClick={() => setPage(safePage + 1)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery || categorySlug
                ? "No articles match your search. Try adjusting your filters."
                : "No blog posts available yet."}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
