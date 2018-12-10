import React, { Component } from "react";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import gql from "graphql-tag";
import { Query, graphql, compose } from "react-apollo";
import Modal from "../../SubComponents/Modal";
import DatePicker from "../../SubComponents/DatePicker.js";
import Buttons from "./Buttons";
import { GET_RECIPES_QUERY } from "./Recipes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-big-calendar/lib/css/react-big-calendar.css";

const propTypes = {};

const DELETE_EVENT_MUTATION = gql`
  mutation($where: EventWhereUniqueInput!) {
    deleteEvent(where: $where) {
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
      currentEvent: {},
      type: "",
      showModal: false,
      onDates: [],
      isUpdated: false,
      search: "",
      message: ""
    };
  }

  handlePickDate = dates => {
    this.setState({ onDates: dates });
  };

  toggleModal = event => {
    this.setState({
      showModal: !this.state.showModal,
      currentEvent: event,
      isUpdated: false,
      message: ""
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

  deleteHandler = async () => {
    try {
      await this.props.deleteEvent({
        variables: { where: { id: this.state.currentEvent.id } },
        refetchQueries: [
          { query: QUERY_RECIPE_EVENT },
          { query: GET_RECIPES_QUERY }
        ]
      });
      this.setState({ isUpdated: true, message: "Deleted meal successfully!" });
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

  onEventSave = () => {
    if (this.state.onDates.length || this.state.type) {
      let events = [];
      if (!this.state.onDates.length) {
        events.push({
          date: this.state.currentEvent.start,
          mealType: this.state.type
        });
      } else {
        this.state.onDates.forEach(i => {
          const event = {
            date: i,
            mealType: this.state.type || this.state.currentEvent.resource,
            recipe: this.state.currentEvent.recipeId
          };
          events.push(event);
        });
      }

      try {
        events.forEach(async (data, index) => {
          if (index === events.length - 1) {
            await this.props.createEvent({
              variables: data,
              refetchQueries: [
                { query: QUERY_RECIPE_EVENT },
                { query: GET_RECIPES_QUERY }
              ]
            });
          } else {
            await this.props.createEvent({
              variables: data
            });
          }
        });
        this.setState({
          isUpdated: true,
          message: "Updated meals Successfully"
        });
      } catch (error) {
        console.log("onSave error: ", error.message);
        return error;
      }
    }
  };

  getDates = () => {
    let dates = [];
    for (let i = 7; i >= 2; i--) {
      dates.push(
        new Date(
          moment()
            .subtract(i, "days")
            .startOf("day")
        )
      );
    }
    const yesterday = new Date(
      moment()
        .subtract(1, "days")
        .endOf("day")
    );
    dates.push(yesterday);
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

        await this.props.createEvent({
          variables: eventVariables,
          refetchQueries: [{ query: QUERY_RECIPE_EVENT }]
        });
      });
    } catch (error) {
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
              title: event.recipe.title,
              recipeId: event.recipe.id
            };
          });
          return (
            <div className="calendar-page-container">
              <div className="calendar-container">
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
                            name="save-btn"
                          >
                            Save
                          </button>
                          <button
                            className="modal-button"
                            onClick={this.toggleModal}
                          >
                            Cancel
                          </button>
                          <button className="del-button" name="delete-btn">
                            <FontAwesomeIcon
                              icon="trash-alt"
                              className="del-icon"
                              onClick={this.deleteHandler}
                            />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <p>{this.state.message}</p>
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

const createEventMutation = graphql(CREATE_EVENT_MUTATION, {
  name: "createEvent"
});

const deleteEventMutation = graphql(DELETE_EVENT_MUTATION, {
  name: "deleteEvent"
});

export default compose(
  createEventMutation,
  deleteEventMutation
)(RecipeCalendar);
export { QUERY_RECIPE_EVENT, CREATE_EVENT_MUTATION };
