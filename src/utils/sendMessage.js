import messageModel from "../models/messagesModel.js";
import { userSocketMap } from "../socket.js";

const sendMessage = async (message) => {
  try {
    const senderSocketId = userSocketMap.get(message.sender);
    const reciverSocketId = userSocketMap.get(message.reciver);
    const createMessage = await messageModel.create(message);
    const MessageData = await messageModel
      .findById(createMessage._id)
      .populate("sender", "id fullname email")
        .populate("reciver", "id fullname email");
      
      if (reciverSocketId) {
        
      }
  } catch (error) {
    console.log(error);
  }
};
