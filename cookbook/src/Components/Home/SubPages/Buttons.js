import React, { Component } from "react";


class Buttons extends Component {

  mealButtonHandler = (e) =>  {
    e.preventDefault();
    this.setState({
      type: e.target.name
    })
  };

  handleButtonClass = (button) => {
    if (this.props.type === button) return 'button-selected'
    return 'button-not-selected'
  }

  render() {
    return (
      <div className="recipe-buttons">
        <button 
          className={this.handleButtonClass('breakfast')}
          onClick={this.props.mealButtonHandler}
          name="breakfast">
          breakfast
        </button>
        <button
          className={this.handleButtonClass('lunch')}
          onClick={this.props.mealButtonHandler}
          name="lunch">
          lunch
        </button>
        <button
          className={this.handleButtonClass('dinner')}
          onClick={this.props.mealButtonHandler}
          name="dinner">
          dinner
        </button>
        <button 
          className={this.handleButtonClass('snack')}
          onClick={this.props.mealButtonHandler}
          name="snack">
          snack
        </button>
        <button 
          className={this.handleButtonClass('dessert')}
          onClick={this.props.mealButtonHandler}
          name="dessert">
          dessert
        </button>
      </div>
    )
  }
}

export default Buttons;