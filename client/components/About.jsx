/* jshint ignore:start */

import React from 'react';
import Header from './Header.jsx';


const About = props => {
  return (
    <div className="about">
      <Header />
      <div className="content">
        <h2>The world needs more NFTs.</h2>
        <p>I created this online store to allow us to finally buy emoji NFTs. Do I have permission to sell them? No. Will you
          get anything if you buy one? Also no.</p>
        <p>Enjoy. 👹 </p>
      </div>
    </div>
  )
}

export default About;