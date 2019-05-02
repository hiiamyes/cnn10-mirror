require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const redis = require("redis");
const { compose, map, orderBy } = require("lodash/fp");

var Promise = require("bluebird");
Promise.promisifyAll(redis);
redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

const typeDefs = gql`
  type Transcript {
    date: String
    title: String
    content: String
    url: String
  }
  type Query {
    transcript: Transcript
    transcripts: [Transcript]
  }
`;

const resolvers = {
  Query: {
    transcript: async (obj, { id }) => {
      const keys = await redisClient.keysAsync(`${id}:*`);
      const station = JSON.parse(await redisClient.getAsync(`station:${id}`));
      const values = await redisClient.mgetAsync(keys);
      const rainfalls = keys
        .map((key, i) => ({ date: key.split(":")[1], value: values[i] }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      return {
        ...station,
        rainfalls
      };
    },
    transcripts: async () => {
      const keys = await redisClient.keysAsync(`transcript:*`);
      const transcripts = compose(
        orderBy(["date"], ["desc"]),
        map(transcript => JSON.parse(transcript))
      )(await redisClient.mgetAsync(keys));
      return transcripts;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
