import HelpForOrders from './HelpForOrders'
import MonitorForMessages from './MonitorForMessages'
import ManageSubscriptions from './ManageSubscriptions'
import HelpForMarketOrders from './HelpForMarketOrders'
import SetSettings from './SetSettings'

class OperationActions extends React.Component {
  constructor(props){
    super(props)
    const queryParams = new URLSearchParams(this.props.location.search)
    this.state = {
      mode: this.props.match.params.mode
    }
    // console.log("OperationActions: constructor()->user", user)
    // console.log("OperationActions: constructor()->profileimagename", profileimagename)

    const comprehensiveSelectedUserInfoDataJSON = queryParams.get("comprehensiveSelectedUserInfo")
    this.comprehensiveSelectedUserInfoDataObj = JSON.parse(comprehensiveSelectedUserInfoDataJSON)
    console.log("\n\nOperationActions: constructor()->this.comprehensiveSelectedUserInfoDataObj", this.comprehensiveSelectedUserInfoDataObj)

    this.componentToRender
    this.setupTheProperComponent = this.setupTheProperComponent.bind(this)
    this.setupTheProperComponent(profileimagename)
    console.log("OperationActions: constructor()->this.props", this.props)
  }

  setupTheProperComponent(_profileimagename = undefined){
    switch (this.state.mode) {
      // Disables the currency app
      // case "help-for-orders":
      //   this.componentToRender = <HelpForOrders selected_userID={this.props.match.params.selected_userID}/>
      //   break;
      case "monitor-messages":
        this.componentToRender = <MonitorForMessages
          comprehensiveSelectedUserInfoDataObj={this.comprehensiveSelectedUserInfoDataObj}
          selected_userID={this.props.match.params.selected_userID}
          selected_user_email={this.comprehensiveSelectedUserInfoDataObj.email}
          selected_user_username={this.comprehensiveSelectedUserInfoDataObj.username}
          // needed in the operations route
          loggedinUserObjInfo={user}
        />
        break;
      case "manage-subs":
      let profileimagename = _profileimagename || this.comprehensiveSelectedUserInfoDataObj.userprofileimageID?.image.name || "square.png"
      this.componentToRender = <ManageSubscriptions
        comprehensiveSelectedUserInfoDataObj={this.comprehensiveSelectedUserInfoDataObj}
        selected_userID={this.props.match.params.selected_userID}
        selected_user_email={this.comprehensiveSelectedUserInfoDataObj.selected_user_email}
        // not needed
        loggedinUserObjInfo={user}
        profileimagename={profileimagename}
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
      case "set-settings":
        this.componentToRender = <SetSettings
          // comprehensiveSelectedUserInfoDataObj={this.comprehensiveSelectedUserInfoDataObj}
          // selected_userID={this.props.match.params.selected_userID}
          // mode={this.props.match.params.mode} 
          // loggedinUserObjInfo={user}
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