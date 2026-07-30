import express from "express";
import multer from "multer";

import {
  chat,
  analyzeImage,
  getHistory,
} from "../controllers/aiController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/chat", chat);

router.post(
  "/vision",
  upload.single("image"),
  analyzeImage
);

router.get(
  "/history/:userId",
  getHistory
);

export default router;