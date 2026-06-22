const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); // ✅ FIRST
const onlineUsers = new Map();
const profileRoutes = require("./routes/profileRoutes");
const connectDB = require("./config/db");
connectDB();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use("/api/profile", profileRoutes);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.emit("onlineUsers", 1);

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server Started on 5000");
});