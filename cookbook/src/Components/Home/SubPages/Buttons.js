import React, { Component } from "react";


class Buttons extends Component {
  constructor() {
    super();
    this.isBreakfast = this.isBreakfast.bind(this);
    this.isLunch = this.isLunch.bind(this);
    this.isDinner = this.isDinner.bind(this);
    this.isSnack = this.isSnack.bind(this);
    this.isDessert = this.isDessert.bind(this);
    this.state = {
      type: ""
    }
  }

  isBreakfast = (e) =>  {
    e.preventDefault(); 
    this.setState({type: "breakfast"})
  };

  isLunch = (e) => {
    e.preventDefault();
    this.setState({type: "lunch"})
  };

  isDinner = (e) => {
    e.preventDefault();
    this.setState({type: "dinner"})
  };

  isSnack = (e) => {
    e.preventDefault();
    this.setState({type: "snack"})
  };

  isDessert = (e) => {
    e.preventDefault();
    this.setState({type: "dessert"})
  };

  render() {
    return (
      <div className="recipe-inputs">
        <div className="recipe-buttons">
          <button 
            onClick={this.isBreakfast}>
            {this.state.type === "breakfast" ? 'Selected' : 'Breakfast'}
          </button>
          <button
            onClick={this.isLunch}>
            {this.state.type === "lunch" ? 'Selected' : 'Lunch'}
          </button>
          <button
            onClick={this.isDinner}>
            {this.state.type === "dinner" ? 'Selected' : 'Dinner'}
          </button>
          <button 
            onClick={this.isSnack}>
            {this.state.type === "snack" ? 'Selected' : 'Snack'}
          </button>
          <button 
            onClick={this.isDessert}>
            {this.state.type === "dessert" ? 'Selected' : 'Dessert'}
          </button>
          <button>Save</button>
        </div>
      </div>
    )
  }
}

export default Buttons;