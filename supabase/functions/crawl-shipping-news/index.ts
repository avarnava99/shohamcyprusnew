import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const NEWS_SOURCES = [
  { id: "splash247", url: "https://splash247.com", name: "Splash247" },
  { id: "hellenicshippingnews", url: "https://www.hellenicshippingnews.com", name: "Hellenic Shipping News" },
  { id: "seatrade", url: "https://www.seatrade-maritime.com/news", name: "Seatrade Maritime" },
  { id: "tradewinds", url: "https://www.tradewindsnews.com", name: "TradeWinds" },
];

const MAX_ARTICLES_PER_RUN = 3;

interface ArticleLink {
  url: string;
  title: string;
  source: typeof NEWS_SOURCES[number];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

  if (!FIRECRAWL_API_KEY) {
    return new Response(JSON.stringify({ error: "FIRECRAWL_API_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (!LOVABLE_API_KEY) {
    return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    const results: string[] = [];
    let totalPublished = 0;

    // Step 1: Scrape each source for article links
    const allArticles: ArticleLink[] = [];

    for (const source of NEWS_SOURCES) {
      try {
        console.log(`Scraping ${source.name}...`);
        const scrapeResp = await fetch("https://api.firecrawl.dev/v1/scrape", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: source.url,
            formats: ["links", "markdown"],
            onlyMainContent: true,
          }),
        });

        const scrapeData = await scrapeResp.json();
        if (!scrapeResp.ok) {
          console.error(`Failed to scrape ${source.name}:`, scrapeData);
          results.push(`❌ ${source.name}: scrape failed`);
          continue;
        }

        // Extract article links from the scraped page
        const links: string[] = scrapeData.data?.links || scrapeData.links || [];
        const markdown: string = scrapeData.data?.markdown || scrapeData.markdown || "";

        // Use AI to extract article URLs and titles from the scraped content
        const extractResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-lite",
            messages: [
              {
                role: "user",
                content: `From this shipping news page content, extract up to 5 recent article URLs and their titles. Only include actual news articles (not category pages, about pages, etc). The page is from ${source.name} (${source.url}).

Available links on the page:
${links.slice(0, 100).join("\n")}

Page content (first 3000 chars):
${markdown.slice(0, 3000)}

Return ONLY a JSON array like: [{"url": "https://...", "title": "Article title"}]
No other text.`,
              },
            ],
            tools: [
              {
                type: "function",
                function: {
                  name: "extract_articles",
                  description: "Extract article URLs and titles from a news page",
                  parameters: {
                    type: "object",
                    properties: {
                      articles: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            url: { type: "string" },
                            title: { type: "string" },
                          },
                          required: ["url", "title"],
                          additionalProperties: false,
                        },
                      },
                    },
                    required: ["articles"],
                    additionalProperties: false,
                  },
                },
              },
            ],
            tool_choice: { type: "function", function: { name: "extract_articles" } },
          }),
        });

        if (!extractResp.ok) {
          const errText = await extractResp.text();
          console.error(`AI extract failed for ${source.name}:`, errText);
          results.push(`❌ ${source.name}: AI extraction failed`);
          continue;
        }

        const extractData = await extractResp.json();
        const toolCall = extractData.choices?.[0]?.message?.tool_calls?.[0];
        let articles: { url: string; title: string }[] = [];
        
        if (toolCall?.function?.arguments) {
          try {
            const parsed = JSON.parse(toolCall.function.arguments);
            articles = parsed.articles || [];
          } catch {
            console.error(`Failed to parse AI output for ${source.name}`);
          }
        }

        for (const a of articles) {
          allArticles.push({ url: a.url, title: a.title, source });
        }
        results.push(`✅ ${source.name}: found ${articles.length} articles`);
      } catch (e) {
        console.error(`Error processing ${source.name}:`, e);
        results.push(`❌ ${source.name}: ${e instanceof Error ? e.message : "unknown error"}`);
      }
    }

    console.log(`Total articles found: ${allArticles.length}`);

    // Step 2: Deduplicate against existing posts
    const urls = allArticles.map((a) => a.url);
    const { data: existingPosts } = await supabase
      .from("blog_posts")
      .select("source_url")
      .in("source_url", urls);

    const existingUrls = new Set((existingPosts || []).map((p: any) => p.source_url));
    const newArticles = allArticles.filter((a) => !existingUrls.has(a.url));
    console.log(`New articles after dedup: ${newArticles.length}`);

    // Step 3: Process up to MAX_ARTICLES_PER_RUN
    const toProcess = newArticles.slice(0, MAX_ARTICLES_PER_RUN);

    for (const article of toProcess) {
      try {
        console.log(`Processing: ${article.title}`);

        // 3a: Scrape full article
        const articleResp = await fetch("https://api.firecrawl.dev/v1/scrape", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: article.url,
            formats: ["markdown"],
            onlyMainContent: true,
          }),
        });

        const articleData = await articleResp.json();
        if (!articleResp.ok) {
          console.error(`Failed to scrape article ${article.url}:`, articleData);
          continue;
        }

        const articleContent = articleData.data?.markdown || articleData.markdown || "";
        if (!articleContent || articleContent.length < 100) {
          console.log(`Skipping ${article.url}: content too short`);
          continue;
        }

        // 3b: Rewrite with AI
        const rewriteResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [
              {
                role: "system",
                content: `You are a professional maritime news writer for Shoham Shipping & Logistics, a leading shipping agency in Cyprus. Rewrite news articles in a professional, informative tone suitable for the maritime industry audience. The content should be original and not a direct copy.`,
              },
              {
                role: "user",
                content: `Rewrite the following shipping news article. Create:
1. A new engaging title (50-80 chars)
2. An excerpt/summary (1-2 sentences, max 160 chars)
3. The full article in HTML format (300-500 words, use <p>, <h2>, <h3>, <ul>, <li> tags)
4. A slug (lowercase, hyphens, no special chars)
5. A category suggestion from: shipping-news, port-updates, maritime-industry, trade-logistics, vessel-operations

Original article:
${articleContent.slice(0, 4000)}`,
              },
            ],
            tools: [
              {
                type: "function",
                function: {
                  name: "create_blog_post",
                  description: "Create a rewritten blog post",
                  parameters: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      excerpt: { type: "string" },
                      content: { type: "string" },
                      slug: { type: "string" },
                      category: { type: "string" },
                      image_prompt: {
                        type: "string",
                        description: "A prompt to generate a featured image for this article. Should describe a realistic maritime/shipping scene related to the article topic. Max 100 words.",
                      },
                    },
                    required: ["title", "excerpt", "content", "slug", "category", "image_prompt"],
                    additionalProperties: false,
                  },
                },
              },
            ],
            tool_choice: { type: "function", function: { name: "create_blog_post" } },
          }),
        });

        if (!rewriteResp.ok) {
          const errText = await rewriteResp.text();
          console.error(`AI rewrite failed:`, errText);
          continue;
        }

        const rewriteData = await rewriteResp.json();
        const rewriteCall = rewriteData.choices?.[0]?.message?.tool_calls?.[0];
        if (!rewriteCall?.function?.arguments) {
          console.error("No rewrite tool call result");
          continue;
        }

        let post: {
          title: string;
          excerpt: string;
          content: string;
          slug: string;
          category: string;
          image_prompt: string;
        };
        try {
          post = JSON.parse(rewriteCall.function.arguments);
        } catch {
          console.error("Failed to parse rewrite output");
          continue;
        }

        // Ensure unique slug
        const timestamp = Date.now().toString(36);
        const finalSlug = `${post.slug}-${timestamp}`;

        // 3c: Generate featured image
        let featuredImageUrl: string | null = null;
        try {
          const imageResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash-image",
              messages: [
                {
                  role: "user",
                  content: `Generate a professional, photorealistic image for a shipping industry blog article. ${post.image_prompt}. The image should look like a professional photograph, with good lighting and composition. Do not include any text or watermarks in the image.`,
                },
              ],
              modalities: ["image", "text"],
            }),
          });

          if (imageResp.ok) {
            const imageData = await imageResp.json();
            const base64Image = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

            if (base64Image) {
              // Extract base64 data and upload to storage
              const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
              const imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
              const fileName = `ai-news/${finalSlug}.png`;

              const { error: uploadError } = await supabase.storage
                .from("blog-images")
                .upload(fileName, imageBytes, {
                  contentType: "image/png",
                  upsert: true,
                });

              if (uploadError) {
                console.error("Image upload error:", uploadError);
              } else {
                const { data: publicUrl } = supabase.storage.from("blog-images").getPublicUrl(fileName);
                featuredImageUrl = publicUrl.publicUrl;
              }
            }
          } else {
            const errText = await imageResp.text();
            console.error("Image generation failed:", errText);
          }
        } catch (imgErr) {
          console.error("Image generation error:", imgErr);
        }

        // 3d: Find or create category
        let categoryId: string | null = null;
        const { data: existingCat } = await supabase
          .from("blog_categories")
          .select("id")
          .eq("slug", post.category)
          .maybeSingle();

        if (existingCat) {
          categoryId = existingCat.id;
        } else {
          const categoryName = post.category
            .split("-")
            .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
          const { data: newCat } = await supabase
            .from("blog_categories")
            .insert({ name: categoryName, slug: post.category })
            .select("id")
            .single();
          if (newCat) categoryId = newCat.id;
        }

        // 3e: Insert blog post
        const { error: insertError } = await supabase.from("blog_posts").insert({
          title: post.title,
          slug: finalSlug,
          excerpt: post.excerpt,
          content: post.content,
          featured_image: featuredImageUrl,
          category_id: categoryId,
          published: true,
          published_at: new Date().toISOString(),
          source_url: article.url,
          source_site: article.source.id,
          is_ai_generated: true,
        });

        if (insertError) {
          console.error("Insert error:", insertError);
          results.push(`❌ Failed to publish: ${post.title}`);
        } else {
          totalPublished++;
          results.push(`✅ Published: ${post.title}`);
          console.log(`Published: ${post.title}`);
        }
      } catch (articleErr) {
        console.error(`Error processing article ${article.url}:`, articleErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        totalFound: allArticles.length,
        newArticles: newArticles.length,
        processed: toProcess.length,
        published: totalPublished,
        details: results,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Crawl error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
