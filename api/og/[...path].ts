import type { VercelRequest, VercelResponse } from "@vercel/node";

const SITE_URL = "https://www.shoham.com.cy";
const DEFAULT_TITLE = "Shoham Shipping & Logistics | Cyprus Shipping and Forwarding Agency";
const DEFAULT_DESCRIPTION = "Leading shipping agency in Cyprus offering port agency, freight forwarding, customs clearing, ZIM container services, and comprehensive maritime solutions.";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://yobppwbtiqzsplifrtoz.supabase.co";
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";

// Social media bot user agents
const BOT_USER_AGENTS = [
  "facebookexternalhit",
  "Facebot",
  "Twitterbot",
  "LinkedInBot",
  "Slackbot",
  "WhatsApp",
  "TelegramBot",
  "Discordbot",
  "Pinterest",
  "Googlebot",
];

// Static page metadata mapping
const STATIC_PAGES: Record<string, { title: string; description: string }> = {
  "/": { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  "/about-us": { title: "About Us | Shoham Shipping & Logistics", description: "Shipping and freight forwarding agent in Cyprus since 1951. Over 60 staff members serving all major ports." },
  "/services": { title: "Our Services | Shoham Shipping & Logistics", description: "Comprehensive shipping and logistics solutions: freight forwarding, customs clearing, haulage, air freight, car shipping, and more." },
  "/contact-us": { title: "Contact Us | Shoham Shipping & Logistics", description: "Get in touch with Shoham Shipping & Logistics. Phone: +357-25-208700. Limassol, Cyprus." },
  "/quote": { title: "Request A Quote | Shoham Shipping & Logistics", description: "Get competitive rates for shipping, freight forwarding, customs clearing, and logistics services in Cyprus." },
  "/blog": { title: "News & Blog | Shoham Shipping & Logistics", description: "Latest news from the shipping and logistics industry in Cyprus." },
  "/zim-agency-in-cyprus": { title: "ZIM Agency in Cyprus | Shoham Shipping & Logistics", description: "Official representative of ZIM Integrated Shipping Services Ltd in Cyprus." },
  "/port-agency": { title: "Port Agency | Shoham Shipping & Logistics", description: "Ship agency for Limassol, Larnaca, Vassiliko ports and oil terminals." },
  "/chartering": { title: "Chartering | Shoham Shipping & Logistics", description: "Full and part vessel chartering for cargo. Extensive network of fleet owners." },
  "/project-cargo": { title: "Project Cargo | Shoham Shipping & Logistics", description: "Complex logistics projects across Cyprus - heavy lift operations, transformer transport, offshore support." },
  "/container-types": { title: "Container Types | Shoham Shipping & Logistics", description: "Complete specifications for 20ft, 40ft, reefer, open top and flat rack shipping containers." },
  "/travel-agency": { title: "Travel Agency | Shoham Shipping & Logistics", description: "IATA authorized travel agent in Cyprus. Flight bookings, hotel reservations." },
  "/container-homes": { title: "Container Homes in Cyprus | Shoham Shipping & Logistics", description: "Affordable container homes for €78,000 fully furnished." },
  "/services/freight-forwarding": { title: "Freight Forwarding Cyprus | Shoham Shipping & Logistics", description: "Professional freight forwarding services in Cyprus for imports and exports." },
  "/services/car-shipping-from-uk-to-cyprus": { title: "Car Shipping from UK to Cyprus | Shoham Shipping & Logistics", description: "Ship your car from the UK to Cyprus with reliable vehicle shipping services." },
  "/services/air-freight-cyprus": { title: "Air Freight Cyprus | Shoham Shipping & Logistics", description: "Express air freight services for time-sensitive cargo to and from Cyprus." },
  "/services/parcel-forwarding": { title: "Parcel Forwarding to Cyprus | Shoham Shipping & Logistics", description: "Forward online purchases from Amazon, eBay from UK and USA to Cyprus." },
  "/services/used-containers": { title: "Shipping Containers for Sale in Cyprus | Shoham", description: "Buy new and used shipping containers in Cyprus. 20ft and 40ft containers available." },
  "/frequently-asked-questions": { title: "FAQ | Shoham Shipping & Logistics", description: "Frequently asked questions about shipping, freight forwarding, and logistics services in Cyprus." },
};

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some((bot) => ua.includes(bot.toLowerCase()));
}

function buildHtml(title: string, description: string, url: string, image: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(url)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="og:site_name" content="Shoham Shipping & Logistics">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">
  <link rel="canonical" href="${escapeHtml(url)}">
</head>
<body>
  <p>${escapeHtml(description)}</p>
  <a href="${escapeHtml(url)}">Visit ${escapeHtml(title)}</a>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function fetchBlogPost(slug: string): Promise<{ title: string; description: string; image: string } | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=title,excerpt,featured_image`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || data.length === 0) return null;
    const post = data[0];
    return {
      title: `${post.title} | Shoham Shipping & Logistics`,
      description: post.excerpt || DEFAULT_DESCRIPTION,
      image: post.featured_image || DEFAULT_IMAGE,
    };
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const userAgent = req.headers["user-agent"] || "";

  // Only intercept bot requests
  if (!isBot(userAgent)) {
    // Let Vercel serve the SPA for normal users
    res.setHeader("x-middleware-rewrite", "/index.html");
    res.status(200).end();
    return;
  }

  const path = "/" + ((req.query.path as string[]) || []).join("/");
  const fullUrl = `${SITE_URL}${path}`;
  let title = DEFAULT_TITLE;
  let description = DEFAULT_DESCRIPTION;
  let image = DEFAULT_IMAGE;

  // Check static pages first
  if (STATIC_PAGES[path]) {
    title = STATIC_PAGES[path].title;
    description = STATIC_PAGES[path].description;
  }
  // Check blog post
  else if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    const post = await fetchBlogPost(slug);
    if (post) {
      title = post.title;
      description = post.description;
      image = post.image;
    }
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(buildHtml(title, description, fullUrl, image));
}
