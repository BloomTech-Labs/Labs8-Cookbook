import React from 'react';
import Logo from '../designs/Logo/CookBookLogo.svg';
import NavIcon from './NavIcon';
import { Link } from 'react-router-dom';


const Header = () => {
    return ( 
        <div className='header'>
            <Link className='link' to='/'>
                <img className='logo' src={Logo} alt='COOKBOOK logo'/>
            </Link>
            <NavIcon />
        </div> 
    );
}
 
export default Header;