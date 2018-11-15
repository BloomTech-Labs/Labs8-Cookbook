import React from 'react';
import Logo from '../../designs/Logo/CookBookLogo.svg';


const Footer = () => {
    return ( 
        <div className='footer'>
            <div className='content'>
                <img className='logo' src={Logo} alt='company logo'/>
                <div className='created-by'>
                    <h3>Created By:</h3>
                    <span>Vu Cao</span>
                    <span>Katie Gorbell</span>
                    <span>Arthur Pisakhov</span>
                    <span>Braden Walker</span>
                </div>
            </div>
        </div>
    );
}
 
export default Footer;