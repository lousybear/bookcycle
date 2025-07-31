import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { verifyToken } from "../utils/jwt";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  try {
    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token) as { id: string };
    const user = await User.findById(payload.id).select("-passwordHash");
    if (!user) return res.sendStatus(404);
    req.user = user;
    next();
  } catch {
    res.sendStatus(403);
  }
};
