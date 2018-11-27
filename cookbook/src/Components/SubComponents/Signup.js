import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { CURRENT_USER_QUERY } from "../Home/SubPages/User";

const CREATE_USER_MUTATION = gql`
  mutation($firstName: String!, $lastName: String!) {
    signup(firstName: $firstName, lastName: $lastName) {
      id
      auth0Sub
      email
      firstName
      lastName
    }
  }
`;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_USER_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {signup => (
          <form
            onSubmit={async e => {
              e.preventDefault();
              await signup();
              this.props.history.replace("/home");
            }}
          >
            <input type="text" name="firstName" onChange={this.handleChange} />
            <input type="text" name="lastName" onChange={this.handleChange} />
            <button type="submit">Complete Signup</button>
          </form>
        )}
      </Mutation>
    );
  }
}

export default Signup;
