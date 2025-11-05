import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Next.js frontend
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Send a test location update every 5 seconds
  setInterval(() => {
    socket.emit("locationUpdate", {
      lat: 28.6139 + Math.random() * 0.01, // mock near Delhi
      lng: 77.2090 + Math.random() * 0.01,
    });
  }, 2000);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.listen(4000, () => {
  console.log("✅ Server running on http://localhost:4000");
});
