const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

app.use(express.json());

io.on("connection", (socket) => {

  console.log("User Connected");

  socket.on("disconnect", () => {

    console.log("User Disconnected");

  });

});

app.get("/", (req, res) => {

  res.send("TaskFlow AI Backend Running");

});

server.listen(process.env.PORT, () => {

  console.log("Server Started");

});