import express from "express";
import multer from "multer";
import { userUploadfileController } from "../controllers/index.js";
import passport from "passport";
import getnewToken from "../middlewares/getnewToken.js";

const uploadFileRoute = express.Router();

const upload = multer({
  dest: "uploads/files/",
  limits: { fileSize: 50 * 1024 * 1024 },
});

uploadFileRoute
  .route("/uploadfiles")
  .post(
    getnewToken,
    passport.authenticate("jwt", { session: false }),
    upload.single("file"),
    userUploadfileController
  );

export { uploadFileRoute };
