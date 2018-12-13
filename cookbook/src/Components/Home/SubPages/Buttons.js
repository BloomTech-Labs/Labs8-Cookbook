import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import burgerRed from '../../../designs/Icons/burgerRed.svg';
import burgerWhite from '../../../designs/Icons/burgerWhite.svg';


class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // state to allow button image to toggle
      burgerClicked: false
    }
  }

  // handler specific for lunch button. The lunch icon is an image which requires a different procedure in order to change the image that appears on the screen.
  mealButtonHandlerBurger = (e) =>  {
    e.preventDefault();
    this.setState({burgerClicked: !this.state.burgerClicked });
    if (this.state.type === e.target.name) {
      this.setState({ type: "" });
    } else {
      this.setState({ type: e.target.name });
    }
  };

  handleButtonClass = (button) => {
    if (this.props.type === button) {
      return 'button-selected'
    }
    return 'button-not-selected'
  }


  render() {
    return (
      <div className="recipe-buttons">
        <button 
          className={this.handleButtonClass('breakfast')}
          onClick={this.props.mealButtonHandler}
          name="breakfast">
          <FontAwesomeIcon className='icon' icon='coffee'/> breakfast
        </button>
        <button
          className={this.state.burgerClicked ? 'button-selected' : 'button-not-selected'}
          onClick={this.mealButtonHandlerBurger}
          name="lunch">
          <img src={this.state.burgerClicked ? burgerWhite : burgerRed} alt='burger' className='burger-icon'/> lunch
        </button>
        <button
          className={this.handleButtonClass('dinner')}
          onClick={this.props.mealButtonHandler}
          name="dinner">
          <FontAwesomeIcon className='icon' icon='utensils'/> dinner
        </button>
        <button 
          className={this.handleButtonClass('snack')}
          onClick={this.props.mealButtonHandler}
          name="snack">
          <FontAwesomeIcon className='icon' icon='apple-alt'/> snack
        </button>
        <button 
          className={this.handleButtonClass('dessert')}
          onClick={this.props.mealButtonHandler}
          name="dessert">
          <FontAwesomeIcon className='icon' icon='cookie-bite'/> dessert
        </button>
      </div>
    )
  }
}

export default Buttons;