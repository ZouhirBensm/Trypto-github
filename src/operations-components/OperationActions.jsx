import HelpForOrders from './HelpForOrders'
import MonitorForMessages from './MonitorForMessages'
import ManageSubscriptions from './ManageSubscriptions'


class OperationActions extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mode: this.props.match.params.mode
    }
    this.componentToRender
    this.setupTheProperComponent = this.setupTheProperComponent.bind(this)
    this.setupTheProperComponent()
    console.log("props in OperationActions: ", this.props)
  }

  setupTheProperComponent(){
    switch (this.state.mode) {
      case "help-for-orders":
        this.componentToRender = <HelpForOrders/>
        break;
      case "monitor-messages":
        this.componentToRender = <MonitorForMessages/>
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