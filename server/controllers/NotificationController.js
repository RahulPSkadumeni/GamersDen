import { authMiddleware } from "../middleware/authorization.js";
import Notification from "../models/NotificationModel.js";
import User from "../models/User.js";

export const all = async (req, res) => {
  console.log("ALL NOTIIFICATIONS");
  const userId = req.body.userId;
  try {
    const notifications = await Notification.find({ user2: userId });
    console.log(notifications);
    res.json(notifications);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const unread = async (req, res) => {
  console.log("ALL NOTIIFICATIONS");
  const userId = req.body.userId;
  try {
    const notifications = await Notification.find({
      user2: userId,
      read: { $not: { $eq: true } },
    });
    console.log(notifications);
    res.json(notifications);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const read = async (req, res) => {
  console.log("read here----------------", req.body.userId);
  try {
    const update = await Notification.updateMany(
      { user2: req.body.userId },
      { read: true }
    );

    const notifications = await Notification.find({ user2: req.body.userId });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new notification
export const follow = async (req, res) => {
  console.log("here notification creation");
  console.log(req.body);
  const userId = req.body.userId;
  try {
    const user = await User.findById(req.params.id);
    const followingUser = await User.findById(userId);
    console.log("follow", followingUser);
    const notification = new Notification({
      user: req.userId,
      user2: req.params.id,

      message: `${followingUser.userName} started following you `,
    });
    await notification.save();
    res.status(200).json("notification created");
  } catch (error) {
    console.log(error.message);
  }
};

export const FollowWithAuth = [authMiddleware, follow];
export const AllWithAuth = [authMiddleware, all];
export const AllWithUnread = [authMiddleware, unread];
