//This file defines resolvers for Query
const { forwardTo } = require("prisma-binding");

const Query = {
  recipe:  forwardTo("db"),
  recipes:  forwardTo("db"),
  event:  forwardTo("db"),
  events:  forwardTo("db"),

  user: async (_, args, context, info) => {
    try {
      const user = await context.db.query.user(
        {
          where: {
            id: args.id
          }
        },
        info
      );
      return user;
    } catch (e) {
      console.log(e.message);
    }
  },

  currentUser: async (_, args, context, info) => {
    try {
      const auth_user = await context.user;
      const auth0sub = args.auth0sub || auth_user.sub || "";
      const currentUser = await context.db.query.user(
        {
          where: {
            auth0Sub: auth0sub
          }
        },
        info
      );
      return currentUser;
    } catch (e) {
      console.log(e.message);
    }
  },
};

module.exports = Query;
