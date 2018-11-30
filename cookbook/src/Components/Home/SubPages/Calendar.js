import React, { Component } from "react";
import moment from 'moment';
import Calendar from 'react-big-calendar';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import User from './User';

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

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

const localizer = Calendar.momentLocalizer(moment)  // a localizer for BigCalendar

const DnDCalendar = withDragAndDrop(Calendar);

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Breakfast' },
  { resourceId: 2, resourceTitle: 'Lunch' },
  { resourceId: 3, resourceTitle: 'Dinner' },
  { resourceId: 4, resourceTitle: 'Dessert' },
  { resourceId: 5, resourceTitle: 'Snack' },
]

class RecipeCalendar extends Component {
  constructor(props) {
    super(props);
      this.state = {
        events: [
          {
            id: 0,
            start: new Date(),
            end: new Date(moment().add(0, "days").format()),
            title: "Omelette",
            resourceId: 1
          }
        ],
        type: ""
      };
    }

  // onEventResize = ({ start, end }) => {
  //   this.setState(state => {
  //     state.events[0].start = start;
  //     state.events[0].end = end;
  //     return { events: state.events };
  //   });
  //   console.log(this.events)
  // };

  // onEventDrop = ({ event, start, end, resourceId }) => {
  //   const { events } = this.state
  //   const idx = events.indexOf(event)
    
  //   const updatedEvent = { ...event, start, end, resourceId }

  //   const nextEvents = [...events]
  //   nextEvents.splice(idx, 1, updatedEvent)

  //   this.setState({
  //     events: nextEvents,
  //   })

  // }

  // onDrop = async () => {
  //   const dndEventVariables = {
  //     start: new Date(),
  //     end: new Date(moment().add(0, "days")),
  //     mealType: this.state.resourceId
  //   };

  //   const { data } = await this.props.createEvent({
  //     variables: dndEventVariables
  //   });
  //   console.log("recipe rescheduled: ", data.createEvent)
  // }

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
                      <DnDCalendar
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView="month"
                        events={events}
                        // onEventDrop={this.onEventDrop}
                        resources={resourceMap}
                        resourceIdAccessor="resourceId"
                        resourceTitleAccessor="resourceTitle"
                        onClick={() => alert('pls god work')}
                        // onEventResize={this.onEventResize}
                        // resizable
                        selectable
                        style={{ height: "420px" }}
                      />
                    </div>

                    <Mutation mutation={SCHEDULE_RECIPE} variables={{ events }}>
                      {postMutation => <button onClick={postMutation}>Submit</button>}
                    </Mutation>

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

export default RecipeCalendar;
