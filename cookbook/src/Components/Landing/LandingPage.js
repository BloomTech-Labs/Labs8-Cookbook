import React, { Component } from 'react';

import auth from '../../Auth/Auth.js';

import titleImg from '../../Images/titleImg.jpeg';
import logo from '../../designs/Logo/CookBookLogo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';


class LandingPage extends Component {
    login() {
        auth.login();
    }

    render() {
        const { isAuthenticated } = auth;
        // Carousel settings:
        var settings = {
            infinite: true,
            slidesToScroll: 4,
            variableWidth: true,
            centerMode: true
          };

        return ( 
            <div className='containerLP'>
                <div className='titleContainer'>
                    <img className="bckgImg" src={titleImg} alt="table with produce on top." />
                    <div className='landingNav'>
                        {
                            !isAuthenticated() && (
                            <div className="register" onClick={this.login.bind(this)}>
                                Login/Register
                            </div>
                            )
                        }
                    </div>
                    <div className='logo-title'>
                        <img className="logo" src={logo} alt='company logo'/>
                        <span className='title'>COOKBOOK</span>
                    </div>
                </div>
                <div className="lp-content">
                    <div className='about-us'>
                        <h1 className="about-header"><FontAwesomeIcon icon="utensils" className="fa"/>ABOUT US<FontAwesomeIcon icon="utensils" className="fa"/></h1>
                        <p className='about-content'>Here at CookBook, we aim to be your one stop shop for meal planning. Through the use of our extensive gallery of recipes, our members are able to create a diverse schedule that fits their needs. our system will then generate your grocery list that can be easily accessed while on the go. Join for free today to see how we can get your meal-planning back on track.</p>
                    </div>
                    <div className="recipe-gallery">
                        <h1 className="rg-header"><FontAwesomeIcon icon="utensils" className="fa"/>RECIPE GALLERY<FontAwesomeIcon icon="utensils" className="fa"/></h1>
                        <Slider {...settings} className="carousel">
                            <div>
                                <img src={titleImg} alt='testig' className="carousel-img"/>
                            </div>
                            <div>
                                <img src={titleImg} alt='testig' className="carousel-img"/>
                            </div>
                            <div>
                                <img src={titleImg} alt='testig' className="carousel-img"/>
                            </div>
                            <div>
                                <img src={titleImg} alt='testig' className="carousel-img"/>
                            </div>
                            <div>
                                <img src={titleImg} alt='testig' className="carousel-img"/>
                            </div>
                            <div>
                                <img src={titleImg} alt='testig' className="carousel-img"/>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
    
         );
    }
}
 
export default LandingPage;