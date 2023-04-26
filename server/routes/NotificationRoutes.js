import express from "express";
import {
  all,
  read,
  follow,
  FollowWithAuth,
  AllWithAuth,
  AllWithUnread,
} from "../controllers/NotificationController.js";
import { authMiddleware } from "../middleware/authorization.js";
const router = express.Router();
router.post("/all", authMiddleware, all);
router.post("/unread", authMiddleware, AllWithUnread);
router.post("/read/", authMiddleware, read);
router.post("/:id/", FollowWithAuth);

export default router;
