import Conversation from "./Conversation.jsx";
import useGetConversations from "../../hooks/useGetConversations.js";

export const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className={"flex flex-col py-2 overflow-auto"}>
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation} // ? what is this?
          lastIdx={idx === conversations.length - 1}
        />
      ))}
    </div>
  );
};

export default Conversations;