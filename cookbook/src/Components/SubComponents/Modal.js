import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('portal'); // portal div is now root

class Modal extends Component {
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
    return createPortal(this.props.children, this.el); // created portal passes child components and element
  }
}

export default Modal;