const Mutation = {
  signup: async (_, args, context, info) => {
    const user = await context.db.mutation.createUser(
      {
        data: {
          ...args
        }
      },
      info
    );

    return user;
  },
  createRecipe: async (_, args, context, info) => {
    const recipe = await context.db.mutation.createRecipe({
      data: {
        ...args
      }
    });
    return recipe;
  }
};

module.exports = Mutation;
