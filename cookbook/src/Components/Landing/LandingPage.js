import React, { Component } from 'react';
import auth from '../../Auth/Auth.js';

import titleImg from '../../Images/titleImg.jpeg';
import logo from '../../designs/Logo/CookBookLogoWithShadow.svg';

const { isAuthenticated } = auth;

class LandingPage extends Component {
    login() {
        auth.login();
    }

    componentDidMount() {
        if (isAuthenticated()) this.props.history.push('/home');
    }

    render() {

        return (
            <div className='landing-container'>
                <div className='above-the-fold' style={{backgroundImage: `url(${titleImg})`}}>

                    <div className='branding'>

                        <img className="logo" src={logo} alt='company logo'/>

                        <div className='title'>

                            <div className='name'>
                                <span>C</span><span>O</span><span>O</span><span>K</span>
                                <span>B</span><span>O</span><span>O</span><span>K</span>
                            </div>

                            <p className='hook'>All of your recipes. All in one place.</p>

                        </div>

                    </div>

                    <div className='call-to-action' onClick={this.login.bind(this)}>login / register</div>

                </div>
            </div>
        )

        // return (
        //     <div className='containerLP'>
        //         <div className='titleContainer'>
        //             <img className="bckgImg" src={titleImg} alt="table with produce on top." />
        //             <div className='landingNav'>
        //                 <div className="register" onClick={this.login.bind(this)}>
        //                     Login/Register
        //                 </div>
        //             </div>
        //             <div className='logo-title'>
        //                 <img className="logo" src={logo} alt='company logo'/>
        //                 <span className='title'>COOKBOOK</span>
        //             </div>
        //         </div>
        //     </div>
    
        // );
    }
}
 
export default LandingPage;