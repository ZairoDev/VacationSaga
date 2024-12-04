// components/MapWithCircle.tsx
import React, { useEffect, useRef } from 'react';

interface MapWithCircleProps {
  center: { lat: number; lng: number };
  radius: number; // Radius in meters
}

const MapWithCircle: React.FC<MapWithCircleProps> = ({ center, radius }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map, centered at the specified location
    const map = new google.maps.Map(mapRef.current, {
      center,
      zoom: 12,
      // disableDefaultUI: true,  // Hide default map controls
    });

    // Create a circle overlay around the center location
    new google.maps.Circle({
      map,
      center,
      radius,
      fillColor: '#EA580C',    // Circle fill color
      fillOpacity: 0.2,        // Circle transparency
      strokeColor: '#EA580C',  // Circle border color
      strokeOpacity: 0.35,     // Circle border transparency
      strokeWeight: 2,         // Circle border width
    });
  }, [center, radius]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default MapWithCircle;