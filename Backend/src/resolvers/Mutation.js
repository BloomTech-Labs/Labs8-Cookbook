//This file defines resolvers for Mutation
const stripe = require("../stripe");

const Mutation = {
  signup: async (_, args, context, info) => {
    const auth0user = await context.user;
    const auth0Sub = auth0user.sub;
    const email = auth0user.email;
    try {
      const newUser = await context.db.mutation.createUser(
        {
          data: {
            auth0Sub: auth0Sub,
            firstName: args.firstName,
            lastName: args.lastName,
            email: email
          }
        },
        info
      );
      return newUser;
    } catch (error) {
      console.log(error.message);
    }
  },

  createRecipe: async (_, args, context, info) => {
    try {
      const contextUser = await context.user;
      const auth0Sub = contextUser.sub;

      //get current user
      const user = await context.db.query.user(
        {
          where: {
            auth0Sub: auth0Sub
          }
        },
        info
      );

      const recipe = await context.db.mutation.createRecipe(
        {
          data: {
            title: args.title,
            prepTime: args.prepTime,
            servings: args.servings,
            image: args.image,
            url: args.url,
            createdBy: { connect: { id: user.id } }
          }
        },
        info
      );
      return recipe;
    } catch (e) {
      return e.message;
    }
  },

  createEvent: async (_, args, context, info) => {
    const data = {
      mealType: args.mealType,
      date: args.date,
      recipe: { connect: { id: args.recipe } }
    };
    try {
      const event = await context.db.mutation.createEvent(
        {
          data: data
        },
        info
      );
      return event;
    } catch (error) {
      return error.message;
    }
  },

  createSubscription: async (parent, args, context, info) => {
    const charge = await stripe.charges.create({
      amount: 1000,
      currency: "usd",
      source: args.token
    });
    console.log(charge);
  }
};

module.exports = Mutation;
