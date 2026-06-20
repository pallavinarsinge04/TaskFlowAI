const express = require("express");

const router = express.Router();

const {
  searchTasks,
} = require("../controllers/searchController");

router.get("/", searchTasks);

module.exports = router;