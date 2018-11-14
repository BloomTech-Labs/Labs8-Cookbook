import React, { Component } from 'react';
import './Styles/css/index.css';

import { Route } from 'react-router-dom';

import LandingPage from './Components/LandingPage';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Footer from './Components/Footer';
import Users from './Components/Users';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' component={LandingPage}/>
        <Route path='/signin' render={ (props) =>
          { return(<Signin {...props} />) } }
        />
        <Route path='/signup' render={ (props) =>
          { return(<Signup {...props} />) } }
        />
        <Route path='/test' render={ (props) =>
          { return(<Users {...props} />) } }
        />
        <Footer />
      </div>
    );
  }
}

export default App;
