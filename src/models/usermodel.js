import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { appconfig } from "../config/appconfig.js";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isemailVerified: {
      type: Boolean,
      default: false,
    },
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check if the provided password is correct
userSchema.methods.isPasswordcorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate an access token
userSchema.methods.generateAccessToken = function () {
  // Calculate expiration time as 1 day from now
  const expiresIn = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day in milliseconds
  return Jwt.sign(
    {
      _id: this._id,
      email: this.email,
      roles: this.roles,
    },
    appconfig.ACCESS_TOKEN_KEY,
    {
      expiresIn: expiresIn.getTime() / 1000, // Convert to seconds for JWT
    }
  );
};

// Method to generate a refresh token
userSchema.methods.generateRefreshToken = function () {
  // Calculate expiration time as 5 days from now
  const expiresIn = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days in milliseconds
  return Jwt.sign(
    {
      _id: this._id,
      roles: this.roles,
    },
    appconfig.REFRESH_TOKEN_KEY,
    {
      expiresIn: expiresIn.getTime() / 1000, // Convert to seconds for JWT
    }
  );
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
