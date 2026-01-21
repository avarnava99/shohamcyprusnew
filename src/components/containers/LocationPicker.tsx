import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";

interface LocationPickerProps {
  onLocationSelect: (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  initialLatitude?: number;
  initialLongitude?: number;
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN;

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

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

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
  }, [initialLatitude, initialLongitude]);

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
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
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

  if (!MAPBOX_TOKEN) {
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
