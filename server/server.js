import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";

import { initSocket } from "./config/socket.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";

dotenv.config();

// ✅ Create app FIRST
const app = express();
const server = http.createServer(app);

// Socket
initSocket(server);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/calendar", calendarRoutes);

// Start server
server.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});