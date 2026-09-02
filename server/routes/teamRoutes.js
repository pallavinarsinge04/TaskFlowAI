import express from "express";

import {
  searchUsers,
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

router.use(authenticateUser);

/*
========================================================
USER SEARCH
========================================================
*/
router.get(
  "/users/search",
  searchUsers
);

/*
========================================================
PROJECT TEAM
========================================================
*/
router.get(
  "/project/:projectId",
  checkProjectPermission("viewer"),
  getProjectMembers
);

router.post(
  "/project/:projectId",
  checkProjectPermission("admin"),
  addTeamMember
);

/*
========================================================
MEMBER MANAGEMENT
========================================================
*/
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