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

const UPDATE_USER_MUTATION = gql`
  mutation($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      id
      email
      firstName
      lastName
      isSubscribed
    }
  }
`;

class Settings extends React.Component {
  state = {
    fname: null,
    lname: null,
    error: null,
    success_msg: null
  };

  fetchUser = () => {
    if (this.props.userData.currentUser) {
      return {
        firstName:
          this.state.fname || this.props.userData.currentUser.firstName || "",
        lastName:
          this.state.lname || this.props.userData.currentUser.lastName || ""
      };
    }
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onToken = async (res, createSubscription) => {
    try {
      const { data } = await createSubscription({
        variables: {
          token: res.id
        },
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
      });
      if (data.createSubscription) {
        this.setState({
          success_msg: "You've subscribed successfully!"
        });
      }
    } catch (error) {
      return error.message;
    }
  };

  updateUserName = async (fn, ln) => {
    try {
      let data = {};
      if (fn) data.firstName = fn;
      if (ln) data.lastName = ln;
      if (fn || ln) {
        const newNames = await this.props.updateUser({
          variables: {
            data: data,
            where: { id: this.props.userData.currentUser.id }
          }
        });
        console.log(newNames);
        this.setState({
          success_msg: "Your names have been successfully updated!"
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    }
  };

  cancelSubscription = async () => {
    try {
      let data = { isSubscribed: false };
      await this.props.updateUser({
        variables: {
          data,
          where: { id: this.props.userData.currentUser.id }
        },
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
      });
      this.setState({
        success_msg: "Your subscription has been successfully cancelled!"
      });
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    }
  };

  render() {
    if (this.props.userData.loading) {
      return <div>Loading...</div>;
    } else {
      const { firstName, lastName } = this.fetchUser();
      const error = this.state.error ? (
        <div className="error-message">{this.state.error}</div>
      ) : null;
      const success = this.state.success_msg ? (
        <div className="success-message">{this.state.success_msg}</div>
      ) : null;
      return (
        <div className="settings-page">
          <form className="user-info">
            <div className="form-group">
              <label className="control-label">First Name</label>
              <input
                type="text"
                name="fname"
                id="user-fn"
                value={firstName}
                onChange={this.changeHandler}
              />
            </div>
            <div className="form-group">
              <label className="control-label">Last Name</label>
              <input
                type="text"
                name="lname"
                id="user-ln"
                value={lastName}
                onChange={this.changeHandler}
              />
            </div>
            <div className="form-group">
              <label className="control-label">Email</label>
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
                id="user-status"
                value={
                  this.props.userData.currentUser.isSubscribed
                    ? "Premium User"
                    : "Free User"
                }
                readOnly
              />
            </div>
            <div className="form-group" />
          </form>
          <div className="buttons">
            <button
              type="button"
              className="settings-btn save-btn"
              onClick={() =>
                this.updateUserName(this.state.fname, this.state.lname)
              }
            >
              Save
            </button>
            {this.props.userData.currentUser.isSubscribed ? (
              <button
                type="button"
                className="settings-btn cancel-btn"
                onClick={this.cancelSubscription}
              >
                Cancel
              </button>
            ) : (
              <StripeCheckout
                stripeKey="pk_test_FyA4hajfxfEQ4jCcEaeQtTIL"
                name="Cookbook Subscription"
                zipcode={false}
                amount={1000}
                currency="USD"
                email={this.props.userData.currentUser.email}
                token={res => this.onToken(res, this.props.createSubscription)}
                // closed={this.onClose}
              >
                <button className="settings-btn stripe-btn">Subscribe</button>
              </StripeCheckout>
            )}
          </div>
          {success}
          {error}
        </div>
      );
    }
  }
}

const getUserQuery = graphql(CURRENT_USER_QUERY, { name: "userData" });
const createSubscriptionMutation = graphql(CREATE_SUBSCRIPTION_MUTATION, {
  name: "createSubscription"
});
const updateUserMutation = graphql(UPDATE_USER_MUTATION, {
  name: "updateUser"
});

export default compose(
  getUserQuery,
  createSubscriptionMutation,
  updateUserMutation
)(Settings);
