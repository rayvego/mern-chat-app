import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

// again this is a custom hook that we can user in our components to get the socket and onlineUsers
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("https://mern-chat-app-m2m3.onrender.com", {
        query: {
          userId: authUser._id,
        },
      }); // establishes a connection with the server
      // to get the online users, we would require the userId in the backend, so we pass the userId as a query parameter above

      setSocket(socket); // setting the socket in the state

      // socket.on() is used to listen to the events. can be used both on client and server side
      // listens to the .emit() event from the server
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // this is a cleanup function, when the component is removed from the UI, the cleanup function is called.
      // in our case, when the user state changes (user logs out), we want to close the socket connection to save resources
      // when the component is "unmounted" from the UI, the "cleanup" function is called.
      return () => socket.close();
    } else {
      if (socket) {
        // this is to ensure clean disconnect when the user logs out
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};