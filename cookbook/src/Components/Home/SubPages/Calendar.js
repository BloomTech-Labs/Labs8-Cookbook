import React, { Component } from "react";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import gql from "graphql-tag";
import { Query, graphql, compose } from "react-apollo";
import Modal from "../../SubComponents/Modal";
import DatePicker from "../../SubComponents/DatePicker.js";
import Buttons from "./Buttons";
import "react-big-calendar/lib/css/react-big-calendar.css";

const propTypes = {};

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
  query {
    events {
      id
      date
      mealType
      recipe {
        id
        title
      }
    }
  }
`;

const CREATE_EVENT_MUTATION = gql`
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

const localizer = BigCalendar.momentLocalizer(moment); // a localizer for BigCalendar

class RecipeCalendar extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      currentEvent: "",
      type: "",
      showModal: false,
      onDate: null,
      isUpdated: false,
      search: ""
    };
  }

  handlePickDate = date => {
    this.setState({ onDate: date });
  };

  toggleModal = event => {
    this.setState({
      showModal: !this.state.showModal,
      currentEvent: event.id,
      isUpdated: false
    });
  };

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
        let calendarVariables = {};
        if (this.state.onDate) calendarVariables.date = this.state.onDate;
        if (this.state.type) calendarVariables.mealType = this.state.type;

        const eventData = await this.props.updateEvent({
          variables: {
            data: calendarVariables,
            where: { id: this.state.currentEvent }
          }
        });
        console.log("Event updated: ", eventData);
        this.setState({ isUpdated: true });
      } catch (error) {
        console.log("onSave error: ", error.message);
        return error;
      }
  };

  getDates = () => {
    let dates = [];
    for (let i = 7; i >= 2; i--) {
      dates.push(
        new Date(
          moment()
            .startOf("week")
            .subtract(i, "days")
            .startOf("day")
        )
      );
    }
    const lastSat = new Date(
      moment()
        .endOf("week")
        .subtract(7, "days")
        .endOf("day")
    );
    dates.push(lastSat);
    return dates;
  };

  duplicateMeals = searchedEvents => {
    try {
      //Get dates from last week
      const lastWeekDates = this.getDates();
      const from = lastWeekDates[0];
      const to = lastWeekDates[lastWeekDates.length - 1];

      const lastWeekEvents = searchedEvents.filter(
        event => new Date(event.date) >= from && new Date(event.date) <= to
      );

      lastWeekEvents.forEach(async event => {
        const eventVariables = {
          mealType: event.mealType,
          date: moment(event.date)
            .add(7, "d")
            .toISOString(),
          recipe: event.recipe.id
        };

        const eventData = await this.props.createEvent({
          variables: eventVariables,
          refetchQueries: [{ query: QUERY_RECIPE_EVENT }]
        });
        console.log("Events created: ", eventData);
      });
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

  render() {

    return (
      <Query query={QUERY_RECIPE_EVENT}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          // filter function for search
          let searchedEvents = data.events.filter(event => {
            return (
              event.recipe.title
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1
            );
          });

          // mapping out data to be rendered to screen
          const events = searchedEvents.map(event => {
            return {
              id: event.id,
              start: event.date,
              end: event.date,
              resource: event.mealType,
              title: event.recipe.title
            };
          });
          return (
            <div className="calendar-page-container">
              <div className="calendar-container">
              {/* Commented out code for recipe modal to be added
                <div className='recipes-modal'>
                  <div className='modal-header'>Today</div>
                  <div className='modal-content'></div>
                </div> */}
                <div className="search-box-wrapper">
                  <div className="magnifying-glass">
                    <span role="img" aria-label="magnifying-glass">
                      &#128269;
                    </span>
                  </div>
                  <input
                    type="text"
                    className="search-box-input"
                    name="search"
                    placeholder="Search..."
                    onChange={this.handleSearch}
                    value={this.state.search}
                  />
                </div>
                <div className='calendar-toolbar'>
                  <button onClick={() => this.duplicateMeals(searchedEvents)}>
                      Duplicate previous week
                  </button>
                </div>
                <BigCalendar
                  selectable
                  popup
                  localizer={localizer}
                  defaultDate={new Date()}
                  defaultView="month"
                  onSelectEvent={event => this.toggleModal(event)}
                  events={events}
                  style={{ height: "100vh" }}
                  views={{ month: true }}
                />
              </div>
              <div>
                {this.state.showModal ? ( // portal ternary statement to turn on/off
                  <Modal onClose={this.toggleModal}>
                    <div
                      style={{
                        maxWidth: 400,
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column"
                      }}
                    >
                      {!this.state.isUpdated ? (
                        <div>
                          <h1>Please select Meal and Date!</h1>
                          <Buttons
                            mealButtonHandler={this.mealButtonHandler}
                            type={this.state.type}
                          />
                          <DatePicker handlePickDate={this.handlePickDate} />
                          <button
                            className="modal-button"
                            onClick={this.onEventSave}
                          >
                            Save
                          </button>
                          <button
                            className="modal-button"
                            onClick={this.toggleModal}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div>
                          <p>Updated Meal Successfully!</p>
                          <button
                            className="modal-button"
                            onClick={this.toggleModal}
                          >
                            Close
                          </button>
                        </div>
                      )}
                    </div>
                  </Modal>
                ) : null}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

RecipeCalendar.propTypes = propTypes;

const updateEventMutation = graphql(UPDATE_EVENT, {
  name: "updateEvent"
});

const createEventMutation = graphql(CREATE_EVENT_MUTATION, {
  name: "createEvent"
});

export default compose(
  updateEventMutation,
  createEventMutation
)(RecipeCalendar);
export { QUERY_RECIPE_EVENT };
