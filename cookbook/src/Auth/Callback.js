import React, { Component } from "react";
import loading from "../designs/Logo/Logo.png";
import auth from "../Auth/Auth";
import { Query, graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../Components/Home/SubPages/User";
import { Redirect } from "react-router-dom";

const CREATE_USER_MUTATION = gql`
  mutation {
    signup {
      id
      auth0Sub
      email
      firstName
      lastName
    }
  }
`;

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

  createNewUser = async () => {
    await this.props.createUser({
      refetchQueries: [{ query: CURRENT_USER_QUERY }]
    });
  };

  render() {
    if (!this.state.isAuthenticated) {
      return (
        <div>
          <img src={loading} alt="landing" />
        </div>
      );
    } else {
      return (
        <Query {...this.props} query={CURRENT_USER_QUERY}>
          {({ data: { currentUser }, loading, error }) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p>{error.message}</p>;
            if (!currentUser) {
              this.createNewUser();
            }
            return <Redirect to="/home" />;
          }}
        </Query>
      );
    }
  }
}

export default graphql(CREATE_USER_MUTATION, {
  name: "createUser"
})(Callback);
