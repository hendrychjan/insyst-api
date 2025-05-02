import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { IJWTUserPayload } from "../models/user";

// Extend the Express Request type of user (user data coming from the token payload)
declare global {
  namespace Express {
    interface Request {
      user?: IJWTUserPayload;
    }
  }
}

const auth: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.sendStatus(401); // Unauthorized
    return; // Ensure the function returns void
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as IJWTUserPayload;
    req.user = decoded;
    
    next(); // Authenticated
  } catch {
    res.sendStatus(403); // Forbidden
    return; // Ensure the function returns void
  }
};

export default auth;
