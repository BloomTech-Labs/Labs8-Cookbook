import React, { Component } from 'react';

class Signin extends Component {  
  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        {
          !isAuthenticated() && (
            <button
              className="btn-margin"
              onClick={this.login.bind(this)}
            >
              Sign In or Register
            </button>
          )
        }
        {
          isAuthenticated() && (
            <button
              className="btn-margin"
              onClick={this.logout.bind(this)}
            >
              Sign Out
            </button>
          )
        }
      </div>
    );
  }
}

export default Signin;