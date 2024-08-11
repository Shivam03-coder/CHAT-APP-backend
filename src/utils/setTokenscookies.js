import ms from "ms";
import { appconfig } from "../config/appconfig.js";

const setTokenscookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: ms(appconfig.ACCESS_TOKEN_EXP),
    sameSite: "None",
    domain: '.vercel.app',
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: ms(appconfig.REFRESH_TOKEN_EXP),
    httpOnly: true,
    secure: true,
    sameSite: "None",
    domain: '.vercel.app',
  });
};

export default setTokenscookies;
