import React, { Component } from "react";
import loading from "../designs/Logo/Logo.png";
import auth from "../Auth/Auth";

class Callback extends Component {
  async componentDidMount() {
    await auth.handleAuthentication();
    this.props.history.replace("/home");
  }

  render() {
    return (
      <div>
        <img src={loading} alt="loading" />
        Loading...
      </div>
    );
  }
}

export default Callback;
