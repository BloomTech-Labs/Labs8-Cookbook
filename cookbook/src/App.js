import React, { Component } from 'react';
import './Styles/css/index.css';

import { Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import LandingPage from './Components/LandingPage';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Footer from './Components/Footer';

// apollo client
const client = new ApolloClient({
  uri: 'https://lambda-cookbook.herokuapp.com/'
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="app">
          <Route exact path='/' component={LandingPage}/>
          <Route path='/signin' render={ (props) =>
            { return(<Signin {...props} />) } }
          />
          <Route path='/signup' render={ (props) =>
            { return(<Signup {...props} />) } }
          />
          <Footer />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
