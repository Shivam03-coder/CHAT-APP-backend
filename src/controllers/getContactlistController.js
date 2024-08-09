import messageModel from "../models/messagesModel.js";

const getContactlistController = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(500).json({
        status: "failed",
        message: `Unable to find user ! `,
      });
    }

    const contact = await messageModel.aggregate([
      {
        $match: {
          $or: [{ sender: userId, receiver: userId }],
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: {
            if: { $eq: ["$sender", userId] },
          },
        },
      },
    ]);

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

export default getContactlistController;
