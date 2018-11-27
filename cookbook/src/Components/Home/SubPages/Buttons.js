import React, { Component } from "react";


class Buttons extends Component {
  onClick(e) {
    e.preventDefault();
    console.log('works');
  }

  render() {
    return (
      <div className="recipe-inputs">
        <div className="recipe-buttons">
          <button onClick={ (e) => { this.onClick(); } }>Breakfast</button>
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