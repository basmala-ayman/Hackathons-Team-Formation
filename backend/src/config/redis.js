// import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.UPSTASH_REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

const connectRedis = async () => {
  try {
    console.log("🔌 Connecting to Upstash...");

    await redisClient.connect();

    console.log("✅ Redis Connected Successfully");
  } catch (error) {
    console.error("❌ Connection Failed:", error);
    throw error;
  }
};

module.exports={redisClient,connectRedis};