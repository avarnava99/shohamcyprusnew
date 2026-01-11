import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Map of blog post slugs to their featured image URLs from WordPress
const postFeaturedImages: Record<string, string> = {
  "the-new-cranes-in-limassol": "https://shoham.com.cy/wp-content/uploads/2018/11/new-bigger-gantry-cranes-for-Limassol.jpg",
  "spyker-spyder-exported-from-limassol": "https://shoham.com.cy/wp-content/uploads/2018/12/Spyker-Spider-exported-from-Limassol.jpg",
  "frances-total-may-expand-presence-into-block-8-of-eez": "https://shoham.com.cy/wp-content/uploads/2018/12/frances-total-block-8.jpg",
  "ayia-napa-marina-nearing-completion": "https://shoham.com.cy/wp-content/uploads/2019/05/Ayia-Napa-marina-Cyprus.jpg",
  "eni-total-drillings-officially-on-hold-for-one-year": "https://shoham.com.cy/wp-content/uploads/2020/05/ENI-drilling-cyprus.jpg",
  "20-foot-container-dimensions": "https://shoham.com.cy/wp-content/uploads/2019/08/used-container-to-buy-Cyprus.jpg",
  "larnaca-port-marina-rebuild-gets-final-nod": "https://shoham.com.cy/wp-content/uploads/2020/08/larnaca-fuel-installations.jpg",
  "moni-anchorage": "https://shoham.com.cy/wp-content/uploads/2020/08/moni-anchorage-limassol-cruise-ships.jpg",
  "second-hand-cars-stranded-at-port-as-tax-fraud-scheme-investigated": "https://shoham.com.cy/wp-content/uploads/2020/10/tax-fraud-cars-limassol.jpg",
  "container-shipping-from-cyprus": "https://shoham.com.cy/wp-content/uploads/2020/10/container-shipping-cyprus.jpg",
  "we-work-intensively-on-cyprus-greece-ferry-link": "https://shoham.com.cy/wp-content/uploads/2019/10/cyprus-greece-ferry.jpg",
  "ecommerce-shopify-cyprus-store": "https://shoham.com.cy/wp-content/uploads/2019/10/shopify-cyprus-build-store.jpg",
  "intense-international-interest-in-cyprus-energy-market": "https://shoham.com.cy/wp-content/uploads/2019/10/cyprus-oil-gas-drilling.jpg",
  "first-private-electricity-power-station-in-the-works": "https://shoham.com.cy/wp-content/uploads/2019/09/cyprus-electricity.jpg",
  "multinational-consortium-named-for-cyprus-lng-construction": "https://shoham.com.cy/wp-content/uploads/2019/08/cyprus-lng-terminal.jpg",
  "zim-joins-maersk-blockchain-shipping-platform-tradelens": "https://shoham.com.cy/wp-content/uploads/2019/08/zim-tradelens-blockchain.jpg",
  "cyprus-energy-market-attracts-global-players": "https://shoham.com.cy/wp-content/uploads/2019/11/cyprus-energy-exxon.jpg",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const results: { slug: string; success: boolean; imageUrl?: string; error?: string }[] = [];

    for (const [slug, wpImageUrl] of Object.entries(postFeaturedImages)) {
      try {
        // Fetch the image from WordPress
        console.log(`Fetching image for ${slug}: ${wpImageUrl}`);
        
        const imageResponse = await fetch(wpImageUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; Lovable/1.0)",
          },
        });

        if (!imageResponse.ok) {
          results.push({ slug, success: false, error: `Failed to fetch: ${imageResponse.status}` });
          continue;
        }

        const imageBlob = await imageResponse.blob();
        const contentType = imageResponse.headers.get("content-type") || "image/jpeg";
        
        // Extract filename from URL
        const urlParts = wpImageUrl.split("/");
        const originalFilename = urlParts[urlParts.length - 1];
        const extension = originalFilename.split(".").pop() || "jpg";
        const filename = `${slug}.${extension}`;

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(filename, imageBlob, {
            contentType,
            upsert: true,
          });

        if (uploadError) {
          results.push({ slug, success: false, error: uploadError.message });
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
          .eq("slug", slug);

        if (updateError) {
          results.push({ slug, success: false, error: updateError.message });
          continue;
        }

        results.push({ slug, success: true, imageUrl: publicUrl });
        console.log(`Successfully uploaded and updated ${slug}`);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        results.push({ slug, success: false, error: errorMessage });
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
