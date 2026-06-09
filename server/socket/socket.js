let io;

const initSocket = (server) => {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ User Connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("❌ User Disconnected:", socket.id);
    });
  });
};

const getIO = () => io;

module.exports = {
  initSocket,
  getIO,
};

io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://taskflowai.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});