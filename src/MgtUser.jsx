
// import React from 'react';
// import ReactDOM from 'react-dom'

// import Login from './login-register-functionalities/Login'
// import Register from './login-register-functionalities/Register'
// import Profile from './login-register-functionalities/Profile'
import loadable from "@loadable/component";
import Loading from "./Loading";


const Login = loadable(() => import("./login-register-functionalities/Login"),{
  fallback: <Loading/>
});
const Register = loadable(() => import("./login-register-functionalities/Register"),{
  fallback: <Loading/>
});
const Profile = loadable(() => import("./login-register-functionalities/Profile"),{
  fallback: <Loading/>
});


import { BrowserRouter, Route, Switch} from 'react-router-dom';

class MgtUser extends React.Component {
  render() {
    return (
      <BrowserRouter> 
        <Switch> 
          <Route exact path="/users/login" component={Login}/>
          <Route exact path="/users/register" component={Register}/>
          <Route exact path="/users/profile" component={Profile}/>

          {/* <Route exact path="/users/register" component={Register} />
          <Route exact path="/users/profile" component={Profile} /> */}
        </Switch>     
      </BrowserRouter> 
    )
  }
}

const element = <MgtUser />;

ReactDOM.render(element, document.getElementById('react-div'));

