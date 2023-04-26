import express from "express";

import {
  createGroup,
  GetAllGroup,
  JoinAGroup,
  leaveGroup,
  createNewPost,
  getAllPost,
  deletePost,
  userGroup,
  GetGroup,
} from "../controllers/GroupController.js";

import { createPost, like } from "../controllers/post.js";
import { allTimeline } from "../controllers/post.js";
import multer from "multer";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Group from "../models/GroupModel.js";
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

router.post("/create/:id", upload.single("avatar"), async (req, res) => {
  console.log("here>>>>>> 1", req.body);

  console.log(">>>>2", req.body.groupName, req.body.description);
  console.log(">>>>2", req.file);
  const file = req.file;
  const des = req.body;
  console.log(file);
  if (req.file.buffer) {
    const buffer = await sharp(req.file.buffer)
      .resize({
        height: 300,
        width: 300,
        fit: "cover",
      })
      .toBuffer();

    console.log(3);
    console.log(des);
    console.log(">>>>>>>JJJJJJJ>>");
    const image = randomImageName();
    console.log(">>>>>>>>>", image, file);
    const uploadParams = {
      Bucket: bucketName,
      Body: buffer,
      Key: image,
      ContentType: req.file.mimetype,
    };
    req.body.avatar = image;
    console.log("req.body.avatar", req.body.avatar);
    const command = new PutObjectCommand(uploadParams);

    await s3Client.send(command);
  }
  //>>>>>
  if (!req.body.groupName) {
    console.log("no body groupName");
    return res.status(400).json({ message: "groupName is required" });
  }

  const userId = req.params.id;
  console.log(req.body);
  try {
    const newGroup = await Group.create({
      groupName: req.body.groupName,
      description: req.body.description,
      admin: userId,
      avatar: req.body.avatar,
      // replace with the ObjectId of the user who will be the admin
    });

    // Add the admin as a member of the group
    await newGroup.members.push(userId);

    // Save the group to the database
    await newGroup.save();

    res.status(200).json("group created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/allgroup/:id", GetAllGroup);
router.get("/userGroup/:id", userGroup);

router.post("/join/:id", JoinAGroup);
router.post("/leave/:id", leaveGroup);

router.post("/:groupId/createpost", createNewPost);

router.delete("/:postId/deletePost", deletePost);
router.get("/:groupId/posts", getAllPost);
router.get("/groupDetails/:groupId", GetGroup);
export default router;
