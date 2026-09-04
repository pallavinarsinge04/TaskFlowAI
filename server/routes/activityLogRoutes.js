import express from "express";

import { getActivityLogs } from "../controllers/activityLogController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateUser);

router.get("/", getActivityLogs);

export default router;