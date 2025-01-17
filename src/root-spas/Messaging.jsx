import loadable from "@loadable/component";
// import Loading from "./Loading";
import Loading from "../generic-components/Loading";
import './styles/Messaging.css'

import OnPageFooter from '../generic-components/OnPageFooter'



const Messages = loadable(() => import("../messenger-functionalities/Messages"), {
  fallback: <Loading />
});

const ChatContainer = loadable(() => import("../messenger-functionalities/ChatContainer"), {
  fallback: <Loading />
});

import { BrowserRouter, Route, Switch } from 'react-router-dom';

class Messaging extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    // console.log("Messaging: userId", userId)
    // console.log("Messaging: currentUserEmail", currentUserEmail)
    // console.log("Messaging: currentUserName", currentUserName)
    // console.log("Messaging: user", user)
  }
  render() {
    return (
      // <ChatContainer/>
      <React.Fragment>
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/messaging/messages" render={
                (props) => <Messages {...props}
                  userID_toQueryWith={userId}
                  PassedUserEmail={currentUserEmail}
                  PassedUserName={currentUserName}
                  loggedinUserObjInfo={user}
                  comprehensiveSelectedUserInfoDataObj={undefined}
                />
              } />
              <Route exact path="/messaging" component={ChatContainer} />
            </Switch>
          </BrowserRouter>
          
          <OnPageFooter/>
        </div>


        
      </React.Fragment>
    )
  }
}

const element = <Messaging />;

ReactDOM.render(element, document.getElementById('react-div'));

