import UserModel from "../models/usermodel.js";

const getUsersContactController = async (req, res) => {
  try {
    const { SerachedcontactInfo } = req.body;

    if (SerachedcontactInfo === "" || SerachedcontactInfo === undefined) {
      return res.status(500).json({
        status: "failed",
        message: "Contact does not exist",
      });
    }

    const newSaniTizedterm = SerachedcontactInfo.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const regex = new RegExp(newSaniTizedterm, "i");

    const contacts = await UserModel.find({
      $and: [
        {
          _id: {
            $ne: req.user._id,
          },
        },
        {
          $or: [{ fullname: regex }, { email: regex }],
        },
      ],
    }).select(
      "-password -isAuthenticated -isemailVerified  -isphoneNoVerified -phonenumber -createdAt -updatedAt -__v"
    );

    res.status(200).json({
      status: "success",
      data: contacts,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      status: "failed",
      message: "Unable to find User!",
    });
  }
};

export default getUsersContactController;
