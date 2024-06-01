import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const {id: receiverId} = req.params
        const {message} = req.body
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId] // find all conversations where both sender and receiver are participants
            }
        })

        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, receiverId]
            })
            await conversation.save()
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
            // this will run one after another
            // await newMessage.save()
            // await conversation.save()

            // this will run in parallel
            await Promise.all([newMessage.save(), conversation.save()])
        }

        res.json({
            info: "Message Sent Successfully!",
            receiverId: receiverId,
            message: newMessage.message,
            senderId: senderId,
            _id: newMessage._id
        })


    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, userToChatId]
            }
        }).populate("messages")

        if (!conversation) {
            return res.status(200).json([])
        }

        res.status(200).json(conversation.messages)

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}