import express from "express";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();


// All notification routes require authentication
router.use(authenticateUser);


// Get notifications
router.get("/", getNotifications);


// Mark one notification as read
router.put("/:id/read", markNotificationAsRead);


// Mark all notifications as read
router.put("/read-all", markAllNotificationsAsRead);


// Delete notification
router.delete("/:id", deleteNotification);


export default router;