//This file defines resolvers for Mutation

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserId } = require("../utils");

const Mutation = {
  signup: async (_, args, context, info) => {
    const password = await bcrypt.hash(args.password, 12);
    const user = await context.db.mutation.createUser(
      {
        data: {
          ...args,
          password
        }
      },
      `{ id }`
    );

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    return {
      token,
      user
    };
  },

  login: async (_, args, context, info) => {
    //Get user information from db
    const user = await context.db.query.user(
      { where: { username: args.username } },
      `{ id password }`
    );
    if (!user) {
      throw new Error("No such user found");
    }
    //Validate user info

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    // 3
    return {
      token,
      user
    };
  },

  createRecipe: async (_, args, context, info) => {
    const userId = getUserId(context);
    const recipe = await context.db.mutation.createRecipe(
      {
        data: {
          title: args.title,
          readyInMinutes: args.readyInMinutes,
          servings: args.servings,
          image: args.image,
          createdBy: { connect: { id: userId } }
        }
      },
      info
    );
    return recipe;
  },

  createSubscription: async (parent, args, context, info) => {
    const charge = await stripe.charges.create({
      amount: 1000,
      currency: 'usd',
      // customer: userid,
      source: args.token
    });
    console.log(charge);
    //TODO create actual subscript with userID
  },
  
  };

module.exports = Mutation;
