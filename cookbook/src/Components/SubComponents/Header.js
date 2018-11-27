import React, { Component } from 'react';
import Logo from '../../designs/Logo/CookBookLogo.svg';
import { Link } from 'react-router-dom';
import auth from '../../Auth/Auth.js';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import renderIf from 'render-if';

import User from "../Home/SubPages/User";


class Header extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
    }

    logout() {
        auth.logout();
    }

    onRender(path) {
    }

    render() {
        const { isAuthenticated } = auth;

        return ( 
            <div className='header-nav'>
                <div className='header'>
                    <Link className='link' to='/home'>
                        <img className='logo' src={Logo} alt='COOKBOOK logo'/>
                    </Link>
                    <User>
                      {({ data: { currentUser } }) => {
                        if (currentUser)
                          return (
                            <p>
                              Welcome {currentUser.firstName} {currentUser.lastName}
                            </p>
                          );
                        return null;
                      }}
                    </User>
                    <span className="title">COOKBOOK</span>
                    {
                        isAuthenticated() && (
                        <div className="signout" onClick={auth.logout}>
                            logout
                        </div>
                        )
                    }
                </div>
                <div className='nav'>
                    {renderIf(this.props.location.pathname !== '/home/create')(
                        <Link to='/home/create'><span className='create-nav'>CREATE</span></Link>
                    )}
                    {renderIf(this.props.location.pathname !== '/home/calendar')(
                        <Link to='/home/calendar'><span className='calendar-nav'>CALENDAR</span></Link>
                    )}
                    {renderIf(this.props.location.pathname !== '/home/dashboard')(    
                        <Link to='/home/dashboard'><span className='dashboard-nav'>GROCERY LIST</span></Link>
                    )}
                    {renderIf(this.props.location.pathname !== '/home/settings')(    
                        <Link to='/home/settings'><span className='settings-nav'>SETTINGS</span></Link>
                    )}
                    {renderIf(this.props.location.pathname !== '/home/recipes')(    
                        <Link to='/home/recipes'><span className='recipes-nav'>RECIPES</span></Link>
                    )}
                </div>
                <div className='current-page'>
                    {renderIf(this.props.location.pathname === '/home/create')(
                        <span className='create-cp'>CREATE</span>
                    )}
                    {renderIf(this.props.location.pathname === '/home/calendar')(
                        <span className='calendar-cp'>CALENDAR</span>
                    )}
                    {renderIf(this.props.location.pathname === '/home/dashboard')(    
                        <span className='dashboard-cp'>DASHBAORD</span>
                    )}
                    {renderIf(this.props.location.pathname === '/home/settings')(    
                        <span className='settings-cp'>SETTINGS</span>
                    )}
                    {renderIf(this.props.location.pathname === '/home/recipes')(    
                        <span className='recipes-cp'>RECIPES</span>
                    )}
                </div>
            </div> 
        );
    }
}
 
export default withRouter(Header);

