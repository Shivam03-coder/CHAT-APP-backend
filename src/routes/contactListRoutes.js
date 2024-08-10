import { Router } from "express";
import { getContactlistController } from "../controllers/index.js";
import passport from "passport";
import getnewToken from "../middlewares/getnewToken.js";

export const conatctListRoute = Router();

conatctListRoute
  .route("/contactlist")
  .get(
    getnewToken,
    passport.authenticate("jwt", { session: false }),
    getContactlistController
  );
