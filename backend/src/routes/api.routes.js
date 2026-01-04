import express from "express";
import authMiddleware from "../middleware/auth.js";
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

router.get(
  "/data",
  authMiddleware,
  rateLimiter,
  (req, res) => {
    res.json({
      data: "Protected API response",
      apiCallsThisMinute: req.apiCount
    });
  }
);

export default router;
