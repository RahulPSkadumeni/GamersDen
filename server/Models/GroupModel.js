import mongoose from "mongoose";
const { Schema } = mongoose;

const groupSchema = new Schema({
  groupName: { type: String, required: true, unique: true },
  description: { type: String },
  picturePath: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
  avatar: {
    type: String, // URL of the avatar image
  },
});

const GroupModel = mongoose.model("Group", groupSchema);
export default GroupModel;
