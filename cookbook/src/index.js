import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import history from './Auth/History.js';

const httpLink = new createHttpLink({
    uri: process.env.REACT_APP_BACKEND_URL
  })
  
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})
  

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router history={history}>
            <App />
        </Router>
    </ApolloProvider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();