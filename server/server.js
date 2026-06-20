const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");

dotenv.config();

// Database
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const aiRoutes = require("./routes/aiRoutes");

// Connect MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let onlineUsers = 0;

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  onlineUsers++;

  io.emit("onlineUsers", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers--;

    io.emit("onlineUsers", onlineUsers);

    console.log("User Disconnected");
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("receiveMessage", data);
  });

  socket.on("typing", (room) => {
    socket.to(room).emit("userTyping");
  });
});

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);

// Home
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 TaskFlow AI Backend Running",
  });
});

// Health
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Healthy",
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});