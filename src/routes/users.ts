import { Request, Response } from "express";
import { User, UserModel } from "../models/user";
import Route from "../services/route";
import ErrorHandler from "../services/error_handler";

export default class Users extends Route {
  constructor() {
    super();

    this.router.get("/", this.getAllUsers);
    this.router.post("/", this.createUser);
  }

  /**
   * Get all users
   */
  private async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.find();
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
      console.log(req.body)
      const user: User = new UserModel(req.body);
      await user.save();
      res.send(user);
    } catch (e: any) {
      ErrorHandler.handleRouteError(e, res);
      return;
    }
  }
}
