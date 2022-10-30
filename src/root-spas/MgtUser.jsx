
// import React from 'react';
// import ReactDOM from 'react-dom'

// import Login from './login-register-functionalities/Login'
// import Register from './login-register-functionalities/Register'
// import Profile from './login-register-functionalities/Profile'
import loadable from "@loadable/component";
// import Loading from "./Loading";
import Loading from "../generic-components/Loading"


const Login = loadable(() => import("../login-register-functionalities/Login"), {
  fallback: <Loading />
});
const Profile = loadable(() => import("../login-register-functionalities/Profile"), {
  fallback: <Loading />
});

const ForgotPassword = loadable(() => import("../login-register-functionalities/ForgotPassword"), {
  fallback: <Loading />
});


import { BrowserRouter, Route, Switch } from 'react-router-dom';

class MgtUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    // console.log("userId:", userId)
    // this.selectedUser = selectedUser
    // console.log("selectedUser: ", selectedUser)
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/users/login" render={
            (props) => <Login {...props} loginTo={"/users/login"} />
          } />
          <Route path="/users/profile" render={
            (props) => <Profile {...props} usedUserID={userId} selectedUser={selectedUser} />
          } />
          <Route path="/users/forgotpasswordpage" render={
            (props) => <ForgotPassword {...props} 
            // usedUserID={userId} 
            // selectedUser={selectedUser} 
            />
          } />
        </Switch>
      </BrowserRouter>
    )
  }
}

const element = <MgtUser />;

ReactDOM.render(element, document.getElementById('react-div'));

