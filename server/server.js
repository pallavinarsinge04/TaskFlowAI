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
import notificationRoutes from "./routes/notificationRoutes.js";
import activityLogRoutes from "./routes/activityLogRoutes.js";
// =========================================
// SOCKET.IO
// =========================================

import {
  initializeSocket,
} from "./config/socket.js";

// =========================================
// APP
// =========================================

const app = express();

const server =
  http.createServer(app);

// =========================================
// CORS
// =========================================

app.use(
  cors({
    origin:
      "http://localhost:5173",
    credentials: true,
  })
);

// =========================================
// BODY PARSER
// MUST BE BEFORE API ROUTES
// =========================================

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

// =========================================
// ROOT
// =========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "TaskFlowAI Backend Running",
  });
});

// =========================================
// HEALTH
// =========================================

app.get(
  "/api/health",
  (req, res) => {
    res.status(200).json({
      success: true,
      message:
        "TaskFlowAI API is healthy",
    });
  }
);

// =========================================
// API ROUTES
// =========================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/team",
  teamRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

app.use(
  "/api/activity-logs",
  activityLogRoutes
);

// =========================================
// 404
// =========================================

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message:
        "Route not found",
      path: req.originalUrl,
    });
  }
);

// =========================================
// GLOBAL ERROR HANDLER
// =========================================

app.use(
  (err, req, res, next) => {
    console.error(
      "Global Server Error:",
      err
    );

    res.status(
      err.status || 500
    ).json({
      success: false,
      message:
        err.message ||
        "Internal server error.",
    });
  }
);

// =========================================
// SOCKET.IO
// =========================================

initializeSocket(server);

// =========================================
// START SERVER
// =========================================

const PORT =
  process.env.PORT || 5000;

server.listen(
  PORT,
  () => {
    console.log(
      `🚀 Server running on http://localhost:${PORT}`
    );
  }
);