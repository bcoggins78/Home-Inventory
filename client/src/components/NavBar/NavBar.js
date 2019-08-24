import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.css';

const navBar = props => (
    <header className="main-nav">
        <div className="logo">
            <h1>Home Inventory</h1>
        </div>
        <nav className="main-nav-links">
            <ul>
                <li><NavLink to="/register">Sign Up</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/items">Inventory</NavLink></li>
            </ul>
        </nav>
    </header>
);

export default navBar;