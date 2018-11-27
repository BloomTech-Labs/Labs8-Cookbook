import React, { Component } from "react";


class Buttons extends Component {
  constructor() {
    super();
    this.isBreakfast = this.isBreakfast.bind(this);
    this.isLunch = this.isLunch.bind(this);
    this.isDinner = this.isDinner.bind(this);
    this.state = {
      type: ""
    }
  }

  isBreakfast = (e) =>  {
    e.preventDefault(); 
    this.setState({type: "breakfast"})
    console.log(this.state.type)
  };

  isLunch = (e) => {
    e.preventDefault();
    this.setState({type: "lunch"})
    console.log(this.state.type)
  };

  isDinner = (e) => {
    e.preventDefault();
    this.setState({type: "dinner"})
    console.log(this.state.type)
  };

  isSnack = (e) => {
    e.preventDefault();
    this.setState({type: "snack"})
    console.log(this.state.type)
  };

  isDessert = (e) => {
    e.preventDefault();
    this.setState({type: "dessert"})
    console.log(this.state.type)
  };

  render() {
    return (
      <div className="recipe-inputs">
        <div className="recipe-buttons">
          <button 
            onClick={this.isBreakfast}>
            {this.state.type === "breakfast" ? 'Breakfast Added' : 'Breakfast'}
          </button>
          <button
            onClick={this.isLunch}>
            {this.state.type === "lunch" ? 'Lunch Added' : 'Lunch'}
          </button>
          <button
            onClick={this.isDinner}>
            {this.state.type === "dinner" ? 'Dinner Added' : 'Dinner'}
          </button>
          <button 
            onClick={this.isSnack}>
            {this.state.type === "snack" ? 'Snack Added' : 'Snack'}
          </button>
          <button 
            onClick={this.isSnack}>
            {this.state.type === "dessert" ? 'Dessert Added' : 'Dessert'}</button>
          <button>Save</button>
        </div>
      </div>
    )
  }
}

export default Buttons;