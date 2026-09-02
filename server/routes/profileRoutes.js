import express from "express";

import { getProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/:id", getProfile);

export default router;