import express from "express";
import multer from "multer";
import Post from "../models/Post.js";
import User from "../models/User.js";
import crypto from "crypto";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  AbortMultipartUploadCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import dotenv from "dotenv";
import sharp from "sharp";

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

export const createPost = async (req, res) => {
  console.log("first");
  console.log(req.body);
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    console.log(savePost);
    res.status(200).json(savePost + " new post created");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const allTimeline = async (req, res) => {
  console.log("timeline>>");

  console.log("currentUser");
  try {
    const currentUser = await User.findById(req.params.id);

    const userPosts = await Post.find({ userId: currentUser.id }).sort({
      createdAt: -1,
    });

    const friendPosts = await Promise.all(
      currentUser.friends.map((friendId) => {
        // console.log(friendId);
        return Post.find({ userId: friendId }).sort({ createdAt: -1 });
      })
    );
    //??fix sorting problems
    const posts = userPosts.concat(...friendPosts);
    for (const post of posts) {
      if (post.image) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: post.image,
        };
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>HHHHHHHHHH<<<<<<<<<<<<<<<<<");
        const command = new GetObjectCommand(getObjectParams);

        const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<");
        console.log("<<<<<<<<<<<<<<<", url);
        post.image = url;
        console.log(">>>>>>>>>>>>>>>", post);
      }
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};
// export const allTimeline = async (req, res) => {
//   console.log("timeline>>");

//   console.log("currentUser");
//   try {
//     const currentUser = await User.findById(req.params.id);

//     const userPosts = await Post.find({ userId: currentUser.id });

//     const friendPosts = await Promise.all(
//       currentUser.followers.map((friendId) => {
//         // console.log(friendId);
//         return Post.find({ userId: friendId });
//       })
//     );

//     res.json(userPosts.concat(...friendPosts));
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

export const like = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      let postData = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { likes: req.body.userId } },
        { new: true }
      );
      console.log("first", postData);
      if (postData.image) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: postData.image,
        };
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>HHHHHHHHHH<<<<<<<<<<<<<<<<<");
        const command = new GetObjectCommand(getObjectParams);

        const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<");
        console.log("<<<<<<<<<<<<<<<", url);
        postData.image = url;
        console.log(">>>>>>>>>>>>>>>", postData);
      }

      res.status(200).json(postData);
    } else {
      let postData = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { likes: req.body.userId } },
        { new: true }
      );
      if (postData.image) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: postData.image,
        };
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>HHHHHHHHHH<<<<<<<<<<<<<<<<<");
        const command = new GetObjectCommand(getObjectParams);

        const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<");
        console.log("<<<<<<<<<<<<<<<", url);
        postData.image = url;
        console.log(">>>>>>>>>>>>>>>", postData);
      }

      res.status(200).json(postData);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const allPost = async (req, res) => {
  console.log(
    "JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ"
  );
  // try {
  //   const userPosts = await Post.find().sort({
  //     createdAt: -1,
  //   });

  //   const friendPosts = await Promise.all(
  //     currentUser.friends.map((friendId) => {
  //       // console.log(friendId);
  //       return Post.find({ userId: friendId }).sort({ createdAt: -1 });
  //     })
  //   );

  //   const posts = userPosts.concat(...friendPosts);
  //   for (const post of posts) {
  //     const getObjectParams = {
  //       Bucket: bucketName,
  //       Key: post.image,
  //     };
  //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>HHHHHHHHHH<<<<<<<<<<<<<<<<<");
  //     const command = new GetObjectCommand(getObjectParams);

  //     const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<");
  //     console.log("<<<<<<<<<<<<<<<", url);
  //     post.image = url;
  //     console.log(">>>>>>>>>>>>>>>", post);
  //   }

  //   res.json(posts);
  // } catch (error) {
  //   res.status(500).json(error);
  // }
};
