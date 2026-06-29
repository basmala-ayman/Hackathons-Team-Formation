const  Redis =require( "@upstash/redis");

require("dotenv").config();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

await redis.set("test", "world");
const value = await redis.get("test");

console.log(value);