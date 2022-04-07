/* jshint ignore:start */

import React, { Component } from 'react';
import render from 'react-dom';
import Items from './components/Items.jsx';
import Header from './components/Header.jsx';
import AddEmoji from './components/AddEmoji.jsx';
import { Link } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';

import "./scss/style.scss"

const App = props => {
    return (
        <div>
            <Header />
            <Items />
        </div>
    );
}

export default App;