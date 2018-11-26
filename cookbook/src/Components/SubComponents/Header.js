import React, { Component } from 'react';
import Logo from '../../designs/Logo/CookBookLogo.svg';
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
                <span className="title">COOKBOOK</span>
                {/* {
                    isAuthenticated() && ( */}
                    <div className="signout" onClick={this.logout.bind(this)}>
                        logout
                    </div>
                     {/* )
                } */}
            </div> 
        );
    }
}
 
export default Header;