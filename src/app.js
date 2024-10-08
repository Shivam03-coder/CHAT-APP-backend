import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import "./config/passportjwtconfig.js";
import { passport } from "./config/passportjwtconfig.js";
import { appconfig } from "./config/appconfig.js";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static file serving middleware
app.use(
  "/uploads/files",
  express.static(path.join(__dirname, "../uploads/files"))
);

app.set("trust proxy", 1);
// Middleware for CORS and cookies
app.use(
  cors({
    origin: `${appconfig.APP_BASE_URL}`,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST"],
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Initialize Passport after body parsers and before routes
app.use(passport.initialize());

// Route handlers
import { Authroutes } from "./routes/userauthRoute.js";
import { userContactRoute } from "./routes/userContactRoutes.js";
import { msgsRoute } from "./routes/msgsRoute.js";
import { conatctListRoute } from "./routes/contactListRoutes.js";
import { uploadFileRoute } from "./routes/uploadfileRoute.js";

app.use("/api/v1/chat-app/user", Authroutes);
app.use("/api/v1/chat-app/user", userContactRoute);
app.use("/api/v1/chat-app/user", msgsRoute);
app.use("/api/v1/chat-app/user", conatctListRoute);
app.use("/api/v1/chat-app/user", uploadFileRoute);

export { app };
