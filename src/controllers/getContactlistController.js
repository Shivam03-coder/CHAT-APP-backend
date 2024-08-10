import messageModel from "../models/messagesModel.js";
import mongoose from "mongoose";

const getContactlistController = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid user ID!",
      });
    }

    const contacts = await messageModel.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$receiver",
              else: "$sender",
            },
          },
          lastmessageTime: {
            $first: "$timestamp",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        },
      },
      {
        $unwind: "$contactInfo",
      },
      {
        $project: {
          _id: 1,
          lastmessagetime: 1,
          email: "$contactInfo.email",
          fullname: "$contactInfo.fullname",
        },
      },
      {
        $sort: {
          lastmessagetime: -1,
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Unable to Logout ! `,
    });
  }
};

export default getContactlistController;
