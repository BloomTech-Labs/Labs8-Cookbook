import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'cookbookproject.auth0.com',
    clientID: '7klW1TtJaes7ZrekqNXavbJrwWQLkDf0',
    redirectUri: 'https://lambda-cookbook.netlify.com',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}