
# Add Social Media Links Across the Site

## Overview
Add real social media URLs (Facebook, LinkedIn, YouTube, X/Twitter, Instagram) to the contact constants and update the Footer and TopBar to use them.

## Changes

### 1. Update `src/constants/contact.ts`
Add a `socials` object:
- Facebook: `https://www.facebook.com/shohamlogistics`
- LinkedIn: `https://www.linkedin.com/company/shohamcyprus`
- YouTube: `https://www.youtube.com/channel/UCkGO39uqrSFB-fOpmD5B1Rg`
- X: `https://x.com/shohamcy`
- Instagram: `https://www.instagram.com/shohamcyprus/`

### 2. Update `src/components/layout/Footer.tsx`
- Replace placeholder `href="#"` links with real URLs from `CONTACT.socials`
- Keep Facebook, Twitter (X), LinkedIn, Instagram icons -- add YouTube icon (replace one or add as 5th)
- Add `target="_blank" rel="noopener noreferrer"` to all social links

### 3. Update `src/components/layout/TopBar.tsx`
- Add small social media icons (Facebook, LinkedIn, YouTube, X, Instagram) in the left section alongside phone/email/hours
- Import icons from lucide-react and URLs from `CONTACT.socials`
- Same hover style as existing links
