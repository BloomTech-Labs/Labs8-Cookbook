//This file defines resolvers for Mutation
const stripe = require("../stripe");

const { getUserId } = require("../utils");

const Mutation = {
  signup: async (_, args, context, info) => {
    const auth0Sub = context.user.sub;
    const email = context.user.email;
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

      const user = await context.db.query.user(
        {
          where: {
            auth0Sub: auth0Sub
          }
        },
        info
      );

      console.log("user.id: ", user.id);

      const recipe = await context.db.mutation.createRecipe(
        {
          input: {
            title: args.title,
            readyInMinutes: args.readyInMinutes,
            servings: args.servings,
            image: args.image,
            createdBy: { connect: { id: user.id } }
          }
        },
        info
      );
      return recipe;
    } catch (e) {
      console.log("You must be logged in to do this");
    }
  },

  createSubscription: async (parent, args, context, info) => {
    const charge = await stripe.charges.create({
      amount: 1000,
      currency: "usd",
      // customer: userid,
      source: args.token
    });
    console.log(charge);
    //TODO create actual subscript with userID
  }
};

module.exports = Mutation;
