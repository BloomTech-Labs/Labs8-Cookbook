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
            password2: ''
        }
    }

    updateInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return ( 
            <div className='signupPage'>
                <Header />
                <h1>Sign Up!</h1>
                <Link className='signinLink' to='/signin'>Already have an account? Click this to login</Link>
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
                        type='text' 
                        name='password1' 
                        value={this.state.password1} 
                        onChange={this.updateInputChange}
                    />
                    <input
                        placeholder='Re-enter Password'
                        type='text' 
                        name='password2' 
                        value={this.state.password2} 
                        onChange={this.updateInputChange}
                    />
                    <Link to='/'>
                        <button>Create Account</button>
                    </Link>
                </form>
            </div>
         );
    }
}
 
export default Signup;