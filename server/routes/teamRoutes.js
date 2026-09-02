import express from "express";

import {
  getProjectMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamController.js";
import {
  checkProjectPermission,
  checkMemberProjectPermission,
} from "../middleware/teamPermission.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

import {
  checkProjectPermission,
} from "../middleware/teamPermission.js";

const router = express.Router();

// ========================================
// Authentication required for all team API
// ========================================

router.use(authenticateUser);

// ========================================
// Get project members
// Viewer and above
// ========================================

router.get(
  "/project/:projectId",
  checkProjectPermission("viewer"),
  getProjectMembers
);

// ========================================
// Add member
// Admin and owner
// ========================================

router.post(
  "/project/:projectId",
  checkProjectPermission("admin"),
  addTeamMember
);

// ========================================
// Update member
// Admin and owner
// ========================================

router.put(
  "/:id",
  checkMemberProjectPermission("admin"),
  updateTeamMember
);

router.delete(
  "/:id",
  checkMemberProjectPermission("admin"),
  deleteTeamMember
);

export default router;