const express = require("express");

const router = express.Router();

const {
  getNotifications,
  createNotification,
  markRead,
} = require("../controllers/notificationController");

router.get("/", getNotifications);

router.post("/", createNotification);

router.put("/:id", markRead);

module.exports = router;