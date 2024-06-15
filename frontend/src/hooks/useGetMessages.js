import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import toast from "react-hot-toast";

export const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      try {
        // expects an array of messages from the getMessage controller in backend
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        // ? setting messages in zustand store?
        // ? why are we "storing" messages in store...? we have the db right?
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    // ? when clicked on a contact?
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;