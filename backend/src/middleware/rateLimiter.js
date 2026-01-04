import redis from "../config/redis.js";

const rateLimiter = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(500).json({
        message: "User ID missing in rate limiter"
      });
    }

    const key = `rate:${userId}`;
    const LIMIT = Number(process.env.RATE_LIMIT) || 5;

    // Increment request count
    const count = await redis.incr(key);

    // Check TTL
    const ttl = await redis.ttl(key);

    // 🔴 Ensure expiry is always set
    if (ttl === -1 || ttl === -2) {
      await redis.expire(key, 60);
    }

    if (count > LIMIT) {
      return res.status(429).json({
        message: "Rate limit exceeded",
        requestsThisMinute: count
      });
    }

    req.apiCount = count;
    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    res.status(500).json({ message: "Rate limiter failed" });
  }
};

export default rateLimiter;
