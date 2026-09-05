import "dotenv/config";

import express from "express";
import cors from "cors";
import http from "http";

import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import activityLogRoutes from "./routes/activityLogRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import { initializeSocket } from "./config/socket.js";

const app = express();
const server = http.createServer(app);

// ===============================
// Middleware
// ===============================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// ===============================
// Health Routes
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TaskFlowAI API is running 🚀",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

// ===============================
// API Routes
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/team", teamRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/activity-logs", activityLogRoutes);

app.use("/api/dashboard", dashboardRoutes);

// ===============================
// 404 Handler
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ===============================
// Socket.IO
// ===============================

initializeSocket(server);

// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});