import express from "express";

import {
  getDashboardStats,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/:id", getDashboardStats);

export default router;