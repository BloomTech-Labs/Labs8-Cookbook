import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import renderIf from 'render-if';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class CurrentPage extends Component {

    // decides nav icons color when it mounts
    componentDidMount() {
        this.navIconColors();
    }

    // decides colors of nav icon when pathname changes
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.navIconColors();
        }
    }

    // helper function: colors of phone nav icon changes depending on path.
    navIconColors() {
        if (this.props.location.pathname === '/home/create') {
            document.getElementById('nav-icon').style.color = '#fed092';
            document.getElementById('nav-icon').style.backgroundColor = '#de6a5a';
        } else if (this.props.location.pathname === '/home/calendar') {
            document.getElementById('nav-icon').style.color = '#ebf4f4';
            document.getElementById('nav-icon').style.backgroundColor = '#bcc9d2';
        } else if (this.props.location.pathname === '/home/dashboard') {
            document.getElementById('nav-icon').style.color = '#0C3812';
            document.getElementById('nav-icon').style.backgroundColor = '#fed092';
        } else if (this.props.location.pathname === '/home/settings') {
            document.getElementById('nav-icon').style.color = '#bcc9d2';
            document.getElementById('nav-icon').style.backgroundColor = '#ebf4f4';
        } else if (this.props.location.pathname.includes('/home/recipe')) {
            document.getElementById('nav-icon').style.color = '#f5e9df';
            document.getElementById('nav-icon').style.backgroundColor = '#0C3812';
        }
    }

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
                <div className='dropdown'>
                    <div className='nav-icon' id='nav-icon'>
                        <FontAwesomeIcon icon='ellipsis-v' className='icon'/>
                    </div>
                    <div className='phone-nav'>
                        {renderIf(this.props.location.pathname !== '/home/create')(
                            <div className='nav-bar' style={{backgroundColor: '#fed092'}}>
                                <Link to='/home/create' style={{textDecoration: 'none', color: '#de6a5a'}}>CREATE</Link>
                            </div>
                        )}
                        {renderIf(this.props.location.pathname !== '/home/calendar')(
                            <div className='nav-bar' style={{color: '#F5E6DC', backgroundColor: '#bcc9d2'}}>
                                <Link to='/home/calendar' style={{textDecoration: 'none', color: '#f5e9df'}}>CALENDAR</Link>
                            </div>
                        )}
                        {renderIf(this.props.location.pathname !== '/home/dashboard')(    
                            <div className='nav-bar' style={{backgroundColor: '#0C3812'}}>
                                <Link to='/home/dashboard' style={{textDecoration: 'none', color: '#ffc988'}}>GROCERY LIST</Link>
                            </div>
                        )}
                        {renderIf(this.props.location.pathname !== '/home/settings')(    
                            <div className='nav-bar' style={{backgroundColor: '#de6a5a'}}>
                                <Link to='/home/settings' style={{textDecoration: 'none', color: '#bcc9d2'}}>SETTINGS</Link>
                            </div>
                        )}
                        {renderIf(!this.props.location.pathname.includes('/home/recipe'))(    
                            <div className='nav-bar' style={{backgroundColor: '#f5e9df'}}>
                                <Link to='/home/recipes' style={{textDecoration: 'none', color: '#0C3812'}}>RECIPES</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CurrentPage);