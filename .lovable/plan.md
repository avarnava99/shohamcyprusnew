
## Plan: Replace ZIM Agency Card Image

### What We'll Do
Replace the current ZIM Agency card image (the older container ship) with the new ZIM LNG vessel image showing "Powered by The Z Factor" branding.

---

### Steps

**Step 1: Copy the New Image to Project Assets**

Copy the uploaded image to the src/assets folder:
- Source: `user-uploads://zim_vessel_lng_shoham_cyprus.webp`
- Destination: `src/assets/zim-lng-vessel.webp`

**Step 2: Update MainServices Component**

Modify `src/components/home/MainServices.tsx`:
- Add a new import for the ZIM LNG vessel image
- Update the ZIM Agency service card to use the new image
- Also update the Chartering card which currently reuses the old ZIM image

```tsx
// Add new import
import zimAgencyImg from "@/assets/zim-lng-vessel.webp";

// Remove or keep old import if still needed elsewhere
// import zimAgencyImg from "@/assets/zim-ship.jpg";
```

---

### Files to Modify

| File | Change |
|------|--------|
| `src/assets/zim-lng-vessel.webp` | New file (copy uploaded image) |
| `src/components/home/MainServices.tsx` | Update import to use new ZIM LNG image |

---

### Result
The ZIM Agency card (and Chartering card which reuses the same image) will display the impressive new ZIM LNG container ship with "Powered by The Z Factor" branding, providing a more modern and branded appearance.
