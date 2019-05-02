require("dotenv").config();
const redis = require("redis");
const Promise = require("bluebird");
const moment = require("moment");
const axios = require("axios");
const cheerio = require("cheerio");

Promise.promisifyAll(redis);
redisClient = redis.createClient({ port: process.env.REDIS_PORT });

async function getTranscript() {
  try {
    const date = moment().format("YYYY-MM-DD");
    // const date = "2019-05-01";
    // http://transcripts.cnn.com/TRANSCRIPTS/1904/22/sn.01.html
    const url = `http://transcripts.cnn.com/TRANSCRIPTS/${moment(date).format(
      "YYMM/DD"
    )}/sn.01.html`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const title = $(".cnnTransSubHead").text();
    const content = $(".cnnBodyText:nth-of-type(6)")
      .html()
      .replace(/<br>/g, "\n");
    await redisClient.setAsync(
      `transcript:${date}`,
      JSON.stringify({ date, title, content, url })
    );

    return "success";
  } catch (error) {
    return error;
  }
}

(async () => {
  const result = await getTranscript();
  console.log(result);
  process.exit();
})();
