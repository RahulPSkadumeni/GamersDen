import express from "express";
import {
  createChat,
  userChats,
  findChat,
} from "../controllers/ChatController.js";
const router = express.Router();

//create message
// router.post("/msg", async (req, res) => {
//   const { from, to, message } = req.body;
//   try {
//     const newMessage = await Message.create({
//       message: message,
//       Chatuser: [{ from, to }],
//       Sender: from,
//     });
//     return res.status(200).json(newMessage);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// router.get("/get/chat/msg/:user1Id/:user2Id", async (req, res) => {
//   const from = req.params.user1Id;
//   const to = req.params.user2Id;
//   console.log("here", from, to);
//   try {
//     const newMessage = await Message.find({
//       Chatuser: $all[{ from, to }],
//     })
//       .sort({ updatedAt: -1 })
//       .lean();

//     console.log(newMessage);

//     const allMessage = newMessage.map((msg) => {
//       return {
//         myself: msg.Sender.toString() == from,
//         message: msg.message,
//       };
//     });
//     return res.status(200).json(allMessage);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

//create message
router.post("/", createChat);
router.get("/:userId", userChats);
router.get("/find/:firstId/:secondId", findChat);

export default router;
