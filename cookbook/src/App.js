import React, { Component } from "react";
import "./Styles/css/index.css";

import { Route } from 'react-router-dom';

import Home from "./Components/Home/Home";
import LandingPage from './Components/Landing/LandingPage';
import Footer from "./Components/SubComponents/Footer";
import Callback from './Auth/Callback.js';
import auth from './Auth/Auth.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Font Awesome Icons:
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
library.add(faUtensils);


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
            return (<LandingPage {...props} />) 
            }}
          />
          <Route path='/home' render={ (props) => {
            return (<Home {...props} />)
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
