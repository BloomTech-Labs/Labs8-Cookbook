import React from 'react';
import titleImg from '../Images/titleImg.jpeg'

const LandingPage = () => {
    return ( 
        <div className='containerLP'>
            <div className='titleContainer'>
                <img className="titleImg" src={titleImg} alt="Image of a table with produce on top." />
                <img className="logo" />
                <span className='title'>COOKBOOK</span>
            </div>
        </div>
        
     );
}
 
export default LandingPage;