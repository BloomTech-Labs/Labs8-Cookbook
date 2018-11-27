import React, { Component } from "react";


class Buttons extends Component {
  constructor(props) {
    super(props);
    this.isBreakfast = this.isBreakfast.bind(this);
    this.isLunch = this.isBreakfast.bind(this);
    this.state = {
      type: "",
    }
  }

  isBreakfast() {
    this.setState(() => {
      return {
        type: "breakfast"
      };
    });
    console.log(this.state.type)
  }

  isLunch() {
    this.setState(() => {
      return {
        type: "lunch"
      };
    });
    console.log(this.state.type)
  }

  render() {
    return (
      <div className="recipe-inputs">
        <div className="recipe-buttons">
          <button onClick={this.isBreakfast}>
            {this.state.type ? 'Breakfast Added' : 'Breakfast'}
          </button>
          <button onClick={this.isLunch}>
            {this.state.type ? 'Lunch Added' : 'Lunch'}
          </button>
          <button>Dinner</button>
          <button>Dessert</button>
          <button>Snack</button>
          <button>Save</button>
        </div>
      </div>
    )
  }
}

export default Buttons;