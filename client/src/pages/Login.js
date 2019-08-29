import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/auth-context';

import './Login.css'

class LoginPage extends Component {

    state = {
        isLogin: true
    }

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.userNameEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    submitHandler = (event) => {
        event.preventDefault();
        const userName = this.userNameEl.current.value;
        const password = this.passwordEl.current.value;

        if (userName.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        let requestBody = {
            query: `
                query {
                    login(userName: "${userName}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
                    }
                }`
        };

        fetch('/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 & res.status !== 201) {
                    alert("Login Failed!");
                    throw new Error('Login Failed!');
                }
                return res.json();
            })
            .then(resData => {
                if (resData.data.login.token) {
                    this.context.login(
                        resData.data.login.token,
                        resData.data.login.userId,
                        resData.data.login.tokenExpiration
                    );
                }
                console.log(resData);
            })
            .catch(err => {
                console.log(err);
            });
    }



    render() {
        return (
            <form className="login-form" onSubmit={this.submitHandler}>
                <div className="form-container">
                    <div className="form-input">
                        <label htmlFor="username">Username</label>
                        <input type="username" ref={this.userNameEl}></input>
                    </div>
                    <div className="form-input">
                        <label htmlFor="password">Password</label>
                        <input type="password" ref={this.passwordEl}></input>
                    </div>
                    <div className="form-submit">
                        <button className="btn" type="submit">Login</button>
                    </div>
                    <div className="have-account">
                        <span>Don't have an account? <NavLink to="/register">Sign Up</NavLink></span>
                    </div>
                </div>

            </form>
        )
    }
}

export default LoginPage;