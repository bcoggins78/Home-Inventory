import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

import './NavBar.css';

const navBar = props => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <header className="main-nav">
                    <div className="logo">
                        <h1>Home Inventory Management</h1>
                    </div>
                    <nav className="main-nav-links">
                        <ul>
                            {!context.token && (<li><NavLink to="/register">Sign Up</NavLink></li>)}
                            {!context.token && (<li><NavLink to="/login">Login</NavLink></li>)}
                            {context.token && <li><NavLink to="/profile">Profile</NavLink></li>}
                            {context.token && (<React.Fragment><li><NavLink to="/items">Inventory</NavLink></li><li><button className="btn" onClick={context.logout}>Logout</button></li></React.Fragment>)}
                        </ul>
                    </nav>
                </header>
            )
        }}

    </AuthContext.Consumer>
);

export default navBar;