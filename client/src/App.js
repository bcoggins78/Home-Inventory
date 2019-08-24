import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ItemsPage from './pages/Items';
import NavBar from './components/NavBar/NavBar'

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <main className="main-content">
          <Switch>
            <Redirect from="/" to="/login" exact />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/items" component={ItemsPage} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
