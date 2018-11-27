import React, { Component } from "react";
import Logo from "../../designs/Logo/CookBookLogo.svg";
import NavIcon from "./NavIcon";
import { Link } from "react-router-dom";
import auth from "../../Auth/Auth.js";
import User from "../Home/SubPages/User";

class Header extends Component {
  render() {
    const { isAuthenticated } = auth;

    return (
      <div className="header">
        <Link className="link" to="/home">
          <img className="logo" src={Logo} alt="COOKBOOK logo" />
        </Link>
        <User>
          {({ data: { currentUser } }) => {
            if (currentUser)
              return (
                <p>
                  Welcome {currentUser.firstName} {currentUser.lastName}
                </p>
              );
            return null;
          }}
        </User>
        {isAuthenticated() && (
          <div className="signout" onClick={auth.logout}>
            Sign Out
          </div>
        )}

        <NavIcon className="nav-icon" />
      </div>
    );
  }
}

export default Header;
