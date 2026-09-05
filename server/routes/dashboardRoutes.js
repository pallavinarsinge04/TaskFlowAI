import express from "express";

import {
  getDashboardAnalytics,
} from "../controllers/dashboardController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Authentication
router.use(authenticateUser);

// Dashboard analytics
router.get("/analytics", getDashboardAnalytics);

export default router;