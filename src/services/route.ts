import express, { Router } from "express";

/**
 * Base class for routes
 */
export default class Route {
  protected router: Router;

  constructor() {
    this.router = express.Router();
  }

  /**
   * Get the router instance for the route
   * @returns The router instance for the route
   */
  public getRouter(): Router {
    return this.router;
  }
}
