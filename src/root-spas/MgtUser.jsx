import loadable from "@loadable/component";
import Loading from "../generic-components/Loading"

import './styles/MgtUser.css'


const Authentication = loadable(() => import("../login-register-functionalities/Authentication"), {
  fallback: <Loading />
});

const Profile = loadable(() => import("../profile-functionalities/Profile5"), {
  fallback: <Loading />
});

const ForgotPasswordRequest = loadable(() => import("../login-register-functionalities/ForgotPasswordRequest"), {
  fallback: <Loading />
});

const PasswordResetComponent = loadable(() => import("../login-register-functionalities/PasswordResetComponent"), {
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
            (props) => <Authentication {...props} loginTo={"/users/login"} />
          } />

          <Route path="/users/profile" render={
            (props) => <Profile {...props}
              usedUserID={userId}
              selectedUser={selectedUser}
              profileimagename={profileimagename}
            />

          } />

          <Route path="/users/forgotpasswordpage" render={
            (props) => <ForgotPasswordRequest {...props}
            // usedUserID={userId} 
            // selectedUser={selectedUser} 
            />
          } />

          <Route path="/users/requestresetpasswordpage/:hex" render={
            (props) => <PasswordResetComponent {...props}
            />
          } />

        </Switch>
      </BrowserRouter>
    )
  }
}

const element = <MgtUser />;

ReactDOM.render(element, document.getElementById('react-div'));

