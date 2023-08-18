const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const redis = require("redis");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
    credentials: true,
    transportOptions: {
      polling: {
        extraHeaders: {
          "Access-Control-Allow-Origin": "http://127.0.0.1:5173",
        },
      },
    },
  },
});

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const PORT = 7777;

const redisClient = redis.createClient({
  host: "redis",
  port: 6379,
});

redisClient.on("ready", () => {
  console.log("Connected to Redis successfully!");
});

redisClient.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

redisClient.subscribe("some-channel");

redisClient.on("message", (channel, message) => {
  const parsedMessage = JSON.parse(message);
  io.emit("eventName", parsedMessage);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
