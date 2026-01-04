import express from "express";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email });
  }

  const token = generateToken(user);

  res.json({ token });
});

export default router;
