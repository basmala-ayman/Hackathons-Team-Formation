import "dotenv/config";
import { Redis } from "@upstash/redis";

console.log("URL:", process.env.UPSTASH_REDIS_REST_URL);
console.log("TOKEN:", process.env.UPSTASH_REDIS_REST_TOKEN);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function test() {
  console.log("Connecting...");

  await redis.set("hello", "world");
  const data = await redis.get("hello");

  console.log("Result:", data);
}

test();