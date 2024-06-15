import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [ // this is an array
      {
        // referencing
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [ // this too
      {
        // referencing
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
    // the timestamps will automatically create createdAt and updatedAt fields
  },
  { timestamps: true },
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;