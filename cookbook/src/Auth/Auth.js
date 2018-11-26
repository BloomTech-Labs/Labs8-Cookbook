import auth0 from "auth0-js";

// Change callback URL based on where the app is hosted
let devEndpoint = "http://localhost:3000/callback";
let prodEndpoint = "https://lambda-cookbook.netlify.com/callback";

class Auth {
  constructor() {
    this.authFlag = "isLoggedIn";

    this.auth0 = new auth0.WebAuth({
      domain: "cookbookproject.auth0.com",
      clientID: "7klW1TtJaes7ZrekqNXavbJrwWQLkDf0",
      redirectUri:
        process.env.REACT_APP_CURR_ENV === "dev" ? devEndpoint : prodEndpoint,
      responseType: "token id_token",
      scope: "openid email"
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  getIdToken = () => {
    return this.idToken;
  };

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve(authResult);
      });
    });
  };

  setSession = authResult => {
    // Set the time that the Access Token will expire at
    this.expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    //Save token returned by auth0 to auth
    this.idToken = authResult.idToken;
    //Set authFlag in local storage to true
    localStorage.setItem(this.authFlag, JSON.stringify(true));
  };

  logout = () => {
    //Set authFlag in local storage to false
    localStorage.setItem(this.authFlag, JSON.stringify(false));
    this.auth0.logout({
      returnTo: "http://localhost:3000",
      clientID: "7klW1TtJaes7ZrekqNXavbJrwWQLkDf0"
    });
  };

  isAuthenticated = () => {
    // Check whether the current time is past the token's expiry time
    return new Date().getTime() < this.expiresAt;

    // return JSON.parse(localStorage.getItem(this.authFlag));
  };
}

const auth = new Auth();
export default auth;
