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

    /* Join User Room */

    socket.on("joinUser", (userId) => {

      socket.join(userId);

      console.log(`User ${userId} joined room`);

    });

    /* Join Role Room */

    socket.on("joinRole", (role) => {

      socket.join(role);

      console.log(`${socket.id} joined role ${role}`);

    });

    socket.on("disconnect", () => {

      console.log("User Disconnected");

    });

  });

};

export const getIO = () => io;