import React, { Component } from 'react';
import Logo from '../../designs/Logo/CookBookLogo.svg';
import NavIcon from './NavIcon';
import { Link } from 'react-router-dom';
import auth from '../../Auth/Auth.js';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const USER_QUERY = gql`
  {
    user {
      id
      auth0Sub
    }
  }
`


class Header extends Component {
    logout() {
        auth.logout();
    }

    render() {
        const { isAuthenticated } = auth;

        return ( 
            <div className='header'>
                <Link className='link' to='/home'>
                    <img className='logo' src={Logo} alt='COOKBOOK logo'/>
                </Link>

                <Query query={USER_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return <div>Fetching</div>
                        if (error) return <div>Error</div>
                        
                        const user = data.user

                        return (
                            <div>
                                No user{user.auth0Sub}
                            </div>
                        )
                    }}
                </Query>

                {
                    isAuthenticated() && (
                    <div className="signout" onClick={this.logout.bind(this)}>
                        Sign Out
                    </div>
                    )
                }

                <NavIcon className='nav-icon'/>
            </div> 
        );
    }
}
 
export default Header;