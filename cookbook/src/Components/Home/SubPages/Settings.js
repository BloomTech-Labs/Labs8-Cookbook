import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const CREATE_SUBSCRIPTION_MUTATION = gql`
  mutation createSubscription($token: String!) {
    createSubscription(token: $token) {
      id
      amount
      charge
      user {
        id
        email
      }
    }
  }
`;

export default class Settings extends React.Component {
  onToken = async (res, createSubscription) => {
    try {
      console.log(res);
      await createSubscription({
        variables: {
          token: res.id
        }
      });
    } catch (error) {
      console.log("FE Stripe error: ", error.message);
      return error.message;
    }
  };

  render() {
    return (
      <div className="settings-page">
        <Mutation mutation={CREATE_SUBSCRIPTION_MUTATION}>
          {createSubscription => (
            <StripeCheckout
              stripeKey="pk_test_FyA4hajfxfEQ4jCcEaeQtTIL"
              name="Cookbook Subscription"
              zipcode={false}
              amount={1000}
              currency="USD"
              email="cookbook_project@yahoo.com"
              token={res => this.onToken(res, createSubscription)}
            />
          )}
        </Mutation>
      </div>
    );
  }
}
