import React from 'react';
import { Link } from 'react-router-dom';

import titleImg from '../Images/titleImg.jpeg';
import logo from '../designs/Logo/CookBookLogo.svg';


const LandingPage = () => {
    return ( 
        <div className='containerLP'>
            <div className='titleContainer'>
                <img className="bckgImg" src={titleImg} alt="Image of a table with produce on top." />
                <div className='landingNav'>
                    <Link className='login' to='signin'>Login</Link>
                    <Link className='register' to='signup'>Register</Link>
                </div>
                <div className='logo-title'>
                    <img className="logo" src={logo} />
                    <span className='title'>COOKBOOK</span>
                    {/* <div className='underline'></div> */}
                </div>
            </div>
        </div>

     );
}
 
export default LandingPage;