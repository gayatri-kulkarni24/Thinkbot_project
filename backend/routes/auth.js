// backend/routes/auth.js

import express from "express";
const router = express.Router();
import User from "../models/User.js";
import { hashPassword, verifyPassword, signToken } from '../utils/crypto.js';
import jwt from "jsonwebtoken";


router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already exists' });

  const user = await User.create({ email, passwordHash: hashPassword(password) });

  return res.json({
    message: 'User registered',
    user: { id: user._id, email: user.email }
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });


   console.log("User:", user);
  console.log("Password received:", password);
  console.log("Password hash:", user.passwordHash);

  const valid = verifyPassword(password, user.passwordHash);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

  const token = signToken({ id: user._id, email: user.email });

  return res.json({ token });
 
});

// FIXED AUTH MIDDLEWARE
export function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "please-change-me");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export default router;
