import Notification from "../models/Notification.js";
import { getIO } from "../config/socket.js";

export const sendNotification = async (userId, message, type = "info") => {
  const notification = await Notification.create({
    userId,
    message,
    type,
  });

  const io = getIO();

  // 🔥 REAL TIME SEND
  io.to(userId).emit("notification", notification);

  return notification;
};