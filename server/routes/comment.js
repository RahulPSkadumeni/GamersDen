import express from "express";
import { verifyToken } from "../middleware/authorization.js";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import {
  GetComments,
  GetAComment,
  CreateComment,
  UpdateComment,
  DeleteComment,
  // LikeComment,
} from "../controllers/commentController.js";
const router = express.Router();

// get all comment
router.get("/post/:postId", GetComments);
router.get("/getAcomment/:commentId", GetAComment);
router.post("/createComment/", CreateComment);
router.put("/:commentId", UpdateComment);
router.delete("/delete/:commentId", DeleteComment);

// router.put("/commentLike/:commentId", LikeComment);
//get a comment

export default router;
