import express from "express";

import {
  getNotifications,
  createNotification,
  markRead,
  markAllRead,
  deleteNotification,
  deleteAllNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

/* ============================
   GET ALL NOTIFICATIONS
============================ */

router.get("/", getNotifications);

/* ============================
   CREATE NOTIFICATION
============================ */

router.post("/", createNotification);

/* ============================
   MARK SINGLE AS READ
============================ */

router.put("/:id", markRead);

/* ============================
   MARK ALL AS READ
============================ */

router.put("/read-all", markAllRead);

/* ============================
   DELETE ONE
============================ */

router.delete("/:id", deleteNotification);

/* ============================
   DELETE ALL
============================ */

router.delete("/", deleteAllNotifications);

export default router;