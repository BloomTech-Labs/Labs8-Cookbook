import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';

class Signin extends Component {

    state = {
        username: '',
        password: '',
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('You signed in!')
    }

    render() {
        return (
            <div className='signinPage'>
                <Header />
                <h1>Login</h1>
                <Link className='switchForm' to='/signup'>Don't have an account? Sign up here</Link>

                <form className='signinForm' onSubmit={this.handleSubmit}>

                    <input className='usernameInput'
                        placeholder='Username'
                        autoComplete='username'
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        name='username'
                        type='text'
                    />

                    <input className='passwordInput'
                        placeholder='Password'
                        autoComplete='current-password'
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        name='password'
                        type='password'
                    />

                    <button onClick={this.handleSubmit}>Log In</button>

                </form>
            </div>
        );
    }
}

export default Signin;