import dotenv from "dotenv";

/**
 * A routine to load environment variables from the .env file
 */
export default function loadEnv(): void {
  // Load
  dotenv.config();

  // Validate

  // PORT
  if (!parseInt(process.env.PORT ?? "")) {
    throw "The PORT environment variable is not set or is invalid.";
  }

  // MONGODB_URI
  if (!process.env.MONGODB_URI) {
    throw "The MONGODB_URI environment variable is not set.";
  }
}
