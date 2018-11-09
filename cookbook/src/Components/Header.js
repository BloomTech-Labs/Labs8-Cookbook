import React from 'react';
import Logo from '../designs/Logo/CookBookLogo.svg';
import NavIcon from './NavIcon';

const Header = () => {
    return ( 
        <div className='header'>
            <img className='logo' src={Logo} alt='COOKBOOK logo'/>
            <NavIcon />
        </div> 
    );
}
 
export default Header;