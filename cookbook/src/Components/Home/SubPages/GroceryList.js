import React, { Component } from "react";
import Calendar from 'react-calendar';

class GroceryList extends Component {
  constructor() {
    super();
    this.state = {
    }
  }


  render() {
    return (
      <div className='grocery-list-page'>
        <div className='calendar'>
          <Calendar />
        </div>
        <div className='list'>
          <div className='list-header'>Grocery List (date range here)</div>
        </div>
      </div>
    
    );
  }
};

export default GroceryList;
