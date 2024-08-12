const userlogoutController = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "None", 
      secure: true,    
      path: '/',        
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      path: '/',
    });
    res.clearCookie("isUserAuthenticated", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      path: '/',
    });

    res.status(200).json({
      status: "success", 
      message: "Logout successfully",
    });
  } catch (error) {
    console.error("Logout error:", error); 
    res.status(500).json({
      status: "failed",
      message: "Unable to logout!",
    });
  }
};

export default userlogoutController;
