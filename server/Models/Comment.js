import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    CommentText: {
      type: String,
      required: true,
      min: 4,
    },
    likes: {
      type: Array,
      default: [],
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);
const Comments = mongoose.model("comment", CommentSchema);
export default Comments;
