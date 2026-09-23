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

import { getAutomationAnalytics } from "../controllers/aiAutomationAnalyticsController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateUser);

// Project AI
router.get("/project/:projectId/analyze", analyzeProject);
router.get("/project/:projectId/insights", generateProjectInsights);

// AI Task Tools
router.post("/project/:projectId/generate-tasks", generateTasks);
router.post("/project/:projectId/prioritize-tasks", prioritizeTasks);

// AI Planner & Chat
router.post("/daily-plan", generateDailyPlan);
router.post("/chat", chatWithAI);

// AI Project Automation
router.post("/project/:projectId/automate", automateProject);
router.post(
  "/project/:projectId/automate/apply",
  applyAutomationActions
);

// AI Automation Analytics
router.get(
  "/project/:projectId/automation-analytics",
  getAutomationAnalytics
);

export default router;