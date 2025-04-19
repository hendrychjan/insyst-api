import { Request, Response } from "express";
import User from "../models/user";
import Route from "../services/route";
import ErrorHandler from "../services/error_handler";

export default class Users extends Route {
  constructor() {
    super();

    this.router.get("/", this.getAllUsers);
    this.router.post("/", this.createUser);
    this.router.post("/auth", this.getToken);
  }

  /**
   * Get all users
   */
  private async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();
      res.send(users);
    } catch (e: any) {
      ErrorHandler.handleRouteError(e, res);
      return;
    }
  }

  /**
   * Create a new user
   */
  private async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = new User(req.body);
      await user.save();
      res.send(user);
    } catch (e: any) {
      ErrorHandler.handleRouteError(e, res);
      return;
    }
  }

  /**
   * User login
   */
  private async getToken(req: Request, res: Response): Promise<void> {
    try {
      const user = new User(req.body);
      const token = await user.getToken();
      res.send(token);
    } catch (e: any) {
      ErrorHandler.handleRouteError(e, res);
      return;
    }
  }
}
