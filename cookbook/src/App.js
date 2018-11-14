import React, { Component } from "react";
import "./Styles/css/index.css";

import { Route } from 'react-router-dom';

import Home from "./Components/Home";
import LandingPage from './Components/LandingPage';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Footer from "./Components/Footer";
import Callback from './Auth/Callback.js';
import Auth from './Auth/Auth.js';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {
  render() {
    return (
      <div className="app">
          <Route exact path='/' component={LandingPage}/>
          <Route path="/home" component={Home} />
          <Route path='/signin' render={ (props) =>
            { return(<Signin auth={auth} {...props} />) } }
          />
          <Route path='/signup' render={ (props) =>
            { return(<Signup auth={auth} {...props} />) } }
          />
          <Route path='/callback' render={ (props) =>
            { handleAuthentication(props);
              return(<Callback {...props} />) } }
          />
          <Footer />
      </div>
    );
  }
}

export default App;
