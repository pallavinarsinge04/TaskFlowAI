import express from "express";

import {
  getProjectMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

import {
  checkProjectPermission,
  checkMemberProjectPermission,
} from "../middleware/teamPermission.js";

const router = express.Router();

// Authentication required for all team routes
router.use(authenticateUser);

// Get project team members
router.get(
  "/project/:projectId",
  checkProjectPermission("viewer"),
  getProjectMembers
);

// Add team member
router.post(
  "/project/:projectId",
  checkProjectPermission("admin"),
  addTeamMember
);

// Update team member
router.put(
  "/:id",
  checkMemberProjectPermission("admin"),
  updateTeamMember
);

// Delete team member
router.delete(
  "/:id",
  checkMemberProjectPermission("admin"),
  deleteTeamMember
);

export default router;