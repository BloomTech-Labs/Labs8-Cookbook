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
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            name='username'
                            type='text'
                        />
                    </div>

                    <div className='passwordDiv'>
                        <label className='passwordLabel'>Password: </label>
                        <input className='passwordInput'
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            name='password'
                            type='password'
                        />
                    </div>

                    <div>
                        <button className='loginButton' type='submit'>Log In</button>
                    </div>

                </form>
                <Link className='signupLink' to='/signup'>Don't have an account? Register Here</Link>
            </div>
        );
    }
}

export default Signin;