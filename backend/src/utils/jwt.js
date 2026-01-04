import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id },   // 🔴 EXPLICIT & CLEAR
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};
