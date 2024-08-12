import { config } from "dotenv";
config();

const appconfig = {
  URI: process.env.DATABASE_URI,
  PORT: process.env.PORT,
  APP_BASE_URL: process.env.APP_BASE_URL,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
};

export { appconfig };
