import express from "express";

import {
  analyzeProject,
  generateProjectInsights,
  generateTasks,
  prioritizeTasks,
  generateDailyPlan,
  chatWithAI,
} from "../controllers/aiController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Authentication for all AI routes
router.use(authenticateUser);

// Project analysis
router.get(
  "/project/:projectId/analyze",
  analyzeProject
);

// Gemini project insights
router.get(
  "/project/:projectId/insights",
  generateProjectInsights
);

// AI task generator
router.post(
  "/project/:projectId/generate-tasks",
  generateTasks
);

// AI task prioritization
router.post(
  "/project/:projectId/prioritize-tasks",
  prioritizeTasks
);

// AI daily planner
router.post(
  "/daily-plan",
  generateDailyPlan
);

// AI chat assistant
router.post(
  "/chat",
  chatWithAI
);

export default router;