import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      max: 500,
    },
    image: {
      type: String,
      max: 50,
    },
    picturePath: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("post", PostSchema);
export default Post;
//create & export a model -user and its schema is userSchema
