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

/*
========================================================
AUTHENTICATION
========================================================
*/

router.use(authenticateUser);

/*
========================================================
GET PROJECT MEMBERS
VIEWER + MEMBER + ADMIN + OWNER
========================================================
*/

router.get(
  "/project/:projectId",
  checkProjectPermission("viewer"),
  getProjectMembers
);

/*
========================================================
ADD MEMBER
ADMIN + OWNER
========================================================
*/

router.post(
  "/project/:projectId",
  checkProjectPermission("admin"),
  addTeamMember
);

/*
========================================================
UPDATE MEMBER
ADMIN + OWNER
========================================================
*/

router.put(
  "/:id",
  checkMemberProjectPermission("admin"),
  updateTeamMember
);

/*
========================================================
DELETE MEMBER
ADMIN + OWNER
========================================================
*/

router.delete(
  "/:id",
  checkMemberProjectPermission("admin"),
  deleteTeamMember
);

export default router;