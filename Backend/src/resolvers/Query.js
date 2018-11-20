//This file defines resolvers for Query
const Query = {
  user: async (_, args, context, info) => {
    try {
      const contextUser = await context.user;
      const auth0Sub = contextUser.sub;

      console.log("auth0Sub: ", auth0Sub);

      const user = await context.db.query.user({
        where: {
          auth0Sub: auth0Sub
        }
      },info);

      return user
    }
    catch(e) {
      console.log(e.message)
    }
  },

  recipes: async (_, args, context, info) => {
    const recipes = await context.db.query.recipes();
    return recipes;
  },

  users: async (_, args, context, info) => {
    const users = await context.db.query.users();
    return users;
  }};

module.exports = Query;
