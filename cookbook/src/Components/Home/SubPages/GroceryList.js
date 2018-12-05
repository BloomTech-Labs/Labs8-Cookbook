import React, { Component } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import { graphql } from "react-apollo";
import { GET_RECIPES_QUERY } from "./Recipes";
import "react-day-picker/lib/style.css";
import GroceryItem from "./GroceryItem";
import * as math from "mathjs";

class GroceryList extends Component {
  static defaultProps = {
    numberOfMonths: 1
  };
  constructor(props) {
    super(props);
    this.state = {
      from: undefined,
      to: undefined,
      groceryList: []
    };
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined
    };
  }

  handleDayClick = day => {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  };

  handleResetClick = () => {
    this.setState(this.getInitialState());
  };

  handleItemClick = index => {
    let updatedList = this.state.groceryList.slice();
    let item = document.getElementById(updatedList[index].name);
    item.classList.toggle("completed");
    updatedList[index].isCompleted = !updatedList[index].isCompleted;
    this.setState({ groceryList: updatedList });
  };

  generateList = () => {
    if (this.props.data.loading) {
      return <p>Loading...</p>;
    }
    if (this.props.data.recipes && this.props.data.recipes.length) {
      const ingredients = [];
      // loop through all of the user's recipes
      this.props.data.recipes.forEach(recipe =>
        //loop through all of the events for each recipe
        recipe.events.forEach(event => {
          //convert the date strings to date objects for later comparisons
          let eventDate = new Date(event.date);
          let startDate = new Date(this.state.from);
          let stopDate = new Date(this.state.to);

          //if the event's date lies between the chosen start and stop date
          // map through each ingredient and show the quantity and name
          if (eventDate >= startDate && eventDate <= stopDate) {
            recipe.ingredients.forEach(ingredient => {
              if (ingredient.name in ingredients) {
                const curQuantity = ingredients[ingredient.name];
                const newQuantity = ingredient.quantity;
                const totalQuantity = math
                  .add(math.fraction(curQuantity), math.fraction(newQuantity))
                  .toFraction(true);
                ingredients[ingredient.name] = totalQuantity;
              } else {
                ingredients[ingredient.name] = ingredient.quantity;
              }
            });
          }
        })
      );

      const ingredient_list = Object.keys(ingredients).map(i => {
        return {
          id: i.id,
          name: i,
          quantity: ingredients[i],
          isCompleted: false
        };
      });

      this.setState({ groceryList: ingredient_list });
    }
    return null;
  };

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const grocery_list = this.state.groceryList.length ? (
      <div className="item-list">
        {this.state.groceryList.map((i, idx) => (
          <GroceryItem
            key={idx}
            index={idx}
            ingredient={i}
            handleItemClick={this.handleItemClick}
          />
        ))}
      </div>
    ) : null;

    return (
      <div className="grocery-list-page">
        <div className="gen-list-container">
          <p>
            {!from && !to && "Please select the first day."}
            {from && !to && "Please select the last day."}
            {from &&
              to &&
              `Selected from ${from.toLocaleDateString()} to
                    ${to.toLocaleDateString()}`}{" "}
            {from &&
              to && (
                <button className="link" onClick={this.handleResetClick}>
                  Reset
                </button>
              )}
          </p>

          <DayPicker
            numberOfMonths={this.props.numberOfMonths}
            selectedDays={[from, { from, to }]}
            modifiers={modifiers}
            onDayClick={this.handleDayClick}
          />

          <button onClick={this.generateList}>Generate List</button>
        </div>

        <div className="list">
          <div className="list-header">
            Grocery List:{" "}
            {from &&
              to &&
              `${from.toLocaleDateString()} to ${to.toLocaleDateString()}`}{" "}
          </div>
          {grocery_list}
        </div>
      </div>
    );
  }
}

export default graphql(GET_RECIPES_QUERY)(GroceryList);
