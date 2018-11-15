import React from "react";
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

// a localizer for BigCalendar
const localizer = BigCalendar.momentLocalizer(moment) 

// require('style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css')

const RecipeCalendar = props => (
  <div className='calendar-page'>
    <BigCalendar
      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
)

export default RecipeCalendar;