 const socket = io()

// Connect to your Socket.IO server
// change URL if deployed

// Initialize Leaflet map
const map = L.map("map").setView([0, 0], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "OpenStreetMap",
}).addTo(map);

// Marker for your current position
let marker;

// Watch for location updates
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      // Emit location to server
      socket.emit("send-location", { latitude, longitude });

      // Update your marker position
      if (!marker) {
        marker = L.marker([latitude, longitude]).addTo(map);
      } else {
        marker.setLatLng([latitude, longitude]);
      }

      // Center map to your location
      map.setView([latitude, longitude], 13);
    },
    (error) => {
      console.error("Geolocation error:", error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
} else {
  alert("Geolocation is not supported by your browser.");
}

// Listen for other users’ locations
socket.on("receive-location", (data) => {
  console.log("Received location:", data);
  // You can display other users' markers here if needed
});
