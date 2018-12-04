import React, { Component } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import { ApolloConsumer } from "react-apollo";
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
      recipes: []
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

  generateList = () => {
    const ingredients = {};
    if (this.state.recipes.length) {
      //loop through all of the user's recipes
      this.state.recipes.map(recipe =>
        //loop through all of the events for each recipe
        recipe.events.map(event => {
          //convert the date strings to date objects for later comparisons
          let eventDate = new Date(event.date);
          let startDate = new Date(this.state.from);
          let stopDate = new Date(this.state.to);

          //if the event's date lies between the chosen start and stop date
          // map through each ingredient and show the quantity and name
          if (eventDate >= startDate && eventDate <= stopDate) {
            recipe.ingredients.map(ingredient => {
              if (ingredient.name in ingredients) {
                const curQuantity = ingredients[ingredient.name];
                const newQuantity = ingredient.quantity;
                const totalQuantity = math
                  .add(math.fraction(curQuantity), math.fraction(newQuantity))
                  .toFraction(true);
                ingredients[ingredient.name] = totalQuantity;
                // ingredients[ingredient.name] + ingredient.quantity;
              } else {
                ingredients[ingredient.name] = ingredient.quantity;
              }
            });
          }
        })
      );

      const ingredient_list = Object.keys(ingredients).map(i => {
        return {
          name: i,
          quantity: ingredients[i]
        };
      });
      console.log(ingredient_list);
      return (
        <div>
          {ingredient_list.map((i, idx) => {
            return <GroceryItem key={idx} ingredient={i} />;
          })}
        </div>
      );
    }
    return null;
  };

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <ApolloConsumer>
        {client => (
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

              <button
                onClick={async () => {
                  const { data, loading, error } = await client.query({
                    query: GET_RECIPES_QUERY
                  });
                  this.setState({ recipes: data.recipes });
                }}
              >
                Generate List
              </button>
            </div>

            <div className="list">
              <div className="list-header">
                Grocery List:{" "}
                {from &&
                  to &&
                  `${from.toLocaleDateString()} to ${to.toLocaleDateString()}`}{" "}
              </div>
              <div>{this.generateList()}</div>
              {/* <Query query={GET_RECIPES_QUERY}>
              {({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>;
                if (error) return <div>Error</div>;
  
                const ingredients = {};
                //loop through all of the user's recipes
                data.recipes.map(recipe =>
                  //loop through all of the events for each recipe
                  recipe.events.map(event => {
                    //convert the date strings to date objects for later comparisons
                    let eventDate = new Date(event.date);
                    let startDate = new Date(this.state.from);
                    let stopDate = new Date(this.state.to);
  
                    //if the event's date lies between the chosen start and stop date
                    // map through each ingredient and show the quantity and name
                    if (eventDate >= startDate && eventDate <= stopDate) {
                      return recipe.ingredients.map(ingredient => {
                        if (ingredient.name in ingredients) {
                          ingredients[ingredient.name] =
                            ingredients[ingredient.name] + ingredient.quantity;
                        } else {
                          ingredients[ingredient.name] = ingredient.quantity;
                        }
                      });
                    }
                  })
                );
  
                const ingredient_list = Object.keys(ingredients).map(i => {
                  return {
                    name: i,
                    quantity: ingredients[i]
                  };
                });
                console.log(ingredient_list);
                return (
                  <div>
                    {ingredient_list.map((i, idx) => {
                      return <GroceryItem key={idx} ingredient={i} />;
                    })}
                  </div>
                );
              }}
            </Query> */}
            </div>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default GroceryList;
