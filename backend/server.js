import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectRedis } from "./config/redis.js";

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectRedis(); // 👈 لازم الأول

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

start();