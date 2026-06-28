import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

app.use(cors());
app.use(express.json());

// HTTP SERVER (IMPORTANT)
const server = http.createServer(app);

// SOCKET SERVER
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend Working");
});

// 🔥 IMPORTANT: USE server.listen (NOT app.listen)
server.listen(5000, () => {
  console.log("Server running on 5000");
});