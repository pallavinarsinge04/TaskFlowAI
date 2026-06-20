const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const http = require("http");

// Load Environment Variables
dotenv.config();

// Database Connection
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const aiRoutes = require("./routes/aiRoutes");
const commentRoutes = require("./routes/commentRoutes");
const projectRoutes = require("./routes/projectRoutes");

// Socket
const { initSocket } = require("./socket/socket");

// Connect Database
connectDB();

const app = express();
const server = http.createServer(app);

// ======================
// Middlewares
// ======================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// ======================
// Routes
// ======================

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/comments", commentRoutes);

app.use("/api/projects", projectRoutes);

// ======================
// Home Route
// ======================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 TaskFlow AI Backend Running Successfully",
  });
});

// ======================
// Health Check
// ======================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Healthy",
  });
});

// ======================
// 404 Handler
// ======================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ======================
// Socket.io Initialization
// ======================

initSocket(server);

// ======================
// Start Server
// ======================
const notificationRoutes = require("./routes/notificationRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const PORT = process.env.PORT || 5000;
const teamRoutes = require("./routes/teamRoutes");
const calendarRoutes = require("./routes/calendarRoutes");
const commentRoutes = require("./routes/commentRoutes");
const attachmentRoutes = require("./routes/attachmentRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const searchRoutes = require("./routes/searchRoutes");
const passwordRoutes = require(
  "./routes/passwordRoutes"
);

app.use(
  "/api/password",
  passwordRoutes
);
app.use("/api/search", searchRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/attachments", attachmentRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/calendar", calendarRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/notifications", notificationRoutes);
server.listen(PORT, () => {
  console.log("=================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("=================================");
});