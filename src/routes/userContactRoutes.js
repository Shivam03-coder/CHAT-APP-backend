import { Router } from "express";
import getnewToken from "../middlewares/getnewToken.js";
import { getUsersContactController } from "../controllers/index.js";
import passport from "passport";

export const userContactRoute = Router();

userContactRoute
  .route("/usercontacts")
  .post(
    getnewToken,
    passport.authenticate("jwt", { session: false }),
    getUsersContactController
  );
