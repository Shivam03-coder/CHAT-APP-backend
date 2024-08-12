import ms from "ms";
import { appconfig } from "../config/appconfig.js";

const setTokenscookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: ms(appconfig.ACCESS_TOKEN_EXP),
    domain: "shivamchatbox.netlify.app",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: ms(appconfig.REFRESH_TOKEN_EXP),
    domain: "shivamchatbox.netlify.app",
  });
};

export default setTokenscookies;
