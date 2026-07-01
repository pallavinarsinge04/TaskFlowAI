import express from "express";

import {
getNotifications,
markRead
}
from "../controllers/notificationController.js";

const router=express.Router();

router.get("/",getNotifications);

router.put("/:id",markRead);

export default router;