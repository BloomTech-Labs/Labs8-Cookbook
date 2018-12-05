import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../SubPages/User";

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

class Settings extends React.Component {
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
    if (this.props.userData.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="settings-page">
        <div className="user-info">
          <h3>First Name:</h3>
          <span>{this.props.userData.currentUser.firstName}</span>
          <h3>Last Name:</h3>
          <span>{this.props.userData.currentUser.lastName}</span>
          <h3>Email:</h3>
          <span>{this.props.userData.currentUser.email}</span>
        </div>
        <StripeCheckout
          stripeKey="pk_test_FyA4hajfxfEQ4jCcEaeQtTIL"
          name="Cookbook Subscription"
          zipcode={false}
          amount={1000}
          currency="USD"
          email={this.props.userData.currentUser.email}
          token={res => this.onToken(res, this.props.createSubscription)}
        >
          <button className="stripe-btn">
            <span>Subscribe</span>
          </button>
        </StripeCheckout>
      </div>
    );
  }
}

const getUserQuery = graphql(CURRENT_USER_QUERY, { name: "userData" });
const createSubscriptionMutation = graphql(CREATE_SUBSCRIPTION_MUTATION, {
  name: "createSubscription"
});

export default compose(
  getUserQuery,
  createSubscriptionMutation
)(Settings);
