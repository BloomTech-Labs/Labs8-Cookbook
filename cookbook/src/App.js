import React, { Component } from "react";
import "./Styles/css/index.css";

import { Route, withRouter } from "react-router-dom";
import auth from "./Auth/Auth";
import Home from "./Components/Home/Home";
import LandingPage from "./Components/Landing/LandingPage";
import Footer from "./Components/SubComponents/Footer";
import Callback from "./Auth/Callback.js";

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
          <Footer />
        </div>
      );
    }
    return "Loading";
  }
}

export default withRouter(App);
