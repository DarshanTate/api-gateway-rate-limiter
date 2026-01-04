import mongoose from "mongoose";

const usageLogSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  endpoint: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("UsageLog", usageLogSchema);
