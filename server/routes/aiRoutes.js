import express from "express";
import {
  chat,
  vision,
  getHistory,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/chat", chat);
router.post("/vision", vision);
router.get("/history/:userId", getHistory);

export default router;