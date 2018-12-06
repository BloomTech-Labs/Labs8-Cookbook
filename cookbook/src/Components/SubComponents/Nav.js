import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import renderIf from 'render-if';

                
class Nav extends Component {

    render() {
        return (
            <div className='nav'>
                {renderIf(this.props.location.pathname !== '/home/create')(
                    <div  className='create-nav'>
                        <Link to='/home/create' style={{textDecoration: 'none', color: '#D85E50'}}><span className='span'>CREATE</span></Link>
                    </div>
                )}
                {renderIf(this.props.location.pathname !== '/home/calendar')(
                    <div className='calendar-nav'>
                        <Link to='/home/calendar' style={{textDecoration: 'none', color: '#F5E6DC'}}><span className='span'>CALENDAR</span></Link>
                    </div>
                )}
                {renderIf(this.props.location.pathname !== '/home/dashboard')(    
                    <div className='dashboard-nav'>
                        <Link to='/home/dashboard' style={{textDecoration: 'none', color: '#ffc988'}}><span className='span'>GROCERY LIST</span></Link>
                    </div>
                )}
                {renderIf(this.props.location.pathname !== '/home/settings')(    
                    <div className='settings-nav'>
                        <Link to='/home/settings' style={{textDecoration: 'none', color: '#B3C1CC'}}><span className='span'>SETTINGS</span></Link>
                    </div>
                )}
                {renderIf(!this.props.location.pathname.includes('/home/recipe'))(    
                    <div className='recipes-nav'>
                        <Link to='/home/recipes' style={{textDecoration: 'none', color: '#343e5a'}}><span className='span'>RECIPES</span></Link>
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(Nav);