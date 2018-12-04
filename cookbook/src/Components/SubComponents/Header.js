import React, { Component } from 'react';
import Logo from '../../designs/Logo/CookBookLogo.svg';
import auth from '../../Auth/Auth.js';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPhoneNav: false,
        };
    }

    static propTypes = {
        location: PropTypes.object.isRequired,
    }

    logout() {
        auth.logout();
    }

    handlePhoneNavClass = (path) => {
        if (this.props.location.pathname.includes(path)) {
            return `${path}-phone-nav-active`
        }
        if (this.state.showPhoneNav) {
            return `${path}-phone-nav-show`
        }
        return 'phone-nav-hide'
    }

    handleRedirect = (path) => {
        this.props.history.push(path);
    }

    togglePhoneNav = () => {
        this.setState({showPhoneNav: !this.state.showPhoneNav})
    }

    render() {

        return (

            <div className='header-nav'>

                <div className='header-container'>
                    <div className='header'>

                        <img className='logo' src={Logo} alt='logo'/>

                        <p className="title">COOKBOOK</p>

                        <div onClick={this.logout.bind(this)} className='logout'>logout</div>

                    </div>
                </div>
                
                <div className='nav'>

                    <div className='phone-nav'>
                        <div onClick={() => this.togglePhoneNav()} className='toggle-phone-nav'>...</div>
                        <div className='links'>
                            <p onClick={() => this.handleRedirect('/home/create')} className={this.handlePhoneNavClass('create')}>CREATE</p>
                            <p onClick={() => this.handleRedirect('/home/recipes')} className={this.handlePhoneNavClass('recipes')}>RECIPES</p>
                            <p onClick={() => this.handleRedirect('/home/calendar')} className={this.handlePhoneNavClass('calendar')}>CALENDAR</p>
                            <p onClick={() => this.handleRedirect('/home/dashboard')} className={this.handlePhoneNavClass('dashboard')}>GROCERY LIST</p>
                            <p onClick={() => this.handleRedirect('/home/settings')} className={this.handlePhoneNavClass('settings')}>SETTINGS</p>
                        </div>
                    </div>
                    
                </div>

            </div>

        );
    }
}
 
export default withRouter(Header);
