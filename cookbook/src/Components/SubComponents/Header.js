import React, { Component } from 'react';
import Logo from '../../designs/Logo/CookBookLogo.svg';
import { Link } from 'react-router-dom';
import auth from '../../Auth/Auth.js';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';


class Header extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
    }

    logout() {
        auth.logout();
    }

    onRender(path) {
        console.log(`Before: ${this.props.location.pathname}`);
        if (this.props.location.pathname === `/home/${path}`) {
            document.getElementById(path).style.display = 'none';
        }
        console.log(`After: ${this.props.location.pathname}`);
        document.getElementById(path).style.display = 'flex';
    }

    render() {
        const { isAuthenticated } = auth;

        return ( 
            <div className='header-nav'>
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
                <div className='nav'>
                    <Link className='create' to='/home/create'>
                        CREATE
                    </Link>
                    <Link className='calendar' to='/home/calendar'>
                        CALENDAR
                    </Link>
                    {this.onRender(dashboard => (
                        <Link className='dashboard' to='/home/dashboard'>GROCERY LIST</Link>
                    ))}
                    <Link className='settings' to='/home/settings'>
                        SETTINGS
                    </Link>
                    <Link className='recipes' to='/home/recipes'>
                        RECIPES
                    </Link>
                </div>
            </div> 
        );
    }
}
 
export default withRouter(Header);