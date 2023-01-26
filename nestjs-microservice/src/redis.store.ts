import { redisStore } from "cache-manager-redis-store";

export const RedisStore = async () =>
  await redisStore({
    password: process.env.REDIS_STORE_PASSWORD,
    socket: {
      host: "redis-13809.c98.us-east-1-4.ec2.cloud.redislabs.com",
      port: 13809,
    },
  });
