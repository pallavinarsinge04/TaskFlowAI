const express = require("express");

const multer = require("multer");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

const {
  chat,
  analyzeImage,
} = require("../controllers/aiController");

router.post(
  "/chat",
  chat
);

router.post(
  "/vision",
  upload.single("image"),
  analyzeImage
);

module.exports = router;