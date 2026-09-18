import express from "express";

import {
  analyzeProject,
  generateProjectInsights,
  generateTasks,
  prioritizeTasks,
  generateDailyPlan,
  chatWithAI,
  automateProject,
   applyAutomationActions,
} from "../controllers/aiController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// ============================================================
// Authentication
// ============================================================

router.use(authenticateUser);

// ============================================================
// Project Analysis
// ============================================================

router.get(
  "/project/:projectId/analyze",
  analyzeProject
);

// ============================================================
// Gemini Project Insights
// ============================================================

router.get(
  "/project/:projectId/insights",
  generateProjectInsights
);

// ============================================================
// AI Task Generator
// ============================================================

router.post(
  "/project/:projectId/generate-tasks",
  generateTasks
);

// ============================================================
// AI Task Prioritization
// ============================================================

router.post(
  "/project/:projectId/prioritize-tasks",
  prioritizeTasks
);

// ============================================================
// AI Daily Planner
// ============================================================

router.post(
  "/daily-plan",
  generateDailyPlan
);

// ============================================================
// AI Chat Assistant
// ============================================================

router.post(
  "/chat",
  chatWithAI
);

// ============================================================
// AI Project Automation
// ============================================================

router.post(
  "/project/:projectId/automate",
  automateProject
);
router.post(
  "/project/:projectId/automate/apply",
  applyAutomationActions
);

export default router;