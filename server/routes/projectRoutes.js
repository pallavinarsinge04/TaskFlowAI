import express from "express";
import {
  getProjects,
  createProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);

router.post("/", createProject);

// Temporary test route
router.delete("/test", (req, res) => {
  res.send("DELETE route working");
});

// Delete project
router.delete("/:id", deleteProject);

export default router;