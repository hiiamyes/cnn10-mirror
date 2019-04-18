require("dotenv").config();
const CronJob = require("cron").CronJob;
const redis = require("redis");
const Promise = require("bluebird");
const fetch = require("./fetch");

Promise.promisifyAll(redis);
redisClient = redis.createClient({ port: process.env.REDIS_PORT });

new CronJob(
  "*/10 * * * * *",
  async () => {
    try {
      const keys = await redisClient.keysAsync(`station:*`);
      const stations = (await redisClient.mgetAsync(keys)).map(station =>
        JSON.parse(station)
      );
      for (let i = 0; i < stations.length; i++) {
        const { id, name } = stations[i];
        const qq = await fetch(id, "2019-04-02");
        console.log(id, name, qq);
      }
    } catch (error) {
      console.log(error);
    }
  },
  null,
  true,
  "Asia/Taipei"
);
