import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import Header from './Header';

const userSignUp = gql`
    {
        user (id: "cjoaer9kn00120898yjnixwzf"
        ){
            id
            first_name
            last_name
            email
        }
    }
`

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

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('You signed up!');
        this.props.history.push('/');
    }

    render() {
        console.log(this.props)
        return ( 
            <div className='signupPage'>
                <Header />
                <div className="container">

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
                        autoComplete='username'
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
                        autoComplete='new-password'
                        type='password' 
                        name='password1' 
                        value={this.state.password1} 
                        onChange={this.updateInputChange}
                    />
                    
                    <input
                        placeholder='Re-enter Password'
                        autoComplete='new-password'
                        type='password' 
                        name='password2' 
                        value={this.state.password2} 
                        onChange={this.updateInputChange}
                    />
                    
                    <div>
                        <label>
                            <input className='hidden' type='checkbox' />
                            <div onClick={this.updateBuyPremium} className='ui-checkbox'>
                                <p className='ui-checkbox-text'>Buy Premium Membership</p>
                            </div>
                        </label>
                    </div>
                    <p className='ui-checkbox-disclaimer'>(Takes you to payment options after account is created)</p>
                    
                    <button onClick={this.handleSubmit}>Create My Account</button>
                </form>
                </div>
            </div>
         );
    }
}
 
export default graphql(userSignUp)(Signup);