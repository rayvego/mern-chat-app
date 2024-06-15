import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    // we have to receiver's id in the url itself and the sender's id in the request object
    // if the user is not authenticated, then the protectRoute middleware will not let the request reach here
    // since the user is authenticated, we can get the sender's id from the request object otherwise user would be null
    const { id: receiverId } = req.params;
    // message will be sent from the useSendMessage hook and the MessageInput component in the frontend
    const { message } = req.body;
    const senderId = req.user._id;

    // we have to check if a conversation already exists between the sender and receiver
    // if it does not exist, then we have to create a new conversation
    // otherwise we add the message to the existing conversation
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId], // find all conversations where both sender and receiver are participants
      },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
      await conversation.save();
    }

    // creating a message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      // this will run one after another
      // await newMessage.save()
      // await conversation.save()

      // this will run in parallel
      await Promise.all([newMessage.save(), conversation.save()]);
    } else {
      return res.status(400).json({ error: "Message could not be sent" });
    }

    // socket stuff will go here
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage); // sends event to a specific client
    }

    // the useSendMessage expects a response with the following structure
    res.json({
      receiverId: receiverId,
      message: newMessage.message,
      senderId: senderId,
      _id: newMessage._id,
    });
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    // again, we get the receiver's id from the url and the sender's id from the request object
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    // first trying to find a conversation between the sender and receiver
    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate("messages");

    // if not, then return an empty array, meaning no messages
    if (!conversation) {
      return res.status(200).json([]);
    }

    // otherwise send the messages
    // sending messages to the useGetMessages hook in the frontend
    res.status(200).json(conversation.messages);

    // btw, we are sending these messages to the useGetMessages hook in the frontend
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};