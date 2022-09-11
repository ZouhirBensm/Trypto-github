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
    const comprehensiveUserInfoDataJSON = queryParams.get("comprehensiveUserInfo")
    this.comprehensiveUserInfoDataObj = JSON.parse(comprehensiveUserInfoDataJSON)
    console.log("did we get what we need bazzoka: ", this.comprehensiveUserInfoDataObj)

    this.componentToRender
    this.setupTheProperComponent = this.setupTheProperComponent.bind(this)
    this.setupTheProperComponent()
    console.log("props in OperationActions: ", this.props)
  }

  setupTheProperComponent(){
    switch (this.state.mode) {
      case "help-for-orders":
        this.componentToRender = <HelpForOrders userID={this.props.match.params.userID}/>
        break;
      case "monitor-messages":
        // TODO refactor names
        this.componentToRender = <MonitorForMessages
            comprehensiveUserInfoDataObj={this.comprehensiveUserInfoDataObj}
            userID={this.props.match.params.userID}
            email={this.comprehensiveUserInfoDataObj.email}
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