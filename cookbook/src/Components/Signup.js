import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';


class Signup extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password1: '',
            password2: '',
            buyPremium: false
        }
    }

    updateInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateBuyPremium = () => {
        this.setState({ buyPremium: !this.state.buyPremium})
    }

    render() {
        return ( 
            <div className='signupPage'>
                <Header />
                <h1>Sign Up!</h1>
                <Link className='switchForm' to='/signin'>Already have an account? Sign in here</Link>
                
                <form className='signupForm'>
                    
                    <input
                        placeholder='First Name'
                        type='text' 
                        name='firstName' 
                        value={this.state.firstname} 
                        onChange={this.updateInputChange}
                    />
                    
                    <input
                        placeholder='Last Name'
                        type='text' 
                        name='lastName' 
                        value={this.state.lastName} 
                        onChange={this.updateInputChange}
                    />
                    
                    <input
                        placeholder='Username'
                        type='text' 
                        name='username' 
                        value={this.state.Username} 
                        onChange={this.updateInputChange}
                    />
                    
                    <input
                        placeholder='Email'
                        type='text' 
                        name='email' 
                        value={this.state.email} 
                        onChange={this.updateInputChange}
                    />
                    
                    <input
                        placeholder='Password'
                        type='password' 
                        name='password1' 
                        value={this.state.password1} 
                        onChange={this.updateInputChange}
                    />
                    
                    <input
                        placeholder='Re-enter Password'
                        type='password' 
                        name='password2' 
                        value={this.state.password2} 
                        onChange={this.updateInputChange}
                    />
                    
                    <label>
                        <input className='hidden' type='checkbox' />
                        <div className='ui-checkbox'>
                            <p className='ui-checkbox-text'>Buy Premium Membership</p>
                        </div>
                    </label>
                    <p className='ui-checkbox-disclaimer'>(Takes you to payment options after account is created)</p>
                    
                    <button>Create My Account</button>
                </form>
            </div>
         );
    }
}
 
export default Signup;