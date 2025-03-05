import startServer from "./startup/start_server";
import loadEnv from "./startup/load_env";
import connectDb from "./startup/connect_db";
import Logger from "./services/logger";

async function main() {
  try {
    // Load the environment variables
    loadEnv();

    // Connect to mongodb
    await connectDb();

    // Start the server
    startServer();
  } catch (e: any) {
    Logger.fatal(e);
    process.exit(1);
  }
}

main();
