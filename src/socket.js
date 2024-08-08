import { Server as SocketIOserver } from "socket.io";
import { appconfig } from "./config/appconfig.js";
import messageModel from "./models/messagesModel.js";

const setUpSocket = (server) => {
  const io = new SocketIOserver(server, {
    cors: {
      origin: appconfig.APP_BASE_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  io.on("connection", (socket) => {
    const userID = socket.handshake.query.userId;

    if (userID) {
      userSocketMap.set(userID, socket.id);
      console.log(`User connected: ID ${userID}, Socket ID ${socket.id}`);
    } else {
      console.log("User ID not provided during connection");
    }

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`Client disconnected: Socket ID ${socket.id}`);
      for (const [userID, socketId] of userSocketMap.entries()) {
        if (socketId === socket.id) {
          userSocketMap.delete(userID);
          console.log(`Removed user: ID ${userID}`);
          break;
        }
      }
    });

    // Handle sending messages
    socket.on("sendMessage", async (message) => {
      try {
        const senderSocketId = userSocketMap.get(message.sender);
        const reciverSocketId = userSocketMap.get(message.receiver);

        const createMessage = await messageModel.create(message);

        const MessageData = await messageModel
          .findById(createMessage._id)
          .populate("sender", "id fullname email")
          .populate("receiver", "id fullname email");
        if (reciverSocketId) {
          io.to(reciverSocketId).emit("reciveMessage", MessageData);
        }

        if (senderSocketId) {
          io.to(senderSocketId).emit("reciveMessage", MessageData);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });
  });

  io.on("error", (error) => {
    console.error("Socket.IO error:", error);
  });
};

export default setUpSocket;
