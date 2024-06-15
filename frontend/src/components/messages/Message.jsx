import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import useConversation from "../../zustand/useConversation.js";
import { extractTime } from "../../utils/extractTime.js";

export const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id;

  const [formattedTime, setFormattedTime] = useState(extractTime(message.createdAt));

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture;
  const bubbleBgColor = fromMe ? "bg-green-400" : "bg-gray-600";
  const shakeClass = message.shouldShake ? "shake" : "";

  useEffect(() => {
    setFormattedTime(extractTime(message.createdAt));
  }, [message.createdAt]);

  return (
    <div className={`chat ${chatClassName}`}>
      <div className={"chat-image avatar"}>
        <div className={"w-10 rounded-full"}>
          <img src={profilePic} alt="chat bubble component" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>
      <div className={"chat-footer opacity-50 text-xs flex gap-1 items-center text-gray-900"}>{formattedTime}</div>
    </div>
  );
};

export default Message;