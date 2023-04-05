// import mongoose from "mongoose";
// const MessageSchema = new mongoose.Schema(
//   {
//     Chatuser: {
//       type: Array,

//       required: true,
//     },
//     message: {
//       type: String,
//       required: true,
//     },

//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       require: true,
//     },
//   },
//   { timestamps: true }
// );

// const Message = mongoose.model("message", MessageSchema);
// export default Message;

import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel;
