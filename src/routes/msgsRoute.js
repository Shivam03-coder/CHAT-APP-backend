import { Router } from "express";
import { getMessagesController } from "../controllers/index.js";
import passport from "passport";
import getnewToken from "../middlewares/getnewToken.js";

const msgsRoute = Router();

msgsRoute
  .route("/getmsgs")
  .post(
    getnewToken,
    passport.authenticate("jwt", { session: false }),
    getMessagesController
  );

export { msgsRoute };
