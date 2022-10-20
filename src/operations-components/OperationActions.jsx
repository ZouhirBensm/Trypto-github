import HelpForOrders from './HelpForOrders'
import MonitorForMessages from './MonitorForMessages'
import ManageSubscriptions from './ManageSubscriptions'
import HelpForMarketOrders from './HelpForMarketOrders'

class OperationActions extends React.Component {
  constructor(props){
    super(props)
    const queryParams = new URLSearchParams(this.props.location.search)
    this.state = {
      mode: this.props.match.params.mode
    }
    // console.log("THIS FUCKIN UID BEETTER", user)
    const comprehensiveSelectedUserInfoDataJSON = queryParams.get("comprehensiveSelectedUserInfo")
    this.comprehensiveSelectedUserInfoDataObj = JSON.parse(comprehensiveSelectedUserInfoDataJSON)
    // console.log("did we get what we need bazzoka: ", this.comprehensiveSelectedUserInfoDataObj)

    this.componentToRender
    this.setupTheProperComponent = this.setupTheProperComponent.bind(this)
    this.setupTheProperComponent()
    // console.log("props in OperationActions: ", this.props)
  }

  setupTheProperComponent(){
    switch (this.state.mode) {
      case "help-for-orders":
        this.componentToRender = <HelpForOrders selected_userID={this.props.match.params.selected_userID}/>
        break;
      case "monitor-messages":
        this.componentToRender = <MonitorForMessages
          comprehensiveSelectedUserInfoDataObj={this.comprehensiveSelectedUserInfoDataObj}
          selected_userID={this.props.match.params.selected_userID}
          selected_user_email={this.comprehensiveSelectedUserInfoDataObj.email}
          // needed in the operations route
          loggedinUserObjInfo={user}
        />
        break;
      case "manage-subs":
      this.componentToRender = <ManageSubscriptions
      comprehensiveSelectedUserInfoDataObj={this.comprehensiveSelectedUserInfoDataObj}
      selected_userID={this.props.match.params.selected_userID}
      selected_user_email={this.comprehensiveSelectedUserInfoDataObj.selected_user_email}
      // not needed
      loggedinUserObjInfo={user}
      />
        break;
      case "help-for-market-orders":
        this.componentToRender = <HelpForMarketOrders
        comprehensiveSelectedUserInfoDataObj={this.comprehensiveSelectedUserInfoDataObj}
        selected_userID={this.props.match.params.selected_userID}
        mode={this.props.match.params.mode} 
        loggedinUserObjInfo={user}
        />
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