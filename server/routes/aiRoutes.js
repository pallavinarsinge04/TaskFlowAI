const express = require("express");

const router = express.Router();

const {
  analyzeTask,
} = require("../controllers/aiController");

router.post("/analyze", analyzeTask);

module.exports = router;