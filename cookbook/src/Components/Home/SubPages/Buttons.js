import React, { Component } from "react";


class Buttons extends Component {
  render() {
    return (
      <div className="recipe-inputs">
        <div className="recipe-buttons">
          <button>Breakfast</button>
          <button>Lunch</button>
          <button>Dinner</button>
          <button>Dessert</button>
          <button>Snack</button>
          <div className="recipe-servings">
            Servings
          </div>
          <button>Save</button>
        </div>
      </div>
    )
  }
}

export default Buttons;