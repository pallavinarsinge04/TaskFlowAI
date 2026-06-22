io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  // 👤 USER ONLINE
  socket.on("user-online", (userId) => {
    onlineUsers.set(userId, socket.id);

    io.emit("online-users", Array.from(onlineUsers.keys()));
  });

  // 💬 DISCONNECT
  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);

    for (let [userId, id] of onlineUsers) {
      if (id === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }

    io.emit("online-users", Array.from(onlineUsers.keys()));
  });
});