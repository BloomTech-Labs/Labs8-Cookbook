import React, { Component } from 'react';

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
            <div className='container'>
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
                    <button>Create Account</button>
                </form>
            </div>
         );
    }
}
 
export default Signup;