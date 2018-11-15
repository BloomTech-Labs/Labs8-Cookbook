// This file start the server. Also all logic for authentication, billing, etc... stay here
require("dotenv").config();
const createServer = require("./createServer");
const cors = require('cors')

const server = createServer();

// cross-origin requests
server.use(cors());

server.start(() =>
  console.log("GraphQL server is running on http://localhost:4000")
);
