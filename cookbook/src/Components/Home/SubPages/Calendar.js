import React, { Component } from "react";
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import User from './User';
import Portal from '../../SubComponents/Portal';

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const propTypes = {}

const SCHEDULE_RECIPE = gql`
  mutation($date: String!) {
    createEvent(date: $date) {
      id
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
        showModal: false
      };
    }

  
  togglePortal = () => this.setState({ showModal: !this.state.showModal })

  render() {
    console.log('date', this.state.events)
    return (
      <User>
        {({data}, loading, error) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
         

          if (data.currentUser) { 
          console.log('User Data: ', data.currentUser)
          return (
            <Query query={QUERY_RECIPE_EVENT} variables = {{id: data.currentUser.id}}>
              {({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>
                console.log("Data: ", data)  
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
                        onSelectEvent={event => alert(event.title)}
                        events={events}
                        resources={resourceMap}
                        resourceIdAccessor="resourceId"
                        resourceTitleAccessor="resourceTitle"
                        style={{ height: "100vh" }}
                        views={{ month: true }}
                      />
                    </div>
                    <div>
                      <button onClick={this.togglePortal}>Portal Button</button>
                        <Portal>
                          <Child />
                        </Portal>
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

function Child() {
  return (
    <div className="modal">
      <button onClick={this.togglePortal}>Click</button>
    </div>
  )
}

RecipeCalendar.propTypes = propTypes

export default RecipeCalendar;
