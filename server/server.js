import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";

import connectDB from "./config/db.js";
import { initSocket } from "./config/socket.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// SOCKET INIT
initSocket(server);

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// DB
connectDB();
import notificationRoutes from "./routes/notificationRoutes.js";

app.use(
"/api/notifications",
notificationRoutes
);
// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

server.listen(5000, () => {
  console.log("Server running on 5000");
});