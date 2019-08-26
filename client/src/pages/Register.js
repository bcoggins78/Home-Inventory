import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Register.css'

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.userNameEl = React.createRef();
        this.passwordEl = React.createRef();
        this.emailEl = React.createRef();
        this.firstNameEl = React.createRef();
        this.lastNameEl = React.createRef();
        this.insNameEl = React.createRef();
        this.insPolicyEl = React.createRef();
        this.insContactEl = React.createRef();
    }

    submitHandler = (event) => {
        event.preventDefault();
        const userName = this.userNameEl.current.value;
        const password = this.passwordEl.current.value;
        const email = this.emailEl.current.value;
        const firstname = this.firstNameEl.current.value;
        const lastname = this.lastNameEl.current.value;
        const insName = this.insNameEl.current.value;
        const insPolicy = this.insPolicyEl.current.value;
        const insContact = this.insContactEl.current.value;

        let requestBody = {
            query: `
                mutation {
                    createUser(userInput: {
                        userName: "${userName}",
                        password: "${password}",
                        email: "${email}",
                        firstName: "${firstname}",
                        lastName: "${lastname}",
                        insName: "${insName}",
                        insPolicy: "${insPolicy}",
                        insContact: "${insContact}",
                        }) {
                            _id
                            userName
                        }
                }`
        };

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 & res.status !== 201) {
                    throw new Error('User Create Failed!');
                }
                return res.json();
            })
            .then(resData => {
                console.log(resData);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (<form className="register-form" onSubmit={this.submitHandler}>
            <div className="form-container">
                <div className="form-input">
                    <label htmlFor="username">Username</label>
                    <input type="username" ref={this.userNameEl}></input>
                </div>
                <div className="form-input">
                    <label htmlFor="password">Password</label>
                    <input type="password" ref={this.passwordEl}></input>
                </div>
                <div className="form-input">
                    <label htmlFor="email">Email</label>
                    <input type="email" ref={this.emailEl}></input>
                </div>
                <div className="form-input">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" ref={this.firstNameEl} name="firstname"></input>
                </div>
                <div className="form-input">
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" ref={this.lastNameEl} name="lastname"></input>
                </div>
                <div className="form-input">
                    <label htmlFor="insname">Insurance Company</label>
                    <input type="text" ref={this.insNameEl} name="insname"></input>
                </div>
                <div className="form-input">
                    <label htmlFor="inspolicy">Insurance Policy Number</label>
                    <input type="text" ref={this.insPolicyEl} name="inspolicy"></input>
                </div>
                <div className="form-input">
                    <label htmlFor="insnumber">Insurance Phone Number</label>
                    <input type="text" ref={this.insContactEl} name="insnumber"></input>
                </div>

                <div className="register-control">
                    <div className="form-submit">
                        <button className="btn" type="submit">Register</button>
                    </div>
                    <div className="form-submit">
                        <button className="btn" type="reset">Reset</button>
                    </div>
                </div>
                <div className="have-account">
                    <span>Already have an account? <NavLink to="/login">Login</NavLink></span>
                </div>
            </div>

        </form>)
    }
}

export default RegisterPage;