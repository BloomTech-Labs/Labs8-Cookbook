import React from "react";
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

// a localizer for BigCalendar
const localizer = BigCalendar.momentLocalizer(moment) 


const RecipeCalendar = props => (
  <div>
    <BigCalendar
      style={{height: '420px'}}
      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
)

export default RecipeCalendar;