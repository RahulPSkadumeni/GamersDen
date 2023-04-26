import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "users",
    //   required: true,
    // },
    des: {
      type: String,
      max: 500,
    },
    image: {
      type: String,
      max: 50,
    },
    groupId: {
      type: String,
    },
    // picturePath: {
    //   type: String,
    // },
    likes: {
      type: Array,
      default: [],
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("post", PostSchema);
export default Post;
//create & export a model -user and its schema is userSchema
