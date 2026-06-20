const express = require("express");

const router = express.Router();

const {
  startTimer,
  stopTimer,
  getLogs,
} = require("../controllers/timeController");

router.get("/", getLogs);

router.post("/start", startTimer);

router.put("/stop/:id", stopTimer);

module.exports = router;