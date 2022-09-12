import React from "react"
import Messages from '../messenger-functionalities/Messages'
import CRUDMessages from './CRUDMessages'
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
class MonitorForMessages extends React.Component {
  render(){
    return (
      <React.Fragment>
        <div>MonitorForMessages...{this.props.userID}</div>
        <BrowserRouter>
        <Switch>
          <Route exact path="/operations/monitor-messages/:userId" render={
            (props) => <Messages {...props} 
            comprehensiveSelectedUserInfoDataObj={this.props.comprehensiveSelectedUserInfoDataObj}
              userID_toQueryWith={this.props.userID}
              email_toQueryWith={this.props.email}
              loggedinUser={this.props.loggedinUser}
            />
          } />
          {/* WORKED MORE */}
          {/* <Route path="/operations/monitor-messages/edit-see/more">
            Edit see ...
          </Route> */}

          {/* <Route path="/operations/monitor-messages/:userId/edit-see/more">
            Edit see ...
          </Route> */}

          <Route path="/operations/monitor-messages/:userId/edit-see" render={
            (props) => <CRUDMessages {...props} 
            />
          } />
        </Switch>
        </BrowserRouter>

          {/* <Messages
            userID_toQueryWith={this.props.userID}
            email_toQueryWith={this.props.email}
            loggedinUser={this.props.loggedinUser}
          /> */}
      </React.Fragment>
    )
  }
}

export default MonitorForMessages