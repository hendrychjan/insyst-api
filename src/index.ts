import Server from "./services/server";
import defineRoutes from "./startup/define_routes";
import loadEnv from "./startup/load_env";

// Load the environment variables
loadEnv();

// Create a new server instance
const port: number = parseInt(process.env.PORT as string);
const server = new Server(port);

// Set up the server
defineRoutes(server);

// Start the server
server.start();
