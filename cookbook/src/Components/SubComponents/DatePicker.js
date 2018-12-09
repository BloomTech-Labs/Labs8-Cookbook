import React, { Component } from 'react';
import DayPicker from 'react-day-picker';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: null
    };
  }
  handleDayClick(day, { selected, disabled }) {
    if (disabled) {
      return window.alert("Please choose a valid date from today.");
    }
    let selectedDay = selected ? undefined : day;
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
          disabledDays={{ before: new Date() }}
        />
        <p>
          {this.state.selectedDay
            ? this.state.selectedDay.toLocaleDateString()
            : null}
        </p>
      </div>
    );
  }
}

export default DatePicker;
