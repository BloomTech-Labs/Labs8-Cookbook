import React, { Component } from 'react';
import Auth from '../Auth/Auth.js';

const auth = new Auth();

class Signin extends Component {
    goTo(route) {
        this.props.history.push(`/${route}`)
      }
    
      login() {
        auth.login();
      }
    
      logout() {
        auth.logout();
      }
    
      render() {
        const { isAuthenticated } = auth;
    
        return (
          <div>
            
                <button
                  className="btn-margin"
                  onClick={this.goTo.bind(this, '/')}
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