import React, { Component } from 'react';
import './Styles/css/app.css';

import { Route } from 'react-router-dom';

import LandingPage from './Components/LandingPage';
import Signin from './Components/Signin';
import Signup from './Components/Signup';


class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' Component={LandingPage}/>
        <Route path='/signin' Component={Signin}/>
        <Route path='/signup' Component={Signup}/>
      </div>
    );
  }
}

export default App;
