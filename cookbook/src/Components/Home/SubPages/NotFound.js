//license https://codepen.io/sowmyaseshadri/details/YOEozx

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container">
      <div className="caption">
        <div className="hat-cont">
          <div className="lines" />
          <div className="hat" />
          <div className="left" />
          <div className="top" />
          <div className="left-opp" />
        </div>
        <div className="head-text">
          Recipe not Found! Please click <Link to="/home/recipes">here</Link> to
          go back!
        </div>
      </div>
      <div className="head">
        <div className="pan-wrapper">
          <div className="center">
            <div className="sub-center">
              <div className="egg">
                <div className="yolk" />
              </div>
            </div>
          </div>
          <div className="handle" />
          <div className="handle-sub" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
