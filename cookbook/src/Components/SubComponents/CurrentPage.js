import React, { Component } from 'react';
import Logo from '../../designs/Logo/CookBookLogo.svg';
import { Link } from 'react-router-dom';
import auth from '../../Auth/Auth.js';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import renderIf from 'render-if';


class CurrentPage extends Component {
    render() {
        return (
            <div className='cp-phone-nav'>
                <div className='current-page'>
                    {renderIf(this.props.location.pathname === '/home/create')(
                        <div className='create-cp'>
                            <Link to='/home/create' style={{textDecoration: 'none', color: '#D85E50'}}>CREATE</Link>
                        </div>
                    )}
                    {renderIf(this.props.location.pathname === '/home/calendar')(
                        <div className='calendar-cp'>
                            <Link to='/home/calendar' style={{textDecoration: 'none', color: '#F5E6DC'}}>CALENDAR</Link>
                        </div>
                    )}
                    {renderIf(this.props.location.pathname === '/home/dashboard')(
                        <div className='dashboard-cp'>    
                            <Link to='/home/dashboard' style={{textDecoration: 'none', color: '#ffc988'}}>GROCERY LIST</Link>
                        </div>
                    )}
                    {renderIf(this.props.location.pathname === '/home/settings')(
                        <div className='settings-cp'>    
                            <Link to='/home/settings' style={{textDecoration: 'none', color: '#B3C1CC'}}>SETTINGS</Link>
                        </div>
                    )}
                    {renderIf(this.props.location.pathname.includes('/home/recipe'))(
                        <div className='recipes-cp'>    
                            <Link to='/home/recipes' style={{textDecoration: 'none', color: '#2E3650'}}>RECIPES</Link>
                        </div>
                    )}
                </div>
                <div className='phone-nav'>
                    {renderIf(this.props.location.pathname !== '/home/create')(
                        <div  className='create-nav'>
                            <Link to='/home/create' style={{textDecoration: 'none', color: '#D85E50'}}>CREATE</Link>
                        </div>
                    )}
                    {renderIf(this.props.location.pathname !== '/home/calendar')(
                        <div className='calendar-nav'>
                            <Link to='/home/calendar' style={{textDecoration: 'none', color: '#F5E6DC'}}>CALENDAR</Link>
                        </div>
                    )}
                    {renderIf(this.props.location.pathname !== '/home/dashboard')(    
                        <div className='dashboard-nav'>
                            <Link to='/home/dashboard' style={{textDecoration: 'none', color: '#ffc988'}}>GROCERY LIST</Link>
                        </div>
                    )}
                    {renderIf(this.props.location.pathname !== '/home/settings')(    
                        <div className='settings-nav'>
                            <Link to='/home/settings' style={{textDecoration: 'none', color: '#B3C1CC'}}>SETTINGS</Link>
                        </div>
                    )}
                    {renderIf(!this.props.location.pathname.includes('/home/recipe'))(    
                        <div className='recipes-nav'>
                            <Link to='/home/recipes' style={{textDecoration: 'none', color: '#2E3650'}}>RECIPES</Link>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default withRouter(CurrentPage);