//This file defines resolvers for Mutation
const stripe = require("../stripe");

const { getUserId } = require("../utils");

const Mutation = {
  signup: async (_, args, context, info) => {
    const newUser = await context.db.mutation.signup(
      {
        data: {
          auth0Sub: context.user.sub,
          firstName: args.firstName,
          lastName: args.lastName,
          email: context.user.email
        }
      },
      info
    );
    return newUser;
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
    const user = await context.db.query.user({
      where: {
        auth0Sub: context.user.sub
      }
    });

    const recipe = await context.db.mutation.createRecipe(
      {
        data: {
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
