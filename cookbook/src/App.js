import React, { Component } from "react";
import "./Styles/css/index.css";

import { Route, withRouter } from "react-router-dom";
import auth from "./Auth/Auth";
import Home from "./Components/Home/Home";
import LandingPage from "./Components/Landing/LandingPage";
import Footer from "./Components/SubComponents/Footer";
import Callback from "./Auth/Callback.js";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Font Awesome Icons:
import { faUtensils, faLink, faTrashAlt, faEdit, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Signup from "./Components/SubComponents/Signup";

library.add(faUtensils, faLink, faTrashAlt, faEdit, faEllipsisV);

class App extends Component {
  state = {
    tryingSilent: true
  };

  async componentDidMount() {
    if (this.props.location.pathname === "/callback") {
      this.setState({ tryingSilent: false });
    } else {
      try {
        const authResult = await auth.silentAuth();
        this.setState({ tryingSilent: false });
        // this.forceUpdate();
      } catch (err) {
        console.log(err.error);
        if (err.error === "login_required") return;
      }
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
    return "Loading App...";
  }
}

export default withRouter(App);
