const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const http = require("http");

// Load environment variables
dotenv.config();

// Database
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const aiRoutes = require("./routes/aiRoutes");
const commentRoutes = require("./routes/commentRoutes");

// Socket
const { initSocket } = require("./socket/socket");

// Connect MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// =========================
// Middlewares
// =========================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// =========================
// API Routes
// =========================

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/comments", commentRoutes);

// =========================
// Root Route
// =========================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 TaskFlow AI Backend Running Successfully",
  });
});

// =========================
// Health Check
// =========================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Healthy",
    server: "Running",
  });
});

// =========================
// 404 Route
// =========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =========================
// Initialize Socket.io
// =========================

initSocket(server);

// =========================
// Start Server
// =========================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("=================================");
  console.log(`🚀 Server Running on Port ${PORT}`);
  console.log("🌐 http://localhost:" + PORT);
  console.log("=================================");
});