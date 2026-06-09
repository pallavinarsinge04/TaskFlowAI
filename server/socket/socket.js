const { Server } = require("socket.io");

let io;

const initSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://taskflowai.vercel.app",
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  let onlineUsers = 0;

  io.on("connection", (socket) => {

    console.log("🟢 User Connected:", socket.id);

    onlineUsers++;

    io.emit("onlineUsers", onlineUsers);

    socket.on("disconnect", () => {

      console.log("🔴 User Disconnected:", socket.id);

      onlineUsers--;

      io.emit("onlineUsers", onlineUsers);

    });

  });

};

const getIO = () => io;

module.exports = {
  initSocket,
  getIO,
};