import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: null,
    };
  }
  handleDayClick(day, { selected }) {
    let selectedDay = selected ? undefined : day
    this.setState({
      selectedDay
    });
    this.props.handlePickDate(selectedDay);
  }
  getSelectedDay() {
    return this.state.selectedDay;
  }
  render() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <DayPicker
          selectedDays={this.state.selectedDay}
          onDayClick={this.handleDayClick}
        />
        <p>
          {this.state.selectedDay
            ? this.state.selectedDay.toLocaleDateString()
            : 'Please select a day 👻'}
        </p>
      </div>
    );
  }
}

export default DatePicker;