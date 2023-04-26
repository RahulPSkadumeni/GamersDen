import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    userName: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    status: {
      type: Boolean,
      default: true,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      ref: "users",
      default: [],
    },

    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
    },

    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },

  { timestamps: true } //automatic data when it created updated etc//
);

const User = mongoose.model("users", UserSchema);

export default User;
