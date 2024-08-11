import ms from "ms";
import { appconfig } from "../config/appconfig.js";

const setTokenscookies = (res, accessToken, refreshToken) => {
  const domain = appconfig.APP_BASE_URL;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: ms(appconfig.ACCESS_TOKEN_EXP),
    domain: domain,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: ms(appconfig.REFRESH_TOKEN_EXP),
    sameSite: "None",
    domain: domain,
  });
};

export default setTokenscookies;
