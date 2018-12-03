import React from 'react';
import Logo from '../../designs/Logo/CookBookLogo.svg';
import { withRouter } from "react-router-dom";

const Footer = (props) => {
    const handleRedirect = (path) => {
        props.history.push(path);
    }

    return ( 
        <div className='footer'>
            
            <img className='logo' src={Logo} alt='company logo'/>
            
            <div className='title'>COOKBOOK</div>
            
            <div className='nav'>
                <p onClick={() => handleRedirect('/home/create')}>CREATE</p>
                <p onClick={() => handleRedirect('/home/recipes')}>RECIPES</p>
                <p onClick={() => handleRedirect('/home/calendar')}>CALENDAR</p>
                <p onClick={() => handleRedirect('/home/dashboard')}>GROCERY LIST</p>
                <p onClick={() => handleRedirect('/home/settings')}>SETTINGS</p>
            </div>
            
            <div className="info">

                <div className="contact-container">
                    <p className="label">contact</p>
                    <p>cookbook_project@yahoo.com</p>
                </div>

                <div className="team-container">
                    <p className="label">team</p>

                    <div className='names'>
                        <p>vu cao</p>
                        <p>katie gorbell</p>
                        <p>arthur pisakhov</p>
                        <p>braden walker</p>
                    </div>
                </div>

            </div>

        </div>
    );
}
 
export default withRouter(Footer);