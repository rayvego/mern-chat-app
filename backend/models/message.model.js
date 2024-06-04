import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      // referencing
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      // referencing
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    // the timestamps will automatically create createdAt and updatedAt fields
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);

export default Message;