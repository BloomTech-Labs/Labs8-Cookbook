import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Create from "./Create";
import Recipes from "./Recipes";
import Calendar from "./Calendar";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
// import Billing from "./Billing";

class Home extends Component {
  render() {
    let current = this.props.location.pathname.split("/").pop();
    current =
      current === "home" ? null : current[0].toUpperCase() + current.slice(1);
    return (
      <React.Fragment>
        <Header auth={this.props.auth} />
        <div className="home-container">
          <div className="home-path">
            <span>
              <Link to="/home">Home</Link> / {current}
            </span>
            <button className="signout-btn">Signout</button>
          </div>
          <Nav />
          <div className="home-content">
            <Route path="/home/create" component={Create} />
            <Route path="/home/recipes" component={Recipes} />
            <Route path="/home/calendar" component={Calendar} />
            <Route path="/home/dashboard" component={Dashboard} />
            <Route path="/home/settings" component={Settings} />
            {/* <Route path="/home/billing" component={Billing} /> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
