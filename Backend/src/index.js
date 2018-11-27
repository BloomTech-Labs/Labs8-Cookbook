// This file start the server. Also all logic for authentication, billing, etc... stay here
require("dotenv").config();
const createServer = require("./createServer");
const cors = require("cors");

const server = createServer();

server.start(
  {
    cors: {
      credentials: true,
      origin: [process.env.FRONTEND_URL, "https://lambda-cookbook.netlify.com"]
    }
  },
  () =>
    console.log(
      `Server running at ${
        process.env.FRONTEND_URL
          ? "http://localhost:4000"
          : "https://lambda-cookbook.netlify.com"
      }`
    )
);
