//This file defines resolvers for Mutation
const stripe = require("../utils/stripe");
const { getUserId, getRecipe } = require("../utils/helper");
const { forwardTo } = require("prisma-binding");

const Mutation = {
  updateUser: forwardTo("db"),
  updateEvent: async (_, args, context, info) => {
    try {
      const updatedEvent = await context.db.mutation.updateEvent(
        {
          data: args.data,
          where: args.where
        },
        info
      );
      return updatedEvent;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  },
  signup: async (_, args, context, info) => {
    const auth0user = await context.user;
    const auth0Sub = auth0user.sub;
    const email = auth0user.email;
    try {
      const newUser = await context.db.mutation.createUser(
        {
          data: {
            auth0Sub: auth0Sub,
            email: email
          }
        },
        info
      );
      return newUser;
    } catch (error) {
      console.log("Signup Error: ", error.message);
      return error.message;
    }
  },

  createRecipe: async (_, args, context, info) => {
    try {
      //check if recipe already exists, if it does return existing recipe
      const userId = await getUserId(context);
      const existingRecipe = await getRecipe(context, args.title, userId);
      if (existingRecipe) return existingRecipe;

      //else create new recipe
      const recipe = await context.db.mutation.createRecipe(
        {
          data: {
            title: args.title,
            prepTime: args.prepTime,
            servings: args.servings,
            image: args.image,
            url: args.url,
            createdBy: { connect: { id: userId } }
          }
        },
        info
      );
      return recipe;
    } catch (e) {
      console.log("createRecipe Error: ", e.message);
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
      //check if event already exists for this recipe, meal type, and date
      const existingEvent = await context.db.query.events({
        where: {
          mealType: args.mealType,
          date: args.date,
          recipe: {
            id: args.recipe
          }
        }
      });
      if (existingEvent.length) return;

      //else create event
      const event = await context.db.mutation.createEvent(
        {
          data: data
        },
        info
      );
      return event;
    } catch (error) {
      console.log("createEvent Error: ", error.message);
      return error.message;
    }
  },

  createInstruction: async (_, args, context, info) => {
    const data = {
      stepNum: args.stepNum,
      description: args.description,
      recipe: { connect: { id: args.recipe } }
    };
    try {
      //Check if this recipe already created before and has these instructions
      const instructions = await context.db.query.instructions({
        where: {
          stepNum: args.stepNum,
          description: args.description,
          recipe: {
            id: args.recipe
          }
        }
      });

      if (instructions.length) return;

      //If not then add instruction
      const instruction = await context.db.mutation.createInstruction(
        {
          data: data
        },
        info
      );
      return instruction;
    } catch (error) {
      console.log("createInstruction Error: ", error.message);
      return error.message;
    }
  },

  createIngredient: async (_, args, context, info) => {
    const data = {
      name: args.name,
      quantity: args.quantity,
      recipe: { connect: { id: args.recipe } }
    };
    try {
      //Check if this recipe already created before and has these ingredient
      const ingredients = await context.db.query.ingredients({
        where: {
          name: args.name,
          quantity: args.quantity,
          recipe: {
            id: args.recipe
          }
        }
      });
      if (ingredients.length) return;

      //If not then add ingredient
      const ingredient = await context.db.mutation.createIngredient(
        {
          data: data
        },
        info
      );
      return ingredient;
    } catch (error) {
      console.log("createIngredient Error: ", error.message);
      return error.message;
    }
  },

  createSubscription: async (parent, args, context, info) => {
    try {
      const userId = await getUserId(context);
      const charge = await stripe.charges.create({
        amount: 1000,
        currency: "usd",
        source: args.token
      });
      const subscription = await context.db.mutation.createSubscription(
        {
          data: {
            amount: 10,
            currency: "USD",
            user: { connect: { id: userId } },
            charge: charge.id
          }
        },
        info
      );
      await context.db.mutation.updateUser({
        data: {
          isSubscribed: true
        },
        where: {
          id: userId
        }
      });
      return subscription;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
};

module.exports = Mutation;
