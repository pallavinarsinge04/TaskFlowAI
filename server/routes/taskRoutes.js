const express = require("express");

const router = express.Router();

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// =====================
// GET All Tasks
// =====================

router.get("/", getTasks);

// =====================
// GET Single Task
// =====================

router.get("/:id", getTaskById);

// =====================
// CREATE Task
// =====================

router.post("/", createTask);

// =====================
// UPDATE Task
// =====================

router.put("/:id", updateTask);

// =====================
// DELETE Task
// =====================

router.delete("/:id", deleteTask);

module.exports = router;