import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  // socket.handshake refers to the initial connection handshake that occurs when a client connects to the server
  // this handshake often contains metadata about the connection such as the query parameters
  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // now that we updated the userSocketMap, we need to send the updated list of online users to all the connected clients
  // io.emit() is used to send events to all the connected clients
  // Object.keys() returns an array of a given object's keys
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    // again we need to send the updated list of online users to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };