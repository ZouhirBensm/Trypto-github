
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import Login from './login-register-functionalities/Login'
import Register from './login-register-functionalities/Register'

import { BrowserRouter, Route, Switch} from 'react-router-dom';

class LoginRegister extends Component {
  render() {
    return (
      <BrowserRouter> 
        <Switch> 
          <Route exact path="/users/login" component={Login} />
          <Route exact path="/users/register" component={Register} />
        </Switch>     
      </BrowserRouter> 
    )
  }
}

const element = <LoginRegister />;

ReactDOM.render(element, document.getElementById('react-div'));

