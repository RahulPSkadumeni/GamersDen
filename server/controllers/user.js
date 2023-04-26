import User from "../models/User.js";

import express from "express";
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
import Post from "../models/Post.js";

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

export const updateUser = async (req, res) => {
  console.log("here>>>>>> 1");
  // if (req.body.userId === req.params.id || req.body.isAdmin) {
  //   if (req.body.password) {
  //     try {
  //       const salt = await bcrypt.genSalt(10);
  //       req.body.password = await bcrypt.hash(req.body.password, salt);
  //     } catch {
  //       return res.status(500).json(err);
  //     }
  //   }
  console.log(">>>>2");
  console.log(req.file);
  const file = req.file;
  const des = req.body;
  console.log(file);
  const buffer = await sharp(req.file.buffer)
    .resize({
      height: 500,
      width: 500,
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
  req.body.picturePath = image;
  console.log("req.body.picturePath", req.body.picturePath);
  const command = new PutObjectCommand(uploadParams);

  await s3Client.send(command);

  try {
    console.log("params", req.params.id);
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("account has been updated");
  } catch {}
  // }
  //  else {
  //   return res.status(403).json("you can  update only your account");
  // }
};

export const updateUserStatus = async (req, res) => {
  try {
    console.log(">>>>>>>>>>>>>>>>>>>", req.body);
    console.log(">>>>>>>>>>>>??>>>>>>>", req.params.id);
    const { status } = req.body;
    console.log(status);
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: { status },
    });
    console.log(user);
    // const updatedUser = await User.find();
    // console.log("?????????", updatedUser);
    // res.status(200).json(updatedUser);
    res.status(200).json("status updated");
  } catch {}
};

export const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(300).json("account has been deleted");
      console.log("account deleted");
    } catch {}
  } else {
    return res.status(403).json("you can delete only  your account");
  }
};

export const findUser = async (req, res) => {
  console.log("find user>>>>>>>>");
  try {
    console.log(req.params.id);
    console.log(
      ">>>>>>>>>>>SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS>>>>>>>>"
    );
    const user = await User.findById(req.params.id);

    console.log(user);
    if (user.picturePath) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: user.picturePath,
      };
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>HHHHHHHHHH<<<<<<<<<<<<<<<<<");
      const command = new GetObjectCommand(getObjectParams);

      const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<");
      console.log("<<<<<<<<<<<<<<<", url);
      user.picturePath = url;
      console.log(">>>>>>>>>>>>>>>", user);
    }

    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

export const follow = async (req, res) => {
  console.log(req.body.userId);
  console.log(req.params.id);
  if (req.body.userId !== req.params.id) {
    console.log("not match");

    try {
      const user = await User.findById(req.params.id);

      const currentUser = await User.findById(req.body.userId);
      console.log(user); //user we want to follow
      const currentUserName = currentUser.userName;

      if (!user.followers.includes(req.body.userId)) {
        console.log("going to update");
        await user.updateOne({
          $push: { followers: req.body.userId },
        });
        console.log(user.followers);

        await currentUser.updateOne({
          $push: { followings: req.params.id },
        });
        // console.log(req.body.userId);
        // await currentUser.updateOne({ $push: { followings: req.params.id } });
        // await currentUser.updateOne({ $push: { followings: req.params.id } });
        console.log("started to follow " + currentUserName);
        res.status(200).json("started to follow ");
        console.log(user.followings);
      } else {
        res.status(403).json("already following");

        console.log("already following");
      }
    } catch (err) {
      return res.status(500).json(err);
      console.log(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};

export const getUser = async (req, res) => {
  const userId = req.query.userId;
  const userName = req.query.userName;
  try {
    console.log(req.params.id);
    const user = userId
      ? await User.findById(req.params.id)
      : await User.findOne({ userName: userName });
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

export const addRemoveFriend = async (req, res) => {
  console.log("haiii");
  try {
    const { id, friendId } = req.params;
    console.log(id, friendId);
    const user = await User.findById(id);

    const friend = await User.findById(friendId);
    console.log(user, friend);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id != friendId);
      friend.friends = friend.friends.filter((id) => id != id);
    } else {
      console.log("haiNNNNNNN");
      // user.friends.push(friendId);
      // friend.friends.push(id);
      await user.updateOne({
        $push: { friends: friendId },
      });
      await friend.updateOne({
        $push: { friends: id },
      });
    }
    await user.save;
    await friend.save;
    const friends = await Promise.all(
      await user.friends.map((id) => User.findById(id))
    );
    res.status(200).json(friends);
  } catch (error) {
    res.status(404).json(error);
  }
};

// export const getUserFriends = async (req, res) => {
//   console.log("get user friends");
//   const { id } = req.params;
//   const user = await User.findById(id).populate("friends", "-password");
//   console.log("user>>>>>>>>>", user);
//   try {
//     const friends = await user.friends.map((id) => User.findById(id));

//     // console.log("friends", friends);
//     res.status(200).json(user.friends);
//   } catch (error) {
//     res.status(404).json(error);
//   }
// };

export const getUserFriends = async (req, res) => {
  console.log("get user friends");
  const { id } = req.params;
  const user = await User.findById(id).populate("friends", "-password");
  console.log("user>>>>>>>>>", user);
  try {
    //??>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const friends = await user.friends.map(async (id) => {
      const friend = User.findById(id);
      if (friend.picturePath) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: friend.picturePath,
        };
        const command = new GetObjectCommand(getObjectParams);

        const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<");
        console.log("<<<<<<<<<<<<<<<", url);
        friend.picturePath = url;
      }

      // console.log(">>>>>>>>>>>>>>>", post);
    });

    // console.log("friends", friends);
    res.status(200).json(user.friends);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const allUser = async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error);
  }
};
export const allPost = async (req, res) => {
  console.log(
    "JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ"
  );
  try {
    const userPosts = await Post.find().sort({
      createdAt: -1,
    });
    console.log("userPosts", userPosts);
    // const friendPosts = await Promise.all(
    //   currentUser.friends.map((friendId) => {
    //     console.log(friendId);
    //     return Post.find({ userId: friendId }).sort({ createdAt: -1 });
    //   })
    // );

    const posts = userPosts;
    // .concat(...friendPosts);
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
  } catch (error) {
    res.status(500).json(error);
  }
};
export const suggestedUser = async (req, res) => {
  try {
    console.log(req.params.userId);
    const currentUser = await User.findById(req.params.userId);
    const allUsers = await User.find({}).select("-password");
    let suggestedUsers = await allUsers.filter((user) => {
      return (
        !currentUser.friends.includes(user._id) &&
        user._id.toString() !== currentUser._id.toString()
      );
    });

    if (suggestedUsers.length > 5) {
      suggestedUsers = suggestedUsers.slice(0, 5);
    }
    console.log(suggestedUsers);
    res.status(200).json(suggestedUsers);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const print = async (req, res) => {
  console.log("here");
};

export const updatePassword = async (req, res) => {
  const ph = req.params;
  console.log("here>>>>>> 1");
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      console.log(req.body.password);
    } catch {
      return res.status(500).json(err);
    }
  }
  console.log(">>>>2", req.body.password);

  try {
    console.log(ph);
    console.log("hereeeeeeeeeeeeeeeeeee");

    const user = await User.findOne({ phoneNumber: ph.ph });
    console.log("hereee");
    console.log("user", user);
    user.password = req.body.password;
    // const user = await User.findByIdAndUpdate(req.params.id, {
    //   $set: req.body,
    // });
    console.log(user.password);
    console.log(">>>>", req.body.password);
    await user.save();
    console.log("KKKKKKKKK", user);
    res.status(300).json("account password has been updated");
  } catch {}
  // }
  //  else {
  //   return res.status(403).json("you can  update only your account");
  // }
};
