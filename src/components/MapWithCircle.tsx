"use client";

import React, { useEffect, useRef } from "react";

interface MapWithCircleProps {
  center: { lat: number; lng: number };
  radius: number; // meters
}

const MapWithCircle: React.FC<MapWithCircleProps> = ({ center, radius }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ✅ ensure client-side only
    if (typeof window === "undefined") return;
    // ✅ ensure google maps is loaded
    if (!(window as any).google || !(window as any).google.maps) return;
    if (!mapRef.current) return;

    const map = new (window as any).google.maps.Map(mapRef.current, {
      center,
      zoom: 12,
    });

    new (window as any).google.maps.Circle({
      map,
      center,
      radius,
      fillColor: "#EA580C",
      fillOpacity: 0.2,
      strokeColor: "#EA580C",
      strokeOpacity: 0.35,
      strokeWeight: 2,
    });
  }, [center, radius]);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default MapWithCircle;
