
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import Login from './login-register-functionalities/Login'
import Register from './login-register-functionalities/Register'
import Profile from './login-register-functionalities/Profile'

import { BrowserRouter, Route, Switch} from 'react-router-dom';

class MgtUser extends Component {
  render() {
    return (
      <BrowserRouter> 
        <Switch> 
          <Route exact path="/users/login" component={Login} />
          <Route exact path="/users/register" component={Register} />
          <Route exact path="/users/profile" component={Profile} />
        </Switch>     
      </BrowserRouter> 
    )
  }
}

const element = <MgtUser />;

ReactDOM.render(element, document.getElementById('react-div'));

