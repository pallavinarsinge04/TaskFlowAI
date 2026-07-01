import express from "express";

import {
  getNotifications,
  createNotification,
  markRead,
  markAllRead,
  deleteNotification,
  deleteAllNotifications,
  archiveNotification
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", getNotifications);

router.post("/", createNotification);

router.put("/read-all", markAllRead);

router.put("/:id", markRead);

router.delete("/:id", deleteNotification);

router.delete("/", deleteAllNotifications);
router.put(
  "/archive/:id",
  archiveNotification
);

export default router;