import React, { Component } from 'react';
import OpenIcon from '../Images/Icons/nav-hamburger.png';


class NavIcon extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className='nav-icon'>
                <img src={OpenIcon} alt='Navigation Icon'/>
            </div>
        );
    }
}

export default NavIcon;