import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            <div className='signin'>
                <form className='form' onSubmit={this.handleSubmit}>

                    <div className='usernameDiv'>
                        <label className='usernameLabel'>Username: </label>
                        <input className='usernameInput'
                            placeholder='Username'
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            name='username'
                            type='text'
                        />
                    </div>

                    <div className='passwordDiv'>
                        <label className='passwordLabel'>Password: </label>
                        <input className='passwordInput'
                            placeholder='Password'
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            name='password'
                            type='password'
                        />
                    </div>

                    <Link to='/'>
                        <button className='loginButton' type='submit'>Log in</button>
                    </Link>

                </form>
                <Link className='signupLink' to='/signup'>Don't have an account? Sign up here.</Link>
            </div>
        );
    }
}

export default Signin;