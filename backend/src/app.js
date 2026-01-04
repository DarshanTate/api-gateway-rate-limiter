import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import apiRoutes from "./routes/api.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);   // 🔴 THIS LINE IS REQUIRED

export default app;
