import React, { Component } from "react";
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import gql from "graphql-tag";
import { Query, graphql, compose } from "react-apollo";
import User from './User';
import Modal from '../../SubComponents/Modal';
import DatePicker from "../../SubComponents/DatePicker.js";
import Buttons from './Buttons';

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const propTypes = {}

const UPDATE_EVENT = gql`
  mutation($date: String!, $mealType: String!, $id: ID!) {
    updateEvent(where:{
      id: $id
    },
    data: {
      date: $date
      mealType: $mealType
    }
    ) {
      id
      mealType
      date
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
        currentEvent: '',
        type: "",
        showModal: false,
        onDate: null
      };
    }

  handlePickDate = date => {this.setState({ onDate: date });};
  
  toggleModal = (event) => {
    this.setState({ showModal: !this.state.showModal, currentEvent: event.id })
  }

  mealButtonHandler = e => {
    e.preventDefault();
    this.setState({
      type: e.target.name
    });
  };

  onEventSave = async () => {
    if (this.state.onDate || this.state.type)
    try {
        let calendarVariables = {}
        if (this.state.onDate) calendarVariables.date=this.state.onDate;
        if (this.state.type) calendarVariables.mealType=this.state.type;

        const eventVariables={
          data:calendarVariables,
          where:{
            id: this.state.currentEvent
          }
        }
        console.log(eventVariables);
        const eventData = await this.props.updateEvent({
          variables: eventVariables
        })
        console.log("Event updated: ", eventData);

        return eventData;
    } catch (error) {
      console.log("onsave error: ", error.message);
      return error;
    }
  }

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
                        onSelectEvent={event => this.toggleModal(event)}
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
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                          }}>
                            <h1>Please select Meal and Date!</h1>
                            <Buttons
                              mealButtonHandler={this.mealButtonHandler}
                              type={this.state.type}
                            />
                            <DatePicker  handlePickDate={this.handlePickDate}/>
                            <button className="modal-button" onClick={this.onEventSave}>Save</button>
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

const updateEventMutation = graphql(UPDATE_EVENT, {
  name: "updateEvent"
});

export default compose(updateEventMutation)(RecipeCalendar);
