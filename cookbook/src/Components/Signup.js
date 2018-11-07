import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            <div className='signUp'>
                <h1>Sign Up!</h1>
                <form>
                    <p>First Name:</p>
                    <input type='text' name='firstName' value={this.state.firstname} onChange={this.updateInputChange}/>
                    <p>Last Name:</p>
                    <input type='text' name='lastName' value={this.state.lastName} onChange={this.updateInputChange}/>
                    <p>Username:</p>
                    <input type='text' name='username' value={this.state.Username} onChange={this.updateInputChange}/>
                    <p>Email:</p>
                    <input type='text' name='email' value={this.state.email} onChange={this.updateInputChange}/>
                    <p>Password:</p>
                    <input type='text' name='password1' value={this.state.password1} onChange={this.updateInputChange}/>
                    <p>Retype Password:</p>
                    <input type='text' name='password2' value={this.state.password2} onChange={this.updateInputChange}/>
                    <Link to='/'>
                        <button>Create Account</button>
                    </Link>
                </form>
                <Link className='signinLink' to='/signin'>Already have an account? Sign in here.</Link>
            </div>
         );
    }
}
 
export default Signup;