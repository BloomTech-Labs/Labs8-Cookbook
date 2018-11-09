import React, { Component } from 'react';
import OpenIcon from '../Images/Icons/nav-hamburger.png';
import { Link } from 'react-router-dom';


class NavIcon extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className='nav-icon'>
                <img className='icon' src={OpenIcon} alt='Navigation Icon'/>
                <div className='dropdown-content'>
                    <Link className='link' to=''>Create</Link>
                    <Link className='link' to=''>Recipes</Link>
                    <Link className='link' to=''>Calendar</Link>
                    <Link className='link' to=''>Grocery List</Link>
                </div>
            </div>
        );
    }
}

export default NavIcon;