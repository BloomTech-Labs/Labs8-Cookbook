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
  mutation($data: EventUpdateInput!, $where: EventWhereUniqueInput!) {
    updateEvent(data: $data, where: $where) {
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
        onDate: null,
        isUpdated: false,
        search: ""
      };
    }

  handlePickDate = date => {this.setState({ onDate: date });};
  
  toggleModal = (event) => {
    this.setState({ showModal: !this.state.showModal, currentEvent: event.id, isUpdated: false })
  }

  mealButtonHandler = e => {
    e.preventDefault();
    this.setState({
      type: e.target.name
    });
  };

  handleSearch = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onEventSave = async () => {
    if (this.state.onDate || this.state.type)
    try {
        let calendarVariables = {}
        if (this.state.onDate) calendarVariables.date=this.state.onDate;
        if (this.state.type) calendarVariables.mealType=this.state.type;

        const eventData = await this.props.updateEvent({
          variables: {
            data: calendarVariables,
            where: {id:this.state.currentEvent}
          }
        })
        console.log("Event updated: ", eventData);  
        this.setState({isUpdated:true});
    } catch (error) {
      console.log("onSave error: ", error.message);
      return error;
    }
  }

  render() {
    return (
      <User>
        {({data}, loading, error) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
          if (data.currentUser) { 
          return (
            <Query query={QUERY_RECIPE_EVENT} variables = {{id: data.currentUser.id}}>
              {({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>
                // filter function for search
                let searchedEvents = data.events.filter(
                  (event) => {
                    return event.recipe.title.indexOf(this.state.search) !== -1;
                  }
                )
                // mapping out data to be rendered to screen
                const events = searchedEvents.map(event => {
                  return {
                    id: event.id,
                    start: event.date,
                    end: event.date,
                    resource: event.mealType,
                    title: event.recipe.title
                  }
                }) 
                return (
                  <div className="calendar-page-container">
                    <div className="calendar-container">
                      <form>
                        <input
                          type="text"
                          name="search"
                          placeholder="search"
                          onChange={this.handleSearch}
                          value={this.state.search}
                        />
                      </form>
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
                      {this.state.showModal? // portal ternary statement to turn on/off
                        <Modal
                          onClose={this.toggleModal}>
                          <div style={{
                            maxWidth: 400, 
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                          }}>
                            {!this.state.isUpdated? 
                            <div>
                            <h1>Please select Meal and Date!</h1>
                            <Buttons
                              mealButtonHandler={this.mealButtonHandler}
                              type={this.state.type}
                            />
                            <DatePicker handlePickDate={this.handlePickDate}/>
                            <button className="modal-button" onClick={this.onEventSave}>Save</button>
                            <button className="modal-button" onClick={this.toggleModal}>Cancel</button>
                            </div>:
                            <div>
                            <p>Updated Meal Successfully!</p>
                            <button className="modal-button" onClick={this.toggleModal}>Close</button>
                            </div>
                            }
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
