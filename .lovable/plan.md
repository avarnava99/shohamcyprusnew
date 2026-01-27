

## Plan: Replace Hero Image with ZIM Ship Photo

### What We'll Do
Replace the current hero background image with the new ZIM LNG container ship photo you provided.

---

### Steps

**Step 1: Copy the New Image to Project Assets**

Copy the uploaded image to the src/assets folder:
- Source: `user-uploads://zim-sammy-ofer_panama-shoham-cyprus.webp`
- Destination: `src/assets/hero-zim-ship.webp`

**Step 2: Update Hero Component**

Modify `src/components/home/Hero.tsx`:
- Change the import from `hero-shipping.jpg` to `hero-zim-ship.webp`
- Update the alt text to describe the ZIM ship image

```tsx
// Before
import heroImage from "@/assets/hero-shipping.jpg";

// After
import heroImage from "@/assets/hero-zim-ship.webp";
```

Also update the alt text:
```tsx
// Before
alt="Shipping port with cargo containers"

// After
alt="ZIM LNG container ship sailing through Panama Canal"
```

---

### Files to Modify

| File | Change |
|------|--------|
| `src/assets/hero-zim-ship.webp` | New file (copy uploaded image) |
| `src/components/home/Hero.tsx` | Update import and alt text |

---

### Result
The homepage hero will display the impressive ZIM LNG ship image, which better showcases your partnership with ZIM shipping line.

