import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ItemsPage from './pages/Items';
import ProfilePage from './pages/Profile';
import NavBar from './components/NavBar/NavBar'
import AuthContext from './context/auth-context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null
  }
  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };
  logout = () => {
    this.setState({ token: null, userId: null })
  }

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider value={{ token: this.state.token, userId: this.state.userId, login: this.login, logout: this.logout }}>
          <NavBar />
          <main className="main-content">
            <Switch>
              {!this.state.token && <Redirect from="/" to="/login" exact />}
              {!this.state.token && <Redirect from="/items" to="/login" exact />}
              {!this.state.token && <Redirect from="/profile" to="/login" exact />}
              {!this.state.token && <Route path="/login" component={LoginPage} />}
              {!this.state.token && <Route path="/register" component={RegisterPage} />}
              {this.state.token && <Route path="/profile" component={ProfilePage} />}
              {this.state.token && <Route path="/items" component={ItemsPage} />}
            </Switch>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
