import { appconfig } from "../config/appconfig.js";
import UserModel from "../models/usermodel.js";
import generateTokens from "../utils/generateTokens.js";
import setTokenscookies from "../utils/setTokenscookies.js";

const userloginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: `Invali email or password`,
      });
    }

    const isMatchpassword = await user.isPasswordcorrect(password);

    if (!isMatchpassword) {
      return res.status(401).json({
        status: "failed",
        message: `Invalid  user email and password`,
      });
    }

    // GENERATE TOKENS

    const { accessToken, refreshToken } = await generateTokens(user._id);

    // set isAuthenticated true

    user.isAuthenticated = true;
    await user.save();

    // Send cookies
    res.cookie("isUserAuthenticated", user.isAuthenticated, {
      maxAge: 5 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      path: "/",
      domain: appconfig.APP_BASE_URL.replace(/^https?:\/\//, ""),
    });

    setTokenscookies(res, accessToken, refreshToken);

    // Response after user successfully login

    res.status(200).json({
      status: "success",
      message: "User login successfull",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Unable to login ! : ${error}`,
    });
  }
};

export default userloginController;
