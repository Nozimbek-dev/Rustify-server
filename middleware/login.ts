import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { User, UserModel } from "../models/User";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_KEY;

export interface WithUser extends Request {
  user?: { _id: mongoose.Schema.Types.ObjectId; }
}

const login = (
  req: WithUser,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ error: "No authorization header provided" });
  if (!JWT_SECRET)
    return res.status(500).json({ error: "Server Error. Try later" });

  const token = authorization.split(" ")[1]
  if (!token) return res.status(401).json({ error: "No token provided" })

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { _id: mongoose.Schema.Types.ObjectId }
    // decoded._id = new mongoose.Types.ObjectId().toHexString()
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" })
  }
};
export { login }