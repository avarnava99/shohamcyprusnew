import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.shoham.com.cy";
const DEFAULT_TITLE = "Shoham Shipping & Logistics | Cyprus Shipping and Forwarding Agency";
const DEFAULT_DESCRIPTION = "Leading shipping agency in Cyprus offering port agency, freight forwarding, customs clearing, ZIM container services, and comprehensive maritime solutions.";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  jsonLd,
}: SEOProps) => {
  const fullTitle = title ? `${title} | Shoham Shipping & Logistics` : DEFAULT_TITLE;
  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Shoham Shipping & Logistics" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

// Reusable JSON-LD generators
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Shoham Shipping & Logistics",
  alternateName: "Shoham (Cyprus) Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  foundingDate: "1951",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+357-25-208700",
    contactType: "customer service",
    email: "websales@shoham.com.cy",
    areaServed: "CY",
    availableLanguage: ["English", "Greek"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "3 Anexartisias Street",
    addressLocality: "Limassol",
    postalCode: "3600",
    addressCountry: "CY",
  },
  sameAs: [
    "https://www.facebook.com/shohamlogistics",
    "https://www.linkedin.com/company/shohamcyprus",
    "https://www.youtube.com/channel/UCkGO39uqrSFB-fOpmD5B1Rg",
    "https://x.com/shohamcy",
    "https://www.instagram.com/shohamcyprus/",
  ],
};

export const breadcrumbJsonLd = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.url}`,
  })),
});

export const faqJsonLd = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const blogPostJsonLd = (post: {
  title: string;
  slug: string;
  excerpt?: string;
  published_at?: string;
  featured_image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  url: `${SITE_URL}/blog/${post.slug}`,
  ...(post.featured_image && { image: post.featured_image }),
  ...(post.published_at && { datePublished: post.published_at }),
  ...(post.excerpt && { description: post.excerpt }),
  author: {
    "@type": "Organization",
    name: "Shoham Shipping & Logistics",
  },
  publisher: {
    "@type": "Organization",
    name: "Shoham Shipping & Logistics",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.png` },
  },
});

export default SEO;
