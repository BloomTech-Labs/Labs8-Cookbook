import React, { Component } from "react";
import loading from "../designs/Logo/Logo.png";
import auth from "../Auth/Auth";
import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "../Components/Home/SubPages/User";
import { Redirect } from "react-router-dom";

class Callback extends Component {
  state = {
    isAuthenticated: false
  };

  async componentDidMount() {
    try {
      const authResult = await auth.handleAuthentication();
      if (authResult) {
        this.setState({ isAuthenticated: true });
      }
    } catch (error) {
      this.props.history.replace("/");
    }
  }

  render() {
    if (!this.state.isAuthenticated) {
      return (
        <div>
          <img src={loading} alt="lading" />
        </div>
      );
    } else {
      return (
        <Query {...this.props} query={CURRENT_USER_QUERY}>
          {({ data: { currentUser }, loading, error }) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p>{error.message}</p>;
            if (!currentUser) return <Redirect to="/signup" />;
            return <Redirect to="/home" />;
          }}
        </Query>
      );
    }
  }
}

export default Callback;
