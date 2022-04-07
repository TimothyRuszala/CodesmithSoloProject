import React from 'react';
import { Link } from "react-router-dom";


const Header = props => {
return (
<div>
  <header>
    <Link to="/about">
      <p id="about">ABOUT</p>
    </Link>
    <Link to="/">
      <h1>THE EMOJI STORE</h1>
    </Link>
    <Link to="/myCart">
      <div class="cart">🛒</div>
    </Link>
  </header>
</div>
)
}

export default Header;