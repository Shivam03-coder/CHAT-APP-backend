const setTokenscookies = (res, accessToken, refreshToken) => {
  // Get current timestamp
  const now = Date.now();

  // Calculate expiration times
  const accessTokenExpiresAt = now + (24 * 60 * 60 * 1000); // 1 day in milliseconds
  const refreshTokenExpiresAt = now + (5 * 24 * 60 * 60 * 1000); // 5 days in milliseconds

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    expires: new Date(accessTokenExpiresAt),
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    expires: new Date(refreshTokenExpiresAt),
  });
};

export default setTokenscookies;
