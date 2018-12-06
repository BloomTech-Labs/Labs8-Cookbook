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
        <form className="user-info">
          <div className="form-group">
            <label className="control-label">First Name</label>
            <input
              type="text"
              id="user-fn"
              value={this.props.userData.currentUser.firstName}
            />
          </div>
          <div className="form-group">
            <label className="control-label">Last Name</label>
            <input
              type="text"
              id="user-ln"
              value={this.props.userData.currentUser.lastName}
            />
          </div>
          <div className="form-group">
            <label className="control-label">Email Name</label>
            <input
              type="email"
              id="user-email"
              value={this.props.userData.currentUser.email}
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="control-label">Membership</label>
            <input
              type="text"
              id="usser-status"
              value={
                this.props.userData.currentUser.isSubscribed
                  ? "Premium User"
                  : "Free User"
              }
              readOnly
            />
          </div>
          <button className="settings-btn save-btn">
            <span>Save</span>
          </button>
          {this.props.userData.currentUser.isSubscribed ? (
            <span>
              <button className="settings-btn cancel-btn">
                <span>Cancel Subscription</span>
              </button>
            </span>
          ) : (
            <StripeCheckout
              stripeKey="pk_test_FyA4hajfxfEQ4jCcEaeQtTIL"
              name="Cookbook Subscription"
              zipcode={false}
              amount={1000}
              currency="USD"
              email={this.props.userData.currentUser.email}
              token={res => this.onToken(res, this.props.createSubscription)}
            >
              <button className="settings-btn stripe-btn">
                <span>Subscribe</span>
              </button>
            </StripeCheckout>
          )}
        </form>
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
