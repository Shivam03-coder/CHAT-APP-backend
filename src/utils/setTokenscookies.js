const setTokenscookies = (res, accessToken, refreshToken) => {
  console.log("🚀 ~ setTokenscookies ~ accessToken:", accessToken);
  
  // Get current timestamp
  const now = Date.now();
  
  // Calculate expiration times
  const accessTokenExpiresAt = now + (24 * 60 * 60 * 1000); // 1 day in milliseconds
  const refreshTokenExpiresAt = now + (5 * 24 * 60 * 60 * 1000); // 5 days in milliseconds

  // Convert expiration times to Date objects
  const accessTokenExpirationDate = new Date(accessTokenExpiresAt);
  const refreshTokenExpirationDate = new Date(refreshTokenExpiresAt);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    expires: accessTokenExpirationDate,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    expires: refreshTokenExpirationDate,
  });
};

export default setTokenscookies;
