const express = require("express");

const router = express.Router();

const {
  getUpcomingTasks,
} = require("../controllers/calendarController");

router.get("/", getUpcomingTasks);

module.exports = router;