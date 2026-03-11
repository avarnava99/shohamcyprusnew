import type { VercelRequest, VercelResponse } from "@vercel/node";

const DEFAULT_TITLE = "Shoham Shipping & Logistics | Cyprus Shipping and Forwarding Agency";
const DEFAULT_DESCRIPTION =
  "Leading shipping agency in Cyprus offering port agency, freight forwarding, customs clearing, ZIM container services, and comprehensive maritime solutions.";

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || "https://yobppwbtiqzsplifrtoz.supabase.co";
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";

// Static page metadata
const STATIC_PAGES: Record<string, { title: string; description: string }> = {
  "": { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  "about-us": {
    title: "About Us | Shoham Shipping & Logistics",
    description:
      "Shipping and freight forwarding agent in Cyprus since 1951. Over 60 staff members serving all major ports.",
  },
  services: {
    title: "Our Services | Shoham Shipping & Logistics",
    description:
      "Comprehensive shipping and logistics solutions: freight forwarding, customs clearing, haulage, air freight, car shipping, and more.",
  },
  "contact-us": {
    title: "Contact Us | Shoham Shipping & Logistics",
    description:
      "Get in touch with Shoham Shipping & Logistics. Phone: +357-25-208700. Limassol, Cyprus.",
  },
  quote: {
    title: "Request A Quote | Shoham Shipping & Logistics",
    description:
      "Get competitive rates for shipping, freight forwarding, customs clearing, and logistics services in Cyprus.",
  },
  blog: {
    title: "News & Blog | Shoham Shipping & Logistics",
    description:
      "Latest news from the shipping and logistics industry in Cyprus.",
  },
  "zim-agency-in-cyprus": {
    title: "ZIM Agency in Cyprus | Shoham Shipping & Logistics",
    description:
      "Official representative of ZIM Integrated Shipping Services Ltd in Cyprus.",
  },
  "port-agency": {
    title: "Port Agency | Shoham Shipping & Logistics",
    description:
      "Ship agency for Limassol, Larnaca, Vassiliko ports and oil terminals.",
  },
  chartering: {
    title: "Chartering | Shoham Shipping & Logistics",
    description:
      "Full and part vessel chartering for cargo. Extensive network of fleet owners.",
  },
  "project-cargo": {
    title: "Project Cargo | Shoham Shipping & Logistics",
    description:
      "Complex logistics projects across Cyprus - heavy lift operations, transformer transport, offshore support.",
  },
  "container-types": {
    title: "Container Types | Shoham Shipping & Logistics",
    description:
      "Complete specifications for 20ft, 40ft, reefer, open top and flat rack shipping containers.",
  },
  "travel-agency": {
    title: "Travel Agency | Shoham Shipping & Logistics",
    description:
      "IATA authorized travel agent in Cyprus. Flight bookings, hotel reservations.",
  },
  "container-homes": {
    title: "Container Homes in Cyprus | Shoham Shipping & Logistics",
    description: "Affordable container homes fully furnished.",
  },
  "services/freight-forwarding": {
    title: "Freight Forwarding Cyprus | Shoham Shipping & Logistics",
    description:
      "Professional freight forwarding services in Cyprus for imports and exports.",
  },
  "services/car-shipping-from-uk-to-cyprus": {
    title: "Car Shipping from UK to Cyprus | Shoham Shipping & Logistics",
    description:
      "Ship your car from the UK to Cyprus with reliable vehicle shipping services.",
  },
  "services/air-freight-cyprus": {
    title: "Air Freight Cyprus | Shoham Shipping & Logistics",
    description:
      "Express air freight services for time-sensitive cargo to and from Cyprus.",
  },
  "services/parcel-forwarding": {
    title: "Parcel Forwarding to Cyprus | Shoham Shipping & Logistics",
    description:
      "Forward online purchases from Amazon, eBay from UK and USA to Cyprus.",
  },
  "services/used-containers": {
    title: "Shipping Containers for Sale in Cyprus | Shoham",
    description:
      "Buy new and used shipping containers in Cyprus. 20ft and 40ft containers available.",
  },
  "frequently-asked-questions": {
    title: "FAQ | Shoham Shipping & Logistics",
    description:
      "Frequently asked questions about shipping, freight forwarding, and logistics services in Cyprus.",
  },
};

function getSiteUrl(req: VercelRequest): string {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host =
    req.headers["x-forwarded-host"] || req.headers.host || "shohamcyprusnew.vercel.app";
  return `${proto}://${host}`;
}

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildHtml(
  title: string,
  description: string,
  url: string,
  image: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${esc(url)}">
  <meta property="og:image" content="${esc(image)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Shoham Shipping &amp; Logistics">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${esc(image)}">
  <link rel="canonical" href="${esc(url)}">
</head>
<body>
  <h1>${esc(title)}</h1>
  <p>${esc(description)}</p>
  <a href="${esc(url)}">Visit page</a>
</body>
</html>`;
}

async function fetchBlogPost(
  slug: string,
  defaultImage: string
): Promise<{ title: string; description: string; image: string } | null> {
  if (!SUPABASE_KEY) return null;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(
        slug
      )}&published=eq.true&select=title,excerpt,featured_image`,
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
      image: post.featured_image || defaultImage,
    };
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const siteUrl = getSiteUrl(req);
  const defaultImage = `${siteUrl}/og-image.png`;

  // Path comes as query param from vercel.json rewrite: /api/og?path=blog/some-slug
  const rawPath = (req.query.path as string) || "";
  const path = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  const pathWithoutSlash = rawPath.replace(/^\//, "");
  const fullUrl = `${siteUrl}${path}`;

  let title = DEFAULT_TITLE;
  let description = DEFAULT_DESCRIPTION;
  let image = defaultImage;

  // Check static pages
  if (STATIC_PAGES[pathWithoutSlash] !== undefined) {
    title = STATIC_PAGES[pathWithoutSlash].title;
    description = STATIC_PAGES[pathWithoutSlash].description;
  }
  // Blog posts — fetch from Supabase
  else if (pathWithoutSlash.startsWith("blog/")) {
    const slug = pathWithoutSlash.replace("blog/", "");
    if (slug) {
      const post = await fetchBlogPost(slug, defaultImage);
      if (post) {
        title = post.title;
        description = post.description;
        image = post.image;
      }
    }
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
  return res.status(200).send(buildHtml(title, description, fullUrl, image));
}
