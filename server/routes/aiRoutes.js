const express = require("express");
const router = express.Router();

router.post("/suggest", (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({
      success: false,
      message: "Task is required",
    });
  }

  let priority = "Low";

  if (task.toLowerCase().includes("bug")) {
    priority = "High";
  } else if (
    task.toLowerCase().includes("api") ||
    task.toLowerCase().includes("backend")
  ) {
    priority = "Medium";
  } else if (
    task.toLowerCase().includes("urgent") ||
    task.toLowerCase().includes("fix")
  ) {
    priority = "High";
  }

  res.json({
    success: true,
    suggestion: priority,
  });
});

module.exports = router;