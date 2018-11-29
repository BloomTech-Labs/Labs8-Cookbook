import React, { Component } from "react";


class Buttons extends Component {

  mealButtonHandler = (e) =>  {
    e.preventDefault();
    this.setState({
      type: e.target.name
    })
  };

  render() {
    return (
      <div className="recipe-inputs">
        <div className="recipe-buttons">
          <button 
            onClick={this.props.mealButtonHandler}
            name="breakfast">
            {this.props.type === "breakfast" ? 'Selected' : 'Breakfast'}
          </button>
          <button
            onClick={this.props.mealButtonHandler}
            name="lunch">
            {this.props.type === "lunch" ? 'Selected' : 'Lunch'}
          </button>
          <button
            onClick={this.props.mealButtonHandler}
            name="dinner">
            {this.props.type === "dinner" ? 'Selected' : 'Dinner'}
          </button>
          <button 
            onClick={this.props.mealButtonHandler}
            name="snack">
            {this.props.type === "snack" ? 'Selected' : 'Snack'}
          </button>
          <button 
            onClick={this.props.mealButtonHandler}
            name="dessert">
            {this.props.type === "dessert" ? 'Selected' : 'Dessert'}
          </button>
        </div>
      </div>
    )
  }
}

export default Buttons;