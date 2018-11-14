import React, { Component } from "react";
import "./Styles/css/index.css";

import { Route } from 'react-router-dom';

import Home from "./Components/Home/Home";
import LandingPage from './Components/Landing/LandingPage';
import Footer from "./Components/SubComponents/Footer";
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
          <Route exact path='/' render={ (props) =>{ 
            return (<LandingPage auth={auth} {...props} />) 
            }}
          />
          <Route path='/home' render={ (props) => {
            return (<Home auth={auth} {...props} />)
            }}
          />
          <Route path='/callback' render={ (props) =>{
            handleAuthentication(props);
            return (<Callback {...props} />)
            }}
          />
          <Footer />
      </div>
    );
  }
}

export default App;
