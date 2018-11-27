//This file defines resolvers for Query
const Query = {
  recipes: async (_, args, context, info) => {
    try {
      const recipes = await context.db.query.recipes();
      return recipes;
    } catch (error) {
      console.log(error.message);
    }
  },

  users: async (_, args, context, info) => {
    const users = await context.db.query.users();
    return users;
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
  }
};

module.exports = Query;
