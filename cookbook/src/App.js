import React, { Component } from "react";
import "./Styles/css/index.css";

import { Route, withRouter } from "react-router-dom";
import auth from "./Auth/Auth";
import Home from "./Components/Home/Home";
import LandingPage from "./Components/Landing/LandingPage";
import Footer from "./Components/SubComponents/Footer";
import Callback from './Auth/Callback.js';
import auth from './Auth/Auth.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Font Awesome Icons:
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import Signup from "./Components/SubComponents/Signup";

library.add(faUtensils);


class App extends Component {
  state = {
    tryingSilent: true
  };

  async componentDidMount() {
    if (this.props.location.pathname === "/callback") {
      this.setState({ tryingSilent: false });
      return;
    }
    try {
      await auth.silentAuth();
      this.setState({ tryingSilent: false });
      this.forceUpdate();
    } catch (err) {
      if (err.error === "login_required") return;
      console.log(err.error);
    }
  }

  render() {
    if (!this.state.tryingSilent) {
      return (
        <div className="app">
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route exact path="/callback" component={Callback} />
          <Route exact path="/signup" component={Signup} />
          <Footer />
        </div>
      );
    }
    return "Loading";
  }
}

export default withRouter(App);
