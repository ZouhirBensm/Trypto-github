import React from "react"
import Messages from '../messenger-functionalities/Messages'
class MonitorForMessages extends React.Component {
  render(){
    return (
      <React.Fragment>
        <div>MonitorForMessages...{this.props.userID}</div>
        <Messages
          userID_toQueryWith={this.props.userID}
          email_toQueryWith={this.props.email}
        />
      </React.Fragment>
    )
  }
}

export default MonitorForMessages