import React, { Component } from 'react';
import Logo from '../designs/Logo/CookBookLogo.svg';
import NavIcon from './NavIcon';
import { Link } from 'react-router-dom';


class Header extends Component {
    logout() {
        this.props.auth.logout();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        return ( 
            <div className='header'>
                <Link className='link' to='/home'>
                    <img className='logo' src={Logo} alt='COOKBOOK logo'/>
                </Link>
                {
                    isAuthenticated() && (
                        <button
                        className="btn-margin"
                        onClick={this.logout.bind(this)}
                        >
                        Sign Out
                        </button>
                    )
                }
                <NavIcon />
            </div> 
        );
    }
}
 
export default Header;