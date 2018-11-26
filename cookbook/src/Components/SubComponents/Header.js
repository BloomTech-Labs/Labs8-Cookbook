import React, { Component } from 'react';
import Logo from '../../designs/Logo/CookBookLogo.svg';
import { Link } from 'react-router-dom';
import auth from '../../Auth/Auth.js';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import renderIf from 'render-if';


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
                    {renderIf(this.props.location.pathname !== '/home/create')(
                        <Link className='create' to='/home/create'>CREATE</Link>
                    )}
                    {renderIf(this.props.location.pathname !== '/home/calendar')(
                        <Link className='calendar' to='/home/calendar'>CALENDAR</Link>
                    )}
                    {renderIf(this.props.location.pathname !== '/home/dashboard')(    
                        <Link className='dashboard' to='/home/dashboard'>GROCERY LIST</Link>
                    )}
                    {renderIf(this.props.location.pathname !== '/home/settings')(    
                        <Link className='settings' to='/home/settings'>SETTINGS</Link>
                    )}
                    {renderIf(this.props.location.pathname !== '/home/recipes')(    
                        <Link className='recipes' to='/home/recipes'>RECIPES</Link>
                    )}
                </div>
            </div> 
        );
    }
}
 
export default withRouter(Header);