const express = require("express");

const router = express.Router();

const {
  getComments,
  addComment,
} = require("../controllers/commentController");

router.get("/:taskId", getComments);

router.post("/", addComment);

module.exports = router;