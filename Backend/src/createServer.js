// This file Create graphQL server entry point
// Import Mutation, Query, and db
const { GraphQLServer } = require("graphql-yoga");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const AuthPayload = require("./resolvers/AuthPayload");
const db = require("./db");
const jwt = require("jsonwebtoken");

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
    // context: req => ({ 
    //   ...req, 
    //   db
    // })
    context: ({ req }) => {
      // simple auth check on every request
      const token = req.headers.authorization;
      const user = new Promise((resolve, reject) => {
        jwt.verify(token, getKey, options, (err, decoded) => {
          if(err) {
            return reject(err);
          }
          resolve(decoded.email);
        });
      });
  
      return {
        user
      };
    },
})};

module.exports = createServer;
