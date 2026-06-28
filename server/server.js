import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

// TEST ROUTE
app.get("/test", (req, res) => {
  res.send("Backend Working");
});

// HTTP SERVER (IMPORTANT)
const server = http.createServer(app);

// SOCKET SETUP
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// START SERVER
server.listen(5000, () => {
  console.log("Server running on 5000");
});