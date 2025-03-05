import dotenv from "dotenv";
import Logger from "../services/logger";

/**
 * Load environment variables from the .env file
 */
export default function loadEnv() {
  // Load
  dotenv.config();

  // Validate

  // PORT
  if (!parseInt(process.env.PORT ?? "")) {
    Logger.fatal("The PORT environment variable is not set or is invalid.");
    process.exit(1);
  }
}
