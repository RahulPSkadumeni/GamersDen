import express from "express";
import Group from "../models/GroupModel.js";
import User from "../models/User.js";
import Post from "../models/Post.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { verifyToken } from "../middleware/authorization.js";
import multer from "multer";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import dotenv from "dotenv";
import sharp from "sharp";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Console, log } from "console";

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

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

upload.single("fieldName");
export const createGroup = async (req, res) => {
  if (!req.body.groupName) {
    console.log("no body groupName");
    return res.status(400).json({ message: "groupName is required" });
  }

  try {
    // Check if groupName is present in request body
    if (!req.body.groupName) {
      return res.status(400).json({ message: "groupName is required" });
    }

    const userId = req.params.id;
    const newGroup = await Group.create({
      groupName: req.body.groupName,
      description: req.body.description,
      admin: userId,
    });

    await newGroup.members.push(userId);
    await newGroup.save();

    res.status(200).json("group created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const GetAllGroup = async (req, res) => {
  console.log("get all group");
  const userId = req.params.id;
  console.log(req.params.id);
  async function getAllGroups() {
    try {
      // const updatedGroups = [];
      const groups = await Group.find({ members: { $ne: userId } }).sort({
        groupName: 1,
      });
      console.log(`Found ${groups.length} groups:`);
      console.log(groups);
      // get image
      console.log(">>>>>>>>>>>>>>>?????/{{{{{{}}}}}}>>>>>>>>>>>>>>>>>>>");
      // for (const group of groups) {
      //   console.log("groups IMAGE LINK");
      //   Console.log(group.avatar);
      //   const getObjectParams = {
      //     Bucket: bucketName,
      //     Key: group.avatar,
      //   };
      //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>HHHHHHHHHH<<<<<<<<<<<<<<<<<");
      //   const command = new GetObjectCommand(getObjectParams);

      //   const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
      //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<");
      //   console.log("<<<<<<<<<<<<<<<", url);
      //   group.avatar = url;
      //   updatedGroups.push(group);

      //   console.log(">>>>>>>>>>>>>>>", group);
      // }

      groups.map((group) => {
        console.log("groups IMAGE LINK");
        // Console.log(group.avatar);
        // const getObjectParams = {
        //   Bucket: bucketName,
        //   Key: group.avatar,
        // };
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>HHHHHHHHHH<<<<<<<<<<<<<<<<<");
        // const command = new GetObjectCommand(getObjectParams);

        // // const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<");
        // console.log("<<<<<<<<<<<<<<<", url);
        // group.avatar = url;
        // updatedGroups.push(group);

        console.log(">>>>>>>>>>>>>>>", group);
      });

      res.status(200).json(groups);
    } catch (err) {
      console.error(`Error finding groups: ${err}`);
    }
  }

  getAllGroups();
};

export const GetGroup = async (req, res) => {
  console.log("get One group");
  const groupId = req.params.groupId;
  console.log(req.params.groupId);
  async function getGroup() {
    try {
      // const updatedGroups = [];
      const group = await Group.findById(groupId);

      console.log(group);
      // get image
      console.log(">>>>>>>>>>>>>>>?????/{{{{{{}}}}}}>>>>>>>>>>>>>>>>>>>");

      // groups.map((group) => {
      //   console.log("groups IMAGE LINK");

      //   console.log(">>>>>>>>>>>>>>>", group);
      // });

      res.status(200).json(group);
    } catch (err) {
      console.error(`Error finding groups: ${err}`);
    }
  }

  getGroup();
};

export const userGroup = async (req, res) => {
  console.log("get all group");
  const userId = req.params.id;
  console.log(req.params.id);
  async function getAllGroups() {
    try {
      const updatedGroups = [];
      const groups = await Group.find({ members: userId }).sort({
        groupName: 1,
      });
      console.log(`Found ${groups.length} groups:`);
      console.log(groups);

      for (const group of groups) {
        console.log("groups IMAGE LINK");
        console.log(group.avatar);
        const getObjectParams = {
          Bucket: bucketName,
          Key: group.avatar,
        };
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>HHHHHHHHHH<<<<<<<<<<<<<<<<<");
        const command = new GetObjectCommand(getObjectParams);

        const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<");
        console.log("<<<<<<<<<<<<<<<", url);
        group.avatar = url;
        updatedGroups.push(group);

        console.log(">>>>>>>>>>>>>>>", group);
      }

      res.status(200).json(updatedGroups);
    } catch (err) {
      console.error(`Error finding groups: ${err}`);
    }
  }

  getAllGroups();
};

export const JoinAGroup = async (req, res) => {
  const groupId = req.params.id;

  const userId = req.body.data.userId;

  async function joinGroup(groupId, userId) {
    console.log("NNNNNNNNN", groupId);
    console.log("KKKKKKK", userId);
    try {
      const group = await Group.findById(new mongoose.Types.ObjectId(groupId));
      console.log(group);
      if (!group) {
        console.error(`Group with ID ${groupId} not found`);
        return;
      }

      // Check if user is already a member of the group
      if (group.members.includes(userId)) {
        console.log(`User with ID ${userId} is already a member of the group`);
        return res.status(400).json();
      }

      // Add user to the members
      group.members.push(userId);
      await group.save();

      console.log(
        `User with ID ${userId} has joined the group ${group.groupName}`
      );
    } catch (err) {
      console.error(`Error joining group: ${err}`);
      res.status(500).json(err);
    }
  }

  // Call the joinGroup function with the ID of the group and the ID of the user
  joinGroup(groupId, userId);
};

export const leaveGroup = async (req, res) => {
  const groupId = req.params.id;

  const userId = req.body.userId;
  async function leaveGroup(groupId, userId) {
    try {
      const group = await Group.findById(groupId);
      if (!group) {
        console.error(`Group with ID ${groupId} not found`);
        return;
      }

      // Check if user is a member of the group
      const index = group.members.indexOf(userId);
      if (index === -1) {
        console.log(`User with ID ${userId} is not a member of the group`);
        return res
          .status(404)
          .json(`User with ID ${userId} is not a member of the group`);
      }

      // Remove user from the members list
      group.members.splice(index, 1);
      await group.save();

      console.log(
        `User with ID ${userId} has left the group ${group.groupName}`
      );
      res
        .status(200)
        .json(`User with ID ${userId} has left the group ${group.groupName}`);
    } catch (err) {
      console.error(`Error leaving group: ${err}`);
      res.status(500).json(" error in join group", error);
    }
  }

  // Call the leaveGroup function with the ID of the group and the ID of the user
  leaveGroup(groupId, userId);
};

export const createNewPost = async (req, res) => {
  const { userId, des, image } = req.body;
  const { groupId } = req.params;

  //   const usrId = new mongoose.Types.ObjectId(user);
  //   console.log(user, "user iudddda");
  try {
    // Check if group exists
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    let obj = {
      userId,
      //   user,
      des,
      image,
      groupId,
      likes: [],
    };

    // Create new post
    const post = new Post(obj);
    console.log(post);

    // Save post to database
    await post.save();

    // Add post to group
    group.posts.push(post);
    await group.save();

    return res.status(201).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getAllPost = async (req, res) => {
  console.log(" get all post here");
  const { groupId } = req.params;
  console.log(groupId);
  console.log(groupId);
  try {
    const posts = await Post.find({ groupId })
      .populate("groupId")
      .populate("userId", "-password");
    console.log(posts);

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

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deletePost = async (req, res) => {
  console.log("delete");
  const { postId } = req.params;
  console.log(postId);

  try {
    // Find and delete the post
    const post = await Post.findByIdAndDelete(postId);

    // If post not found, return error
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Return success response
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
