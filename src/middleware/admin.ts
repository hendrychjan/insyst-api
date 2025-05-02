import { Request, Response, NextFunction } from "express";

export default function admin(req: Request, res: Response, next: NextFunction) {
  if (!req.user || !req.user.isAdmin) {
    return res.sendStatus(403); // Forbidden
  }

  next(); // Authorized, is admin
}
