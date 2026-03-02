

# Site Audit: Security, SEO, and Sitemap Issues

Since you already have a live site at **www.shoham.com.cy**, this audit covers what needs attention before/after migration.

---

## CRITICAL: SEO Issues

### 1. No Sitemap (High Priority)
The site has **no sitemap.xml** at all. Google needs this to discover and index all pages efficiently.

**Fix:** Generate a static `public/sitemap.xml` listing all routes (50+ pages), plus dynamic blog post URLs fetched at build time or via an edge function that generates it on the fly.

### 2. No Canonical Tags (High Priority)
No `<link rel="canonical">` tags exist anywhere. This is critical because:
- **Duplicate content risk** between `shohamcyprus.lovable.app` and `www.shoham.com.cy`
- Google may index the staging URL and split ranking signals
- The 60+ redirects can create confusion without canonical signals

**Fix:** Add canonical tags to every page using `react-helmet-async`, pointing to the `www.shoham.com.cy` domain.

### 3. No Per-Page Meta Tags
There's only one set of meta tags in `index.html`. Every page (services, ports, blog posts, etc.) serves the same title/description to Google. This is a major SEO problem for a site with 50+ distinct pages.

**Fix:** Install `react-helmet-async` and add unique `<title>`, `<meta description>`, and Open Graph tags to each page component.

### 4. No Structured Data (Schema.org)
No JSON-LD structured data for:
- Organization/LocalBusiness
- BreadcrumbList
- BlogPosting
- FAQPage

**Fix:** Add JSON-LD scripts via helmet on relevant pages.

### 5. robots.txt Missing Sitemap Reference
The current `robots.txt` allows all crawlers but doesn't reference a sitemap URL.

---

## CRITICAL: Security Issues

### 6. Unsanitized HTML in Blog Posts (High Priority)
`BlogPost.tsx` uses `dangerouslySetInnerHTML` with `post.content` directly from the database with **no sanitization**. If an admin account is compromised, this enables XSS attacks on all visitors.

**Fix:** Install `dompurify` and sanitize content before rendering:
```tsx
import DOMPurify from 'dompurify';
dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
```

### 7. Admin Routes Not Protected at Router Level
Admin pages rely on `AdminLayout` to redirect non-admins, but the check happens client-side after the component mounts. The admin role check queries `user_roles` table -- this is fine with RLS, but the client-side guard has a brief window where the page renders before redirecting.

**Recommendation:** This is acceptable for now since RLS policies properly protect the data. Just be aware that the admin UI itself is briefly visible.

### 8. No Rate Limiting on Auth Forms
Login and Register forms have no client-side rate limiting or CAPTCHA. While the backend has some protection, the forms themselves could be abused.

**Recommendation:** Consider adding reCAPTCHA or similar to the contact, login, and registration forms.

---

## IMPORTANT: Dual-Site Migration Concerns

### 9. Duplicate Indexing Risk (Critical for www.shoham.com.cy)
With both `shohamcyprus.lovable.app` and `www.shoham.com.cy` serving identical content:
- Google will see duplicate content across two domains
- Ranking signals get split between the two
- You could lose existing SEO authority on the old domain

**Fix priorities:**
- Add canonical tags pointing to `www.shoham.com.cy` on every page
- In `robots.txt` on the Lovable staging domain, consider adding `Disallow: /` if it should not be indexed separately
- Alternatively, set up a 301 redirect from the Lovable domain to the custom domain (this happens automatically when you set the custom domain as primary in Lovable)

### 10. Missing hreflang / Language Tags
The site targets Cyprus (English-speaking audience) but has no `hreflang` attribute. Not urgent, but good practice.

---

## Recommended Implementation Plan

### Phase 1 -- Urgent (Security + Critical SEO)
1. **Sanitize blog HTML** with DOMPurify
2. **Install `react-helmet-async`** and add per-page titles, descriptions, and canonical tags
3. **Generate sitemap.xml** (static file or edge function)
4. **Update robots.txt** to reference the sitemap

### Phase 2 -- Important (SEO Enhancement)
5. Add JSON-LD structured data (Organization, BreadcrumbList, BlogPosting, FAQPage)
6. Add Open Graph and Twitter Card meta tags per page
7. Ensure the custom domain is set as primary so the Lovable staging URL redirects to it

### Phase 3 -- Nice to Have
8. Add CAPTCHA to public forms (contact, login, register)
9. Add `hreflang` tags
10. Create a dynamic sitemap edge function that auto-includes new blog posts

---

## Technical Details

| Issue | Severity | Files Affected |
|---|---|---|
| No sitemap.xml | High | New: `public/sitemap.xml` or edge function |
| No canonical tags | High | All page components + `index.html` |
| No per-page meta | High | All ~25 page components |
| Unsanitized HTML | High | `src/pages/BlogPost.tsx` |
| No structured data | Medium | Key pages (home, about, blog, FAQ) |
| Duplicate indexing | High | `robots.txt`, canonical tags, domain config |
| No rate limiting | Low | Login, Register, Contact forms |

