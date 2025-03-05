import Server from "../services/server";

import PingRoute from "../routes/ping";

/**
 * Global function to define all the routes for the server
 * @param server The server instance to define the routes on
 */
export default function defineRoutes(server: Server): void {
  server.useRoute("/ping", new PingRoute());
}
