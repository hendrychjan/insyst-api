import express from "express";
import Server from "../services/server";
import PingRoute from "../routes/ping";
import UsersRoute from "../routes/users";
import Logger from "../services/logger";

/**
 * Global function to define all the routes for the server
 * @param server The server instance to define the routes on
 */
function defineRoutes(server: Server): void {
  server.useRoute("/ping", new PingRoute());
  server.useRoute("/users", new UsersRoute());
}

/**
 * Global function to define all the middleware for the server
 * @param server The server instance to define the middleware on
 */
function defineMiddleware(server: Server): void {
  server.useMiddleware(express.json());
  server.useMiddleware(express.urlencoded({ extended: true }));
}

/**
 * A routine to initialize and start the APIserver
 * @returns The server instance
 */
export default function startServer(): Server {
  Logger.info("Starting the server...");

  // Create a new server instance
  const port: number = parseInt(process.env.PORT as string);
  const server = new Server(port);

  // Set up the middleware
  defineMiddleware(server);

  // Set up the server
  defineRoutes(server);

  // Start the server
  server.start();

  return server;
}
