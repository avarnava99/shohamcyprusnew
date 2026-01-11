import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY")!;
    
    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch posts without featured images
    const { data: posts, error: fetchError } = await supabase
      .from("blog_posts")
      .select("id, slug, title, excerpt")
      .or("featured_image.is.null,featured_image.eq.")
      .order("published_at", { ascending: false });

    if (fetchError) {
      throw new Error(`Failed to fetch posts: ${fetchError.message}`);
    }

    if (!posts || posts.length === 0) {
      return new Response(
        JSON.stringify({ message: "No posts without featured images found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Found ${posts.length} posts without featured images`);

    const results: { slug: string; success: boolean; imageUrl?: string; error?: string }[] = [];

    for (const post of posts as BlogPost[]) {
      try {
        console.log(`Generating image for: ${post.title}`);

        // Create a prompt based on the post title and excerpt
        const prompt = createImagePrompt(post.title, post.excerpt);

        // Generate image using Lovable AI Gateway
        const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${lovableApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-image-preview",
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
            modalities: ["image", "text"],
          }),
        });

        if (!imageResponse.ok) {
          const errorText = await imageResponse.text();
          console.error(`AI Gateway error for ${post.slug}:`, errorText);
          results.push({ slug: post.slug, success: false, error: `AI Gateway error: ${imageResponse.status}` });
          continue;
        }

        const aiData = await imageResponse.json();
        const imageData = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

        if (!imageData) {
          results.push({ slug: post.slug, success: false, error: "No image generated" });
          continue;
        }

        // Convert base64 to blob
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
        const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        
        const filename = `${post.slug}.png`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(filename, binaryData, {
            contentType: "image/png",
            upsert: true,
          });

        if (uploadError) {
          results.push({ slug: post.slug, success: false, error: uploadError.message });
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("blog-images")
          .getPublicUrl(filename);

        const publicUrl = urlData.publicUrl;

        // Update the blog post with the featured image URL
        const { error: updateError } = await supabase
          .from("blog_posts")
          .update({ featured_image: publicUrl })
          .eq("id", post.id);

        if (updateError) {
          results.push({ slug: post.slug, success: false, error: updateError.message });
          continue;
        }

        results.push({ slug: post.slug, success: true, imageUrl: publicUrl });
        console.log(`Successfully generated and uploaded image for ${post.slug}`);

        // Add a small delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Error processing ${post.slug}:`, errorMessage);
        results.push({ slug: post.slug, success: false, error: errorMessage });
      }
    }

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    return new Response(
      JSON.stringify({
        message: `Processed ${results.length} images: ${successful} successful, ${failed} failed`,
        results,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function createImagePrompt(title: string, excerpt: string | null): string {
  // Determine the category/theme based on keywords
  const lowerTitle = title.toLowerCase();
  const lowerExcerpt = (excerpt || "").toLowerCase();
  const combined = `${lowerTitle} ${lowerExcerpt}`;

  let theme = "";
  let style = "professional, high-quality, photorealistic";

  if (combined.includes("zim") || combined.includes("shipping") || combined.includes("container")) {
    theme = "container ship at sea, shipping containers, maritime logistics";
  } else if (combined.includes("energy") || combined.includes("lng") || combined.includes("gas") || combined.includes("oil") || combined.includes("drill")) {
    theme = "offshore oil platform, energy industry, natural gas facility";
  } else if (combined.includes("port") || combined.includes("limassol") || combined.includes("larnaca")) {
    theme = "Mediterranean port, harbor with ships, Cyprus coastline";
  } else if (combined.includes("marina") || combined.includes("yacht")) {
    theme = "luxury marina, yachts, Mediterranean sailing";
  } else if (combined.includes("car") || combined.includes("vehicle")) {
    theme = "car transport, vehicle shipping, automotive logistics";
  } else if (combined.includes("ferry") || combined.includes("passenger")) {
    theme = "passenger ferry, sea travel, Mediterranean crossing";
  } else if (combined.includes("customs") || combined.includes("freight") || combined.includes("cargo")) {
    theme = "cargo handling, freight logistics, customs clearance";
  } else if (combined.includes("ecommerce") || combined.includes("dropship") || combined.includes("shopify")) {
    theme = "e-commerce warehouse, package delivery, online shopping logistics";
  } else if (combined.includes("blockchain") || combined.includes("digital")) {
    theme = "digital technology, blockchain network, modern logistics technology";
  } else if (combined.includes("crane") || combined.includes("gantry")) {
    theme = "port cranes, container terminal, gantry crane operations";
  } else {
    theme = "maritime industry, shipping and logistics, Mediterranean sea";
  }

  return `Generate a professional 16:9 aspect ratio featured image for a shipping and logistics blog post. 
Title: "${title}"
Theme: ${theme}
Style: ${style}, suitable for a corporate shipping company website, no text or logos in the image, cinematic lighting, high resolution.`;
}
