/* jshint ignore:start */

import React, { Component } from 'react';
import render from 'react-dom';
import Items from './components/Items.jsx';
import AddEmoji from './components/AddEmoji.jsx';
import { Routes, Route } from 'react-router-dom';

import "./scss/style.scss"

const App = props => {
    return (
        <Items/>
    );
}

export default App;