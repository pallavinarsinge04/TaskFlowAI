const express = require("express");

const router = express.Router();

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateStatus,
  deleteTask,
} = require("../controllers/taskController");

// Get all tasks
router.get("/", getTasks);

// Get single task
router.get("/:id", getTaskById);

// Create task
router.post("/", createTask);

// Update task
router.put("/:id", updateTask);

// Update task status
router.put("/:id/status", updateStatus);

// Delete task
router.delete("/:id", deleteTask);

module.exports = router;