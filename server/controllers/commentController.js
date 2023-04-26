import express from "express";
import router from "../routes/comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

import Comments from "../models/Comment.js";
import { v4 } from "uuid";

import { authMiddleware } from "../middleware/authorization.js";

export const GetComments = async (req, res) => {
  console.log(" point");
  try {
    console.log(req.params.postId);
    const allcomment = await Comments.find({ post: req.params.postId })
      .populate("user", "-password")
      .populate("post", "-user");

    // const allcomment = await Comments
    //     .find({post: req.params.postId})
    //     .populate("user", '-password')
    //     .populate("post", '-user')
    console.log(allcomment);
    res.status(200).json(allcomment);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const GetAComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const a = await Comments.findById(commentId);
    // .populate(
    //   "user",
    //   "-password"
    // );
    console.log("comment");
    console.log(a);
    console.log("comment");
    res.json(a);
  } catch (error) {
    res.status(500).json("comment not fount" + " " + error.message);
  }
  console.log("hereeeeeeee");
};
// create

export const CreateComment = async (req, res) => {
  console.log("first stage");
  console.log(req.body);
  try {
    // const createdComment=new Comments(req.body)
    // const saveComment=await createdComment.save()

    const createdComment = await (
      await Comments.create({
        ...req.body,
        // User: req.userid,
      })
    ).populate("user", "-password");
    return res.status(201).json(createdComment);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const CreateReplay = async (req, res) => {
  console.log("first stage replay");
  console.log(req.body);
  const { CommentText, userId, commentId } = req.body;
  console.log("JJJJJJJJJJJJJJJJJJJ", userId);
  try {
    // const createdComment=new Comments(req.body)
    // const saveComment=await createdComment.save()
    const comment = await Comments.findById(commentId);
    console.log("comment>>>>", comment);

    const newReply = {
      user: userId,
      commentText: CommentText,
    };
    console.log("newReply", newReply);
    const createdReplay = await comment.replies.push(newReply);
    await comment.save();
    // .populate("user", "-password");
    console.log("CreatedReplay", createdReplay);
    console.log("CCCC", comment);
    return res.status(201).json(createdReplay);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//update
export const UpdateComment = async (req, res) => {
  console.log(req.body);
  try {
    const updatecomment = await Comments.findById(req.params.commentId);
    if (!updatecomment) {
      return res.status(500).json("not found");
    }
    console.log(typeof updatecomment.user);
    console.log(typeof req.body.userId);
    if (updatecomment.user.toString() == req.body.userId.toString()) {
      console.log("her>>>>>>e" + updatecomment.CommentText);

      await updatecomment.updateOne({
        $set: { CommentText: req.body.CommentText },
      });
      return res.status(201).json(" sucessfully updated" + updatecomment);
      //   updatecomment.commentText = req.body.CommentText;
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//delete/
export const DeleteComment = async (req, res) => {
  console.log("delete comment");
  try {
    // const deletecomment = await Comments.findById(req.params.commentId);
    // console.log(deletecomment);
    // console.log(req.body.userId);
    // if (!deletecomment) {
    //   return res.status(404).json("not found");
    // }
    // if (deletecomment.user.toString() == req.body.userid) {
    await Comments.findByIdAndDelete(req.params.commentId);
    res.status(200).json("comment deleted");

    // return res.status(201).json(" failed to delete");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const DeleteReplay = async (req, res) => {
  console.log("delete>>>>>>>>>> replay");
  console.log(req.params.commentId);
  console.log(req.params.replayId);
  const commentId = req.params.commentId;
  const replyId = req.params.replayId;
  try {
    //   // const deletecomment = await Comments.findById(req.params.commentId);
    //   // console.log(deletecomment);
    //   // console.log(req.body.userId);
    //   // if (!deletecomment) {
    //   //   return res.status(404).json("not found");
    //   // }
    //   // if (deletecomment.user.toString() == req.body.userid) {
    let comment = await Comments.findById(commentId);
    console.log(comment);
    await Comments.findByIdAndUpdate(
      commentId,
      {
        $pull: {
          replies: { _id: replyId },
        },
      },
      { new: true }
    );
    console.log(">>>>>>>", comment);
    res.status(200).json("comment deleted");
    //   // return res.status(201).json(" failed to delete");
  } catch (error) {
    res.status(500).json(error.message, "failed ");
  }
};

// export const LikeComment = async (req, res) => {
//   try {
//     const commetId=req.params.commentId
//     const currentUserId = req.body.userId;
//     const commentToLike = await Comments.findById(req.params.commentId);
//     console.log(commentToLike, "commenttolikekkkkkkkkkkk");

//     if (!commentToLike.likes.includes(currentUserId)) {
//       await commentToLike.updateOne({ $push: { likes: currentUserId } });
//       console.log(commentToLike, "aftererrrrrrrrrrrrrrrrrrr");
//       res.status(200).json("you liked this comment");
//       await commentToLike.save();
//     } else {
//       await commentToLike.updateOne(
//         { _id: req.params.commentId },
//         { $pull: { likes: currentUserId } },
//         { new: true }
//       );
//       res.status(200).json("you unliked this comment");
//       await commentToLike.save();
//     }
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };
//like or dislike

export const CreateReplayWithAuth = [authMiddleware, CreateReplay];
