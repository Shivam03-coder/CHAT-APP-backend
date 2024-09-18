import ms from "ms";

const setTokenscookies = async (res, accessToken, refreshToken, user) => {
  try {
    user.isAuthenticated = true;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: ms("1d"),
      domain: ".nxtdev.in",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: ms("5d"),
      domain: ".nxtdev.in",
    });

    res.cookie("isUserAuthenticated", user.isAuthenticated, {
      httpOnly: false,
      secure: true,
      maxAge: ms("5d"),
      domain: ".nxtdev.in",
    });

  } catch (error) {
    console.log(error);
  }
};

export default setTokenscookies;
