import React, { Component } from "react";
import moment from 'moment';
import Calendar from 'react-big-calendar';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

// a localizer for BigCalendar
const localizer = Calendar.momentLocalizer(moment) 

const DnDCalendar = withDragAndDrop(Calendar);

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Breakfast' },
  { resourceId: 2, resourceTitle: 'Lunch' },
  { resourceId: 3, resourceTitle: 'Dinner' },
  { resourceId: 4, resourceTitle: 'Dessert' },
  { resourceId: 5, resourceTitle: 'Snack' },
]

class RecipeCalendar extends Component {
  state = {
    events: [
      {
        id: 0,
        start: new Date(),
        end: new Date(moment().add(0, "days")),
        title: "Cooking",
        resourceId: 1
      },
      {
        id: 1,
        start: new Date(),
        end: new Date(moment().add(0, "days")),
        title: "Hiking",
        resourceId: 2
      }
    ]
  };

  // onEventResize = ({ start, end }) => {
  //   this.setState(state => {
  //     state.events[0].start = start;
  //     state.events[0].end = end;
  //     return { events: state.events };
  //   });
  //   console.log(this.events)
  // };

  onEventDrop = ({ start, end }) => {
    this.setState(state => {
      state.events.id.start = start;
      state.events.id.end = end;
      return { events: state.events };
    });
  }

  render() {
    return (
      <div className="calendar-page-container">
        <div className="calendar-container">
          <DnDCalendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events}
            onEventDrop={this.onEventDrop}
            // onEventResize={this.onEventResize}
            // resizable
            selectable
            style={{ height: "100vh" }}
          />
        </div>
        <div className="calendar-toolbar">
          
        </div>
      </div>
    )
  }
}

// const RecipeCalendar = props => (
//   <div className='calendar-page'>
//     <BigCalendar
//       localizer={localizer}
//       events={[]}
//       startAccessor="start"
//       endAccessor="end"
//     />
//   </div>
// )

export default RecipeCalendar;