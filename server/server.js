import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";

// =========================================
// ROUTES
// =========================================

import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";

// =========================================
// SOCKET.IO
// =========================================

import { initializeSocket } from "./config/socket.js";

// =========================================
// APP INITIALIZATION
// =========================================

const app = express();
const server = http.createServer(app);

// =========================================
// CORS
// =========================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// =========================================
// BODY PARSING
// IMPORTANT: MUST COME BEFORE API ROUTES
// =========================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// =========================================
// HEALTH / ROOT ROUTES
// =========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskFlowAI Backend Running",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskFlowAI API is healthy",
  });
});

// =========================================
// API ROUTES
// =========================================

app.use("/api/auth", authRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/team", teamRoutes);

// =========================================
// 404 HANDLER
// =========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// =========================================
// GLOBAL ERROR HANDLER
// =========================================

app.use((err, req, res, next) => {
  console.error("Global Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message:
      err.message || "Internal server error.",
  });
});

// =========================================
// SOCKET.IO INITIALIZATION
// =========================================

initializeSocket(server);

// =========================================
// SERVER START
// =========================================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});