const setTokenscookies = (res, accessToken, refreshToken) => {
  // Set cookie expiration times in milliseconds
  const oneDayInMs = 24 * 60 * 60 * 1000; // 1 day
  const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000; // 5 days

  res.cookie("accessToken", accessToken, {
    httpOnly: true,   // Prevents JavaScript access
    secure: true,     // Ensures cookies are sent over HTTPS
    sameSite: 'None', // Allows cross-site requests
    maxAge: oneDayInMs, // 1 day in milliseconds
    path: '/',        // Ensure the cookie is accessible across the application
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,   // Prevents JavaScript access
    secure: true,     // Ensures cookies are sent over HTTPS
    sameSite: 'None', // Allows cross-site requests
    maxAge: fiveDaysInMs, // 5 days in milliseconds
    path: '/',        // Ensure the cookie is accessible across the application
  });
};

export default setTokenscookies;
