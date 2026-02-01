

# Plan: Add Limassol Marina Section to Yacht Agency Page

## Overview
Enhance the Yacht Agency page with a dedicated Limassol Marina section using the uploaded aerial photo and information extracted from the official marina documentation.

---

## Content from Official Documents

Based on the Limassol Marina Superyacht Destination brochure:

**Key Description:**
> "Limassol Marina is an exciting new superyacht destination in the Mediterranean. Visitors and berth holders benefit from an unrivalled combination of service, facilities and technical support. Designed by a world-renowned team of architects and engineers, it combines elegant residences and a full service marina with an enticing mix of restaurants and shops, to create a lifestyle uniquely shaped by 'living on the sea'."

**Blue Flag Marina Status** - Port of Entry

**Marina Facilities:**
- Spa and Fitness Club
- Travel Lift
- Car Park  
- Fuel Station
- Yacht Club
- Harbour Master / Port Authority / Information Desk
- Toilet and Shower Facilities
- Slipway
- Shopping and Dining
- Helipad
- Boatyard
- Chandlery
- Cultural Centre

**Residential Areas:**
- Nireas, Dioni, Thetis, Nereids, Castle Residences
- Peninsula Villas
- Island Villas

---

## Implementation Steps

### Step 1: Copy Marina Image to Assets
Copy the uploaded aerial photo to the project assets folder:
- **Source**: `user-uploads://LImassol_Marina_Shoham_Cyprus.webp`
- **Destination**: `src/assets/limassol-marina.webp`

### Step 2: Update PortAgencySectionPage Component

Modify `src/pages/port-agency/PortAgencySectionPage.tsx` to:

1. Import the Limassol Marina image
2. Add a `LimassolMarinaSection` component that displays:
   - The marina aerial photo with caption
   - Blue Flag Marina badge/indicator
   - The official description from the brochure
   - Facilities grid showing all marina amenities

### Component Structure

```text
+--------------------------------------------------+
|  Limassol Marina (heading)                       |
|  Blue Flag Marina | Port of Entry                |
+--------------------------------------------------+
|                                                  |
|  [Aerial Photo of Marina]                        |
|  Caption: Limassol Marina - Cyprus               |
|                                                  |
+--------------------------------------------------+
|  Description paragraph from official brochure    |
+--------------------------------------------------+
|  Marina Facilities (2-3 column grid):            |
|  - Spa & Fitness Club    - Fuel Station          |
|  - Travel Lift           - Yacht Club            |
|  - Harbour Master        - Helipad               |
|  - Shower Facilities     - Boatyard              |
|  - Shopping & Dining     - Chandlery             |
|  - Slipway               - Car Park              |
+--------------------------------------------------+
```

---

## Files to Modify

| File | Change |
|------|--------|
| `src/assets/limassol-marina.webp` | New file - copy uploaded image |
| `src/pages/port-agency/PortAgencySectionPage.tsx` | Add Limassol Marina section for yacht-agency |

---

## Technical Details

### New Component: LimassolMarinaSection

```tsx
const LimassolMarinaSection = () => {
  const facilities = [
    "Spa & Fitness Club",
    "Travel Lift", 
    "Fuel Station",
    "Yacht Club",
    "Harbour Master",
    "Shower Facilities",
    "Shopping & Dining",
    "Helipad",
    "Boatyard",
    "Chandlery",
    "Slipway",
    "Car Park"
  ];
  
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="font-heading font-semibold text-xl">
          Limassol Marina
        </h3>
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
          Blue Flag Marina
        </span>
        <span className="bg-primary text-white text-xs px-2 py-1 rounded">
          Port of Entry
        </span>
      </div>
      
      <img 
        src={limassolMarinaImg} 
        alt="Limassol Marina aerial view"
        className="w-full rounded-lg shadow-lg mb-4"
      />
      
      <p className="text-muted-foreground mb-6">
        Limassol Marina is an exciting superyacht destination in the 
        Mediterranean. Visitors and berth holders benefit from an 
        unrivalled combination of service, facilities and technical 
        support. Designed by a world-renowned team of architects and 
        engineers, it combines elegant residences and a full service 
        marina with an enticing mix of restaurants and shops.
      </p>
      
      <h4 className="font-semibold mb-3">Marina Facilities</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {facilities.map((facility) => (
          <div key={facility} className="flex items-center gap-2 
               bg-secondary p-2 rounded text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            {facility}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Conditional Rendering
The marina section will only appear when `section === "yacht-agency"`, placed between the Overview and "Services We Provide" sections.

