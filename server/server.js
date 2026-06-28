import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express(); // ✅ MUST BE FIRST

app.use(cors());
app.use(express.json());

// AI ROUTES
app.use("/api/ai", aiRoutes);

// HTTP server
const server = http.createServer(app);

// Socket server
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// SOCKET CONNECTION
io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  socket.on("join_project", (projectId) => {
    socket.join(projectId);
  });

  socket.on("task_created", (data) => {
    io.emit("task_created", data);
  });

  socket.on("task_updated", (data) => {
    io.emit("task_updated", data);
  });

  socket.on("task_deleted", (id) => {
    io.emit("task_deleted", id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});