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
        <div className="container">
          <Route exact path='/' component={LandingPage}/>
          <Route path='/signin' component={Signin}/>
          <Route path='/signup' component={Signup}/>
        </div>
      </div>
    );
  }
}

export default App;
