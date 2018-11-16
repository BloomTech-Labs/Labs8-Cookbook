//This file defines resolvers for Mutation
const stripe = require("../stripe");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const { getUserId } = require("../utils");

const jwks = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 1,
  jwksUri: 'https://cookbookproject.auth0.com/.well-known/jwks.json'
});

const parseIdToken = idToken =>
  new Promise((resolve, reject) => {
    const { header, payload } = jwt.decode(idToken, { complete: true });
    if (!header || !header.kid || !payload) {
      reject(new Error('Invalid token.'));
    }
    jwks.getSigningKey(header.kid, (fetchError, key) => {
      if (fetchError) {
        reject(new Error('Error getting signing key: ' + fetchError.message));
      }
      return jwt.verify(
        idToken,
        key.publicKey,
        { algorithms: ['RS256'] },
        (verificationError, decoded) => {
          if (verificationError) {
            reject('Verification error: ' + verificationError.message);
          }
          resolve(decoded);
        }
      );
    });
  });

const Mutation = {
  signup: async (parent, { idToken }, context, info) => {
    let token = null;
    try {
      token = await parseIdToken(idToken);
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
    const auth0Id = token.sub;
    const user = await context.db.query.user({ where: { auth0Id } }, info);
    if (user) {
      // Just in case this user is logging in just after verifying their email:
      if (user.emailVerified !== token.email_verified) {
        return context.db.mutation.updateUser({ where: { auth0Id }, data: { emailVerified: token.email_verified } }, info);
      }
      return user;
    }
    return context.db.mutation.createUser({
      data: {
        email: token.email,
        emailVerified: token.email_verified,
        auth0Id: token.sub
      }
    });
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
