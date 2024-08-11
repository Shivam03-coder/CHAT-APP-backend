import ms from "ms";
import { appconfig } from "../config/appconfig.js";

const setTokenscookies = (res, accessToken, refreshToken) => {

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: ms(appconfig.ACCESS_TOKEN_EXP),
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: ms(appconfig.REFRESH_TOKEN_EXP),
    sameSite: "None",
    path: "/",
  });
};

export default setTokenscookies;
