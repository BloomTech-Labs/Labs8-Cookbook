require("dotenv").config();
const createServer = require("./createServer");

const server = createServer();

server.start(() =>
  console.log("GraphQL server is running on http://localhost:4000")
);
