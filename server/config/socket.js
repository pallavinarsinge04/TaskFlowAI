import { Server } from "socket.io";

let io;

export const initSocket = (server) => {

  io = new Server(server, {

    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },

  });

  io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    socket.on("disconnect", () => {

      console.log("User Disconnected");

    });

  });

};

export const getIO = () => io;