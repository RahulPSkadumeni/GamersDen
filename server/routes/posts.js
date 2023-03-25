import express from "express";
import { createPost, like } from "../controllers/post.js";
import { allTimeline } from "../controllers/post.js";

import Post from "../models/Post.js";
import User from "../models/User.js";
// const User = require("../Models/User");
const router = express.Router();
// create post
router.post("/createpost", createPost);

// async (req, res) => {
//   console.log("ppost");
//   const newPost = new Post(req.body);
//   try {
//     const savePost = await newPost.save();
//     console.log(savePost);
//     res.status(200).json(savePost + " new post created");
//   } catch (error) {
//     res.status(500).json(error);
//   }
// }

//update post
router.put("/:id", async (req, res) => {
  console.log("update >>>>Post");

  try {
    console.log(req.params.id);
    const post = await Post.findById(req.params.id);
    console.log("post");
    console.log(post);
    console.log(req.body.userId);
    console.log(post.userId);
    if (post.userId == req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("post updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//update post
router.delete("/:id", async (req, res) => {
  console.log("delete >>>>Post");

  try {
    console.log(req.params.id);
    const post = await Post.findById(req.params.id);
    console.log("post");
    console.log(post);
    console.log(req.body.userId);
    console.log(post.userId);
    if (post.userId == req.body.userId) {
      await post.deleteOne({ $set: req.body });
      res.status(200).json("post deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (error) {
    console.log("post not found");
    res.status(500).json(error);
  }
});

//??like & unlike a post
router.put(
  "/:id/like",
  like
  // async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id);

  //     if (!post.likes.includes(req.body.userId)) {
  //       console.log(post);

  //       await post.updateOne({ $push: { likes: req.body.userId } });
  //       res.status(200).json("you liked this post");
  //     } else {
  //       console.log(post);
  //       console.log(req.body.userId);
  //       await post.updateOne({ $pull: { likes: req.body.userId } });
  //       res.status(200).json("you disliked this post");
  //     }
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // }
);

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log("success" + ":  " + post);
    res.status(200).json(post);
  } catch (error) {
    console.log("post not found");
    res.status(500).json(error);
  }
});
// // get all post(Timeline)

router.get("/timeline/:id", allTimeline);

router.get("/profile/:username", async (req, res) => {
  console.log(req.params.username);
  try {
    const user = await User.findOne({ userName: req.params.username });
    console.log(user);
    const posts = await Post.find({ userId: user._id });
    console.log(user);
    res.json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// unlike a post
//get a post
//get all post of following(timeline)

export default router;
