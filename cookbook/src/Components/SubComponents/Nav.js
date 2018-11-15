import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <ul className="home-navbar">
      <li>
        <Link to="/home/create">Create</Link>
      </li>
      <li>
        <Link to="/home/recipes">Recipes</Link>
      </li>
      <li>
        <Link to="/home/calendar">Calendar</Link>
      </li>
      <li>
        <Link to="/home/dashboard">Grocery List</Link>
      </li>
      <li>
        <Link to="/home/settings">Settings</Link>
      </li>
      <li>
        <Link to="/home/billing">Billing</Link>
      </li>
    </ul>
  );
};

export default Nav;
