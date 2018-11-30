import React, { Component } from "react";
import DayPicker, { DateUtils } from 'react-day-picker';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import User from './User';
import 'react-day-picker/lib/style.css';

// const EVENT_QUERY = gql`
//   query ($id: String!){
// 		events (where:{
//       recipe:{
//         createdBy:{
//           id: $id
//         }
//       }
//     }){
//       id
//       date
//     }
//   }
// `

const EVENT_QUERY = gql`
  query ($id: String!){
		user (id: $id) {
      recipes {
        id
        title
        ingredients{
          name
          quantity
        }
        events {
          id
          date
        }
      }
    }
  }
`

class GroceryList extends Component {
  static defaultProps = {
    numberOfMonths: 1,
  };
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }


  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <div className='grocery-list-page'>

        <div className='gen-list-container'>

          <p>
            {!from && !to && 'Please select the first day.'}
            {from && !to && 'Please select the last day.'}
            {from &&
              to &&
              `Selected from ${from.toLocaleDateString()} to
                  ${to.toLocaleDateString()}`}{' '}
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

          <button>Generate List</button>

        </div>

        <div className='list'>
          <div className='list-header'>Grocery List: {from && to && `${from.toLocaleDateString()} to ${to.toLocaleDateString()}`}{' '}</div>
          
          <User>
            {({data}, loading, error) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>

              //query for the current user 
              if (data.currentUser) {
              return (
                <Query query={EVENT_QUERY} variables = {{id: data.currentUser.id}}>
                  {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    return (
                      <div>
                        { //loop through all of the user's recipes
                          data.user.recipes.map(recipe =>
                          //loop through all of the events for each user
                          recipe.events.map(event => {
                            //convert the date strings to date objects for later comparisons
                            let eventDate = new Date(event.date);
                            let startDate = new Date(this.state.from);
                            let stopDate = new Date(this.state.to);

                            //if the event's date lies between the chosen start and stop date
                            // map through each ingredient and show the quantity and name
                            if (eventDate >= startDate && eventDate <= stopDate){
                              return (
                              recipe.ingredients.map(ingredient => 
                                <div key={ingredient.id}>- {ingredient.quantity} {ingredient.name}</div>
                              ))
                            } else {
                              return ''
                            }
                          })
                        )}
                      </div>
                    )
                  }}
                </Query>
                )
                }
                return (
                  <div>loading..</div>
                )
            }}
          </User>

        </div>

      </div>
    
    );
  }
};

export default GroceryList;
