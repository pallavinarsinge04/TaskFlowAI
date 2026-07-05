import express from "express";
import { chatWithAI, getHistory } from "../controllers/aiController.js";

const router = express.Router();

router.post("/chat", chatWithAI);

router.get("/history/:userId", getHistory);

export default router;