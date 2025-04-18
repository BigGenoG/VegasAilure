
// src/components/HotelMap.tsx
'use client';
import { useEffect, useRef } from 'react';

interface Hotel {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

interface Props {
  hotels: Hotel[];
}

export default function HotelMap({ hotels }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 36.1147, lng: -115.1728 },
        zoom: 12,
      });

      hotels.forEach((hotel) => {
        new window.google.maps.Marker({
          position: { lat: hotel.lat, lng: hotel.lng },
          map,
          title: hotel.name,
        });
      });
    }
  }, [hotels]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
}
