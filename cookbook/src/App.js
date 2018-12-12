import React, { Component } from "react";
import "./Styles/css/index.css";

import { Route, withRouter } from "react-router-dom";
import auth from "./Auth/Auth";
import Home from "./Components/Home/Home";
import LandingPage from "./Components/Landing/LandingPage";
import Footer from "./Components/SubComponents/Footer";
import Callback from "./Auth/Callback.js";
import { ToastContainer } from "react-toastify";
import { library } from "@fortawesome/fontawesome-svg-core";
import "react-toastify/dist/ReactToastify.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Font Awesome Icons:
import {
  faUtensils,
  faLink,
  faTrashAlt,
  faEdit,
  faEllipsisV
} from "@fortawesome/free-solid-svg-icons";
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
        await auth.silentAuth();
        this.setState({ tryingSilent: false });
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
          <ToastContainer
            className="toast-container"
            toastClassName="toast-content"
            position="bottom-center"
            autoClose={3000}
            draggable
            closeOnClick
          />
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route exact path="/callback" component={Callback} />
          <Footer />
        </div>
      );
    }
    return "Loading App...";
  }
}

export default withRouter(App);
