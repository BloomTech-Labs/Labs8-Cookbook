import React, { Component } from 'react';

class Signin extends Component {
    goTo(route) {
        this.props.history.push(`/${route}`)
      }
    
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
            
                <button
                  className="btn-margin"
                  onClick={this.goTo.bind(this, '')}
                >
                  Home
                </button>
                {
                  !isAuthenticated() && (
                      <button
                        className="btn-margin"
                        onClick={this.login.bind(this)}
                      >
                        Log In
                      </button>
                    )
                }
                {
                  isAuthenticated() && (
                      <button
                        className="btn-margin"
                        onClick={this.logout.bind(this)}
                      >
                        Log Out
                      </button>
                    )
                }
          </div>
        );
      }
}

export default Signin;