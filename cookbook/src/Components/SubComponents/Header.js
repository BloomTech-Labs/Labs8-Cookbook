import React, { Component } from "react";
import Logo from "../../designs/Logo/CookBookLogo.svg";
import { Link } from "react-router-dom";
import auth from "../../Auth/Auth.js";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class Header extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  logout() {
    auth.logout();
  }

  //change routes on nav click
  handleRedirect = path => {
    this.props.history.push(path);
  };

  //change routes on nav click
  //if the user clicks on the current page it will toggle the nav bar
  handlePhoneRedirect = path => {
    if (this.props.location.pathname.includes(path)) this.togglePhoneNav();
    else this.props.history.push(path);
  };

  //determine whether a nav item is active, shown, or hidden
  handlePhoneNavClass = path => {
    if (this.props.location.pathname.includes(path)) {
      return `${path}-phone-nav-active`;
    }
    if (this.state.showPhoneNav) {
      return `${path}-phone-nav-show`;
    }
    return "phone-nav-hide";
  };

  //toggle the expanded phone nav bar
  togglePhoneNav = () => {
    this.setState({ showPhoneNav: !this.state.showPhoneNav });
  };

  //determine the className of the phone toggle button for appropriate color change
  handleTogglePhoneNavClass = () => {
    if (this.props.location.pathname.includes("create"))
      return "create-toggle-phone-nav";
    if (this.props.location.pathname.includes("recipe"))
      return "recipe-toggle-phone-nav";
    if (this.props.location.pathname.includes("calendar"))
      return "calendar-toggle-phone-nav";
    if (this.props.location.pathname.includes("dashboard"))
      return "dashboard-toggle-phone-nav";
    if (this.props.location.pathname.includes("settings"))
      return "settings-toggle-phone-nav";
  };

  //determine if a navbar item should go across the entire screen or not
  handleNormalNavClass = path => {
    if (this.props.location.pathname.includes(path)) {
      return `${path}-normal-nav-active`;
    }
    return `${path}-normal-nav-inactive`;
  };

  render() {
    const { isAuthenticated } = auth;

    return (
      <div className="header">
        <Link className="link" to="/home/recipes">
          <img className="logo" src={Logo} alt="COOKBOOK logo" />
        </Link>
        <span className="title">COOKBOOK</span>
        {isAuthenticated() && (
          <div className="signout" onClick={this.logout.bind(this)}>
            logout
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Header);
