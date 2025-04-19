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

  // JWT_SECRET
  if (!process.env.JWT_SECRET) {
    throw "The JWT_SECRET environment variable is not set.";
  }

  // PASSWD_HASH_SALT_ROUNDS
  if (!parseInt(process.env.PASSWD_HASH_SALT_ROUNDS ?? "")) {
    throw "The PASSWD_HASH_SALT_ROUNDS environment variable is not set or is invalid.";
  }
}
