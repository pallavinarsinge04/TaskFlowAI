import express from "express";

import {

  startTimer,

  stopTimer,

  getEntries

} from "../controllers/timeTrackerController.js";

const router = express.Router();

router.post("/start", startTimer);

router.put("/stop/:id", stopTimer);

router.get("/:userId", getEntries);

export default router;