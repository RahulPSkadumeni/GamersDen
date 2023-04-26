import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
const router = express.Router();

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  AbortMultipartUploadCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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

router.get("all", async (req, res) => {
  try {
    console.log("success");
  } catch (error) {
    console.log("post not found");
    res.status(500).json(error);
  }
});

router.post("/searchAll", async (req, res) => {
  console.log(
    "JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ"
  );
  try {
    console.log(req.body);
    const { searchTerm } = req.body;
    const regex = /`${req.body.searchTerm}`/i;
    const userPosts = await Post.find({
      des: { $regex: searchTerm },
    }).sort({
      createdAt: -1,
    });
    console.log(userPosts);

    const posts = userPosts;

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
      post.image = url;
      console.log(">>>>>>>>>>>>>>>", post);
    }

    //?? search user
    const users = await User.find({
      firstName: { $regex: searchTerm },
    }).sort({
      createdAt: -1,
    });
    console.log(users);

    // const posts = userPosts;
    const response = {
      posts: userPosts,
      users: users,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
