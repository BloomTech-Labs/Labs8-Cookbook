//This file defines resolvers for Query
const Query = {
  user: async (_, args, context, info) => {
    const user = await context.db.query.user({
      where: {
        auth0Sub: context.user.sub
      }
    });
    return user;
  },

  recipes: async (_, args, context, info) => {
    const recipes = await context.db.query.recipes();
    return recipes;
  },

  users: async (_, args, context, info) => {
    const users = await context.db.query.users();
    return users;
  },

  getAuth: async(parent, args, context, info) => {
    const token = await context.user;
    return token;
  }};

module.exports = Query;
