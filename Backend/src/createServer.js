// This file Create graphQL server entry point
// Import Mutation, Query, and db
const { GraphQLServer } = require("graphql-yoga");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const AuthPayload = require("./resolvers/AuthPayload");
const db = require("./db");

// Create server with typeDefs, resolvers, and context(database)
function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query,
      AuthPayload
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;
