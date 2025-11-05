// app/mainPage/MapComponent.tsx
"use client";
// import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

export default function MapComponent() {
  const center: LatLngExpression = [20.5937, 78.9629];
  return (
    <MapContainer center={center} zoom={5} className="w-full h-full z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
