const redisClient =require("../config/redis.js");

const setCache = async (key, value, ttl = 3600) => {
  try {
    await redisClient.set(key, JSON.stringify(value), {
      EX: ttl,
    });
  } catch (err) {
    console.error("Redis set error:", err);
  }
};

const getCache = async (key) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Redis get error:", err);
    return null;
  }
};

const deleteCache = async (key) => {
  try {
    await redisClient.del(key);
  } catch (err) {
    console.error("Redis delete error:", err);
  }
};

module.exports={setCache,getCache,deleteCache};