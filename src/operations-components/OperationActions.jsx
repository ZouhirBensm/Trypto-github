import HelpForOrders from './HelpForOrders'
import MonitorForMessages from './MonitorForMessages'
import ManageSubscriptions from './ManageSubscriptions'


class OperationActions extends React.Component {
  constructor(props){
    super(props)
    const queryParams = new URLSearchParams(this.props.location.search)
    this.state = {
      mode: this.props.match.params.mode
    }
    console.log("THIS FUCKIN UID BEETTER", user)
    const comprehensiveSelectedUserInfoDataJSON = queryParams.get("comprehensiveSelectedUserInfo")
    this.comprehensiveSelectedUserInfoDataObj = JSON.parse(comprehensiveSelectedUserInfoDataJSON)
    console.log("did we get what we need bazzoka: ", this.comprehensiveSelectedUserInfoDataObj)

    this.componentToRender
    this.setupTheProperComponent = this.setupTheProperComponent.bind(this)
    this.setupTheProperComponent()
    console.log("props in OperationActions: ", this.props)
  }

  setupTheProperComponent(){
    switch (this.state.mode) {
      case "help-for-orders":
        this.componentToRender = <HelpForOrders selected_userID={this.props.match.params.selected_userID}/>
        break;
      case "monitor-messages":
        // TODO refactor names
        this.componentToRender = <MonitorForMessages
        comprehensiveSelectedUserInfoDataObj={this.comprehensiveSelectedUserInfoDataObj}
            userID={this.props.match.params.selected_userID}
            email={this.comprehensiveSelectedUserInfoDataObj.email}
            loggedinUser={user}
          />
        break;
      case "manage-subs":
      this.componentToRender = <ManageSubscriptions/>
        break;
      default:
        break;
    }
  }

  render(){
    return (
      <React.Fragment>
        {this.componentToRender}
      </React.Fragment>
    )
  }
}

export default OperationActions