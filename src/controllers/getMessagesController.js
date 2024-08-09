import messageModel from "../models/messagesModel.js";

const getMessagesController = async (req, res) => {
  try {
    const senderId = req.user._id;
    const reciverId = req.body.id;

    if (!senderId || !reciverId) {
      return res.status(500).json({
        status: "failed",
        message: `Unable to find user ! `,
      });
    }

    const messages = await messageModel
      .find({
        $or: [
          { sender: senderId, receiver: reciverId },
          { sender: reciverId, receiver: senderId },
        ],
      })
      .sort({ timestamp: 1 });

    res.status(200).json({
      status: "success",
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Unable to Logout ! `,
    });
  }
};

export default getMessagesController;
