import React, { Component } from "react";
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import User from './User';
import Modal from '../../SubComponents/Modal';
import DatePicker from "../../SubComponents/DatePicker.js";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const propTypes = {}

const RE_CREATE_EVENT = gql`
  mutation($date: String!, $mealType: String!, $recipe: String!) {
    createEvent(date: $date, mealType: $mealType, recipe: $recipe) {
      id
      mealType
      date
      recipe {
        id
        title
      }
    }
  }
`;

const QUERY_RECIPE_EVENT = gql`
  query($id: ID!){
  events(where:{
    	recipe: {
      createdBy:{
        id: $id
      	}
    	}
  	}
  )
  {
    id
    date
    mealType
    recipe {
      title
    }
  }
}
`

const localizer = BigCalendar.momentLocalizer(moment)  // a localizer for BigCalendar

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Breakfast' },
  { resourceId: 2, resourceTitle: 'Lunch' },
  { resourceId: 3, resourceTitle: 'Dinner' },
  { resourceId: 4, resourceTitle: 'Dessert' },
  { resourceId: 5, resourceTitle: 'Snack' },
]

class RecipeCalendar extends Component {
  constructor(...args) {
    super(...args);
      this.state = {
        events: [],
        type: "",
        showModal: false,
        onDate: null
      };
    }

  handlePickDate = date => {this.setState({ onDate: date });};
  
  toggleModal = () => this.setState({ showModal: !this.state.showModal })

  render() {
    // console.log('date', this.state.events)
    return (
      <User>
        {({data}, loading, error) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
         

          if (data.currentUser) { 
          // console.log('User Data: ', data.currentUser)
          return (
            <Query query={QUERY_RECIPE_EVENT} variables = {{id: data.currentUser.id}}>
              {({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>
                // console.log("Data: ", data)  
                const events = data.events.map(i => {
                  return {
                    id: i.id,
                    start: i.date,
                    end: i.date,
                    resource: i.mealType,
                    title: i.recipe.title
                  }
                }) 
                return (
                  <div className="calendar-page-container">
                    <div className="calendar-container">
                      <BigCalendar
                        selectable
                        popup
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView="month"
                        onSelectEvent={this.toggleModal}
                        events={events}
                        resources={resourceMap}
                        resourceIdAccessor="resourceId"
                        resourceTitleAccessor="resourceTitle"
                        style={{ height: "100vh" }}
                        views={{ month: true }}
                      />
                    </div>
                    <div>
                      {this.state.showModal?
                        <Modal
                          onClose={this.toggleModal}>
                          <div style={{
                            maxWidth: 400, 
                            position: 'relative',
                          }}>
                            <h1>Please select Meal and Date!</h1>
                            <DatePicker handlePickDate={this.handlePickDate}/>
                            <button onClick={this.toggleModal}>Save</button>
                          </div>
                        </Modal>
                        :null}
                    </div>
                  </div>
                )
              }}
            </Query>
            )
            }
            
            return (
              <div>Loading...</div>
              
            )
        }}
      </User>
    )
  }
}

RecipeCalendar.propTypes = propTypes

export default RecipeCalendar;
