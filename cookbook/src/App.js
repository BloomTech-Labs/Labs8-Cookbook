import React, { Component } from "react";
import "./Styles/css/index.css";

import { Route, withRouter } from "react-router-dom";

import Home from "./Components/Home/Home";
import LandingPage from "./Components/Landing/LandingPage";
import Footer from "./Components/SubComponents/Footer";
import Callback from "./Auth/Callback.js";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route exact path="/callback" component={Callback} />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
