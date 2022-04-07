/* jshint ignore: start */

import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import App from './App.jsx';
import About from './components/About.jsx';
import Cart from './components/Cart.jsx';


render(
    <BrowserRouter>
      <Routes>
        {/* <App /> */}
        <Route
          path="/"
          element={<App />} />
        <Route 
          path="about" 
          element={<About />} />
        <Route 
          path="myCart" 
          element={<Cart />} />
      </Routes>
    </BrowserRouter>,
  document.getElementById('root'),
);