import { app } from "./app.js";
import { appconfig } from "./config/appconfig.js";
import { connectdb } from "./database/dbconnect.js";
import setUpsocket from "./socket.js";

(async () => {
  let server;

  try {
    await connectdb();

    app.get("/", (_, res) => {
      res.status(200).json({
        status: "success",
      });
    });

    server = app.listen(appconfig.PORT, () => {
      console.log(`Server started at http://localhost:${appconfig.PORT || 3030}/`);
    });

    setUpsocket(server);

    const gracefulShutdown = async () => {
      console.log("Shutting down gracefully...");

      if (server) {
        server.close(() => {
          console.log("Server closed");
          process.exit(0); 
        });
      } else {
        process.exit(1); 
      }
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
})();
