import React, { Component } from 'react';
import Logo from '../../designs/Logo/CookBookLogo.svg';
import { Link } from 'react-router-dom';
import auth from '../../Auth/Auth.js';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import renderIf from 'render-if';

class Header extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
    }

    logout() {
        auth.logout();
    }

    render() {

        return (

            <div className='header-nav'>

                <div className='header-container'>
                    <div className='header'>

                        <img className='logo' src={Logo} alt='COOKBOOK logo'/>

                        <p className="title">COOKBOOK</p>

                        <div onClick={this.logout.bind(this)} className='logout'>logout</div>

                    </div>
                </div>

                
                <div className='nav'>
                    
                </div>

            </div>

        );
    }
}
 
export default withRouter(Header);
