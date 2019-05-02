FROM node:latest
WORKDIR /api
COPY . .
RUN yarn
EXPOSE 4000
RUN yarn global add nodemon
CMD ["nodemon", "src/index.js"]