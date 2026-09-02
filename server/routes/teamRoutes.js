import express from "express";

import {
  getMembers,
  addMember,
  deleteMember,
} from "../controllers/teamController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Team Routes
|--------------------------------------------------------------------------
*/

// Get team members
router.get("/", getMembers);

// Add team member
router.post("/", addMember);

// Delete team member
router.delete("/:id", deleteMember);

export default router;