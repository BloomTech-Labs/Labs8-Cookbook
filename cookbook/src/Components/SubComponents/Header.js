import React, { Component } from 'react';
import Logo from '../../designs/Logo/CookBookLogo.svg';
import NavIcon from './NavIcon';
import { Link } from 'react-router-dom';
import auth from '../../Auth/Auth.js';


class Header extends Component {
    logout() {
        auth.logout();
    }

    render() {
        const { isAuthenticated } = auth;

        return ( 
            <div className='header'>
                <Link className='link' to='/home'>
                    <img className='logo' src={Logo} alt='COOKBOOK logo'/>
                </Link>
                {
                    isAuthenticated() && (
                    <div className="signout" onClick={this.logout.bind(this)}>
                        Sign Out
                    </div>
                    )
                }
                <NavIcon className='nav-icon'/>
            </div> 
        );
    }
}
 
export default Header;