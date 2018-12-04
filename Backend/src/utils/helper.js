const getUserId = async ctx => {
  const authUser = await ctx.user;
  const auth0sub = authUser.sub;
  const currentUser = await ctx.db.query.user({
    where: {
      auth0Sub: auth0sub
    }
  });

  return currentUser.id;
};

const getRecipe = async (ctx, title, userId) => {
  const recipes = await ctx.db.query.recipes({
    where: {
      title: title,
      createdBy: {
        id: userId
      }
    }
  });
  return recipes.length ? recipes[0] : null;
};

module.exports = { getUserId, getRecipe };
