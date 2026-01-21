import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LocationPickerProps {
  onLocationSelect: (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  initialLatitude?: number;
  initialLongitude?: number;
}

const getEnvToken = () => {
  const t = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN as string | undefined;
  if (!t) return null;
  // Guard against placeholders like "${MAPBOX_PUBLIC_TOKEN}"
  if (t.includes("${")) return null;
  // Mapbox public tokens usually start with pk.
  if (!t.startsWith("pk.")) return t; // still allow (some accounts use different prefixes)
  return t;
};

const LocationPicker = ({
  onLocationSelect,
  initialLatitude = 34.6823,
  initialLongitude = 33.0464,
}: LocationPickerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string | null>(() => getEnvToken());

  useEffect(() => {
    // If not provided via Vite env, fetch it from backend (still safe: it's a public token).
    if (mapboxToken) return;

    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("mapbox-public-token");
        if (error) throw error;

        const token = (data as any)?.token as string | undefined;
        if (!token) throw new Error("No token returned from mapbox-public-token");

        if (!cancelled) setMapboxToken(token);
      } catch (e) {
        console.warn("Mapbox token fetch failed:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mapboxToken]);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [initialLongitude, initialLatitude],
      zoom: 10,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add click handler
    map.current.on("click", async (e) => {
      const { lng, lat } = e.lngLat;
      placeMarker(lng, lat);
      await reverseGeocode(lng, lat);
    });

    return () => {
      map.current?.remove();
    };
  }, [initialLatitude, initialLongitude, mapboxToken]);

  const placeMarker = (lng: number, lat: number) => {
    if (marker.current) {
      marker.current.setLngLat([lng, lat]);
    } else if (map.current) {
      marker.current = new mapboxgl.Marker({ color: "#F97316", draggable: true })
        .setLngLat([lng, lat])
        .addTo(map.current);

      marker.current.on("dragend", async () => {
        const lngLat = marker.current?.getLngLat();
        if (lngLat) {
          await reverseGeocode(lngLat.lng, lngLat.lat);
        }
      });
    }
  };

  const reverseGeocode = async (lng: number, lat: number) => {
    if (!mapboxToken) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`
      );
      const data = await response.json();

      const address = data.features?.[0]?.place_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      setSelectedAddress(address);

      onLocationSelect({
        latitude: lat,
        longitude: lng,
        address,
      });
    } catch (error) {
      console.error("Geocoding error:", error);
      const address = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      setSelectedAddress(address);
      onLocationSelect({
        latitude: lat,
        longitude: lng,
        address,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!mapboxToken) {
    return (
      <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Map not available</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        ref={mapContainer}
        className="w-full h-64 rounded-lg overflow-hidden border border-input"
      />
      {selectedAddress && (
        <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
          <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Loading address..." : selectedAddress}
          </p>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Click on the map to select your delivery location. You can drag the marker to adjust.
      </p>
    </div>
  );
};

export default LocationPicker;
