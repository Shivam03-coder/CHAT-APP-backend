import { app } from "./app.js";
import { appconfig } from "./config/appconfig.js";
import { connectdb } from "./database/dbconnect.js";
import setUpsocket from "./socket.js";

(async () => {
  try {
    await connectdb();

    app.get("/", (_, res) => {
      res.status(200).json({
        status: "success",
      });
    });

    const server = app.listen(appconfig.PORT, () => {
      console.log(
        `Server started at http://localhost:${appconfig.PORT || 3030}/`
      );
    });

    setUpsocket(server);

    const gracefulShutdown = async () => {
      console.log("Shutting down gracefully...");
      server.close(() => {
        console.log("Server closed");
      });
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
})();
