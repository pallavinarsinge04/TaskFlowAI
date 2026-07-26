const express = require("express");

const router = express.Router();

const {
  getMessages,
  clearMessages,
} = require("../controllers/chatController");

router.get(
  "/:userId",
  getMessages
);

router.delete(
  "/:userId",
  clearMessages
);

module.exports = router;