import cookie from "cookie";

const setTokenscookies = async (res, accessToken, refreshToken, user) => {
  try {
    user.isAuthenticated = true;
    await user.save();

    const oneDayInMs = 24 * 60 * 60 * 1000;
    const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000;

    const serializedAccessToken = cookie.serialize("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: oneDayInMs / 1000,
       domain: ".nxtdev.in", 
    });

    const serializedRefreshToken = cookie.serialize(
      "refreshToken",
      refreshToken,
      {
          httpOnly: true,
          secure: true,
          maxAge: fiveDaysInMs / 1000,
          domain: ".nxtdev.in", 
      }
    );

    const serializedisUserAuthenticated = cookie.serialize(
      "isUserAuthenticated",
      user.isAuthenticated,
      {
        httpOnly: false,
        secure: true,
        maxAge: 5 * 24 * 60 * 60 * 1000,
       domain: ".nxtdev.in", 
      }
    );
    res.setHeader("Set-Cookie", [
      serializedAccessToken,
      serializedRefreshToken,
      serializedisUserAuthenticated,
    ]);
  } catch (error) {
    console.log(error);
  }
};

export default setTokenscookies;
