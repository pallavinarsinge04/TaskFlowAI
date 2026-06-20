const { Server } = require("socket.io");

let io;

const initSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {

    console.log(socket.id);

    socket.on("joinRoom", (room) => {

      socket.join(room);

    });

    socket.on("sendMessage", (data) => {

      io.to(data.room).emit(
        "receiveMessage",
        data
      );

    });

    socket.on("typing", (room) => {

      socket.to(room).emit("userTyping");

    });

  });

};

module.exports = {
  initSocket,
};