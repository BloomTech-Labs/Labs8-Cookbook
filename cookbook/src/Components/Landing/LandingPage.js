import React, { Component } from 'react';

import auth from '../../Auth/Auth.js';

import titleImg from '../../Images/titleImg.jpeg';
import logo from '../../designs/Logo/CookBookLogo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class LandingPage extends Component {
    login() {
        auth.login();
    }

    render() {
        const { isAuthenticated } = auth;

        return ( 
            <div className='containerLP'>
                <div className='titleContainer'>
                    <img className="bckgImg" src={titleImg} alt="table with produce on top." />
                    <div className='landingNav'>
                        {
                            !isAuthenticated() && (
                            <div className="register" onClick={this.login.bind(this)}>
                                Login/Register
                            </div>
                            )
                        }
                    </div>
                    <div className='logo-title'>
                        <img className="logo" src={logo} alt='company logo'/>
                        <span className='title'>COOKBOOK</span>
                    </div>
                </div>
                <div className='about-us'>
                        <h1 className="about-header"><FontAwesomeIcon icon="utensils" className="fa"/>ABOUT US<FontAwesomeIcon icon="utensils" className="fa"/></h1>
                </div>
            </div>
    
         );
    }
}
 
export default LandingPage;