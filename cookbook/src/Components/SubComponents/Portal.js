import { Component } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('portal'); // portal div is now root

export default class Portal extends Component {

  constructor() {
    super();
    this.el = document.createElement('div'); // creates portal div
  }

  componentDidMount = () => {
    modalRoot.appendChild(this.el); // portal mounts => creates a div
  }

  componentWillUnmount = () => {
    modalRoot.removeChild(this.el); // portal unmounts => removes div
  }

  render() {
    return ReactDOM.createPortal(this.props, this.el); // created portal passes child components and element
  }
}