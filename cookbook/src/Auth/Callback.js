import React, { Component } from 'react';
import loading from '../designs/Logo/Logo.png';

class Callback extends Component {
  render() {

    return (
      <div>
        <img src={loading} alt="loading"/>
        Loading...
      </div>
    );
  }
}

export default Callback;