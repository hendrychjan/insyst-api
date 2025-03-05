import mongoose from "mongoose";
import Logger from "../services/logger";

/**
 * A routine to connect to mongodb
 */
export default async function connectDb() {
  Logger.info("Connecting to mongodb...");
  
  // Connect to the database
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    Logger.info("Connected to mongodb!");
  } catch (e: any ) {
    Logger.fatal("Error connecting to mongodb:");
    Logger.fatal(e);
    process.exit(1);
  }

  // Handle the disconnect event
  mongoose.connection.on("disconnected", () => {
    Logger.error("Disconnected from mongodb");
  });
}
