import Server from "./services/server";
import define_routes from "./startup/define_routes";

// Create a new server instance
const server = new Server(3001);

// Set up the server
define_routes(server);

// Start the server
server.start();
