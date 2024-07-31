import { Router } from "express";
import passport from "passport";
import getnewToken from "../middlewares/getnewToken.js";
import {
  userregisterController,
  userloginController,
  userprofileController,
  userlogoutController,
  userpasswordChangeController,
  userResetpasswordController,
} from "../controllers/index.js";

const Authroutes = Router();

// Public Routes

Authroutes.route("/signup").post(userregisterController);
Authroutes.route("/login").post(userloginController);
Authroutes.route("/user-logout").post(userlogoutController);
Authroutes.route("/user-passwordreset").post(userResetpasswordController);

// Protected Routes
Authroutes
  .route("/user-profile")
  .post(
    getnewToken,
    passport.authenticate("jwt", { session: false }),
    userprofileController
  );
Authroutes
  .route("/user-passwordChange")
  .post(
    getnewToken,
    passport.authenticate("jwt", { session: false }),
    userpasswordChangeController
  );
export { Authroutes };
