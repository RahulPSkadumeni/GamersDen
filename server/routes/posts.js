import express from "express";
import { allPost, createPost, like } from "../controllers/post.js";
import { allTimeline } from "../controllers/post.js";
import multer from "multer";
import Post from "../models/Post.js";
import User from "../models/User.js";
import crypto from "crypto";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  AbortMultipartUploadCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import dotenv from "dotenv";
import sharp from "sharp";
import s3Middleware from "../middleware/s3Middleware.js";

dotenv.config();
const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region: region,
});
// const User = require("../Models/User");
const router = express.Router();
// const upload = multer({ dest: "posts/" });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// create post
router.post("/createpost", upload.single("postImg"), async (req, res) => {
  console.log("first????????????????");
  console.log(req.body);
  console.log(req.file);

  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    console.log(savePost);
    res.status(200).json(savePost + " new post created");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/createpostImg", upload.single("image"), async (req, res) => {
  console.log("first>>>>>>>>????????????????");
  let newPost;
  if (req.file) {
    console.log("here file");
    const file = req.file;
    const des = req.body.des;
    const buffer = await sharp(req.file.buffer)
      .resize({
        height: 1080,
        width: 1920,
        fit: "contain",
      })
      .toBuffer();
    // console.log(des);
    const image = randomImageName();
    // console.log(">>>>>>>>>", file);
    const uploadParams = {
      Bucket: bucketName,
      Body: buffer,
      Key: image,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(uploadParams);

    await s3Client.send(command);

    // const newPost = new Post(req.body);
    newPost = new Post({
      des: req.body.des,
      image: image,
      userId: req.body.userId,
      groupId: req.body?.groupId,
    });
  } else {
    console.log("here");
    newPost = new Post({
      des: req.body.des,

      userId: req.body.userId,
      groupId: req.body?.groupId,
    });
  }
  console.log(newPost);
  try {
    const savePost = await newPost.save();
    console.log(savePost);
    res.status(200).json(savePost + " new post created");
  } catch (error) {
    res.status(500).json(error);
  }
});

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
//delete post
router.delete("/delete/:id", async (req, res) => {
  console.log("delete >>>>Post");

  try {
    // console.log(req.params.id);
    console.log(req.body.userId);
    const post = await Post.findById(req.params.id);

    console.log("post");
    console.log(post);
    // console.log(req.body.userId);
    // console.log(post.userId);
    if (post.userId == req.body.userId) {
      // ?? delete from aws

      // key:post.image  that we want to delete from s3

      if (post.image) {
        const deleteParams = {
          Bucket: bucketName,
          Key: post.image,
        };

        const deleteCommand = new DeleteObjectCommand(deleteParams);
        await s3Client.send(deleteCommand);
      }
      console.log("start to delete from atlas");
      await post.deleteOne({ $set: req.body });

      res.status(200).json(post);
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

router.get("/allpost", async (req, res) => {
  console.log(">>>>>>>>>All>Post<<<<<<<<<<<<<<<>>>>>>>>");
});
router.get("/search", async (req, res) => {
  console.log(req.params.id);
  console.log(">>>>>>>>>>profile<<<<<<<<<<<<<<<>>>>>>>>");
});
router.get("/profile/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(">>>>>>>>>>profile<<<<<<<<<<<<<<<>>>>>>>>");
  try {
    // const user = await User.findOne({ _id: req.params.id });
    // console.log(">>>>>>>>>>>>>>>>>>", user);

    const posts = await Post.find({ userId: req.params.id });
    // posts.map((p) => {
    //   console.log(p.image);
    //    getObjectParams = {
    //     Bucket: bucketName,
    //     Key: posts.image,
    //   };
    // });
    if (posts.length > 0) {
      for (const post of posts) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: post.image,
        };
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>HHHHHHHHHH<<<<<<<<<<<<<<<<<");
        const command = new GetObjectCommand(getObjectParams);

        const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<");
        console.log("<<<<<<<<<<<<<<<", url);
        post.picturePath = url;
        console.log(">>>>>>>>>>>>>>>", post);
      }
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/createPosts", async (req, res) => {
  console.log("fsanfj");
  res.json("sdajh");
});

// unlike a post
//get a post
//get all post of following(timeline)

// get post s3 middle

// router.get("/profile/:id", async (req, res) => {
//   console.log(req.params.id);
//   console.log(">>>>>>>>>>>>>>>>>>");
//   try {
//     const posts = await Post.find({ userId: req.params.id });

//     for (const post of posts) {
//       // Apply the s3Middleware function to each post image key
//       req.s3Url = await s3Middleware(
//         { params: { imageKey: post.image } },
//         {},
//         () => {}
//       );
//       console.log("signeeeeeeeee<<<<<<<<<<>>>>>>>>>>eeeeeeeeeeeeeeeed");
//       post.picturePath = req.s3Url;
//     }

//     res.json(posts);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

export default router;
