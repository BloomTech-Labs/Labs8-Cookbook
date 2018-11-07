const Query = {
  user: async (_, args, context, info) => {
    const user = await context.db.query.user({
      where: {
        id: args.id
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
  }
};

module.exports = Query;
