import { Request, Response } from "express";
import Route from "../services/route";

/**
 * Ping route for testing the API accessibility and various other features
 */
export default class Ping extends Route {
  constructor() {
    super();
    
    this.router.get("/", this.ping);
  }

  /**
   * Responds with a simple message to indicate that the API is running
   */
  private ping(req: Request, res: Response): void {
    res.send("API running!");
  }
}
