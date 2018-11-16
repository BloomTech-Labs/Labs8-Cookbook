import React, { Component } from 'react';

import titleImg from '../../Images/titleImg.jpeg';
import logo from '../../designs/Logo/CookBookLogo.svg';


class LandingPage extends Component {
    login() {
        this.props.auth.login();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

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
            </div>
    
         );
    }
}
 
export default LandingPage;