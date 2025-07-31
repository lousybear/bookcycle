import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { generateToken } from "../utils/jwt";

export const signUp = async (req: Request, res: Response) => {
  const { name, username, email, phone, password } = req.body;

  if (!username || !password || !(email || phone)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const existing = await User.findOne({
    $or: [{ username }, { email }, { phone }],
  });
  if (existing) return res.status(409).json({ error: "User already exists" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    username,
    email,
    phone,
    passwordHash,
  });
  const token = generateToken((user._id as any).toString());

  res.json({ user: { name: user.name, username: user.username }, token });
};

export const signIn = async (req: Request, res: Response) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({
    $or: [
      { username: identifier },
      { email: identifier },
      { phone: identifier },
    ],
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = generateToken((user._id as any).toString());
  res.json({ user: { name: user.name, username: user.username }, token });
};

export const me = async (req: Request, res: Response) => {
  res.json({ user: req.user });
};
