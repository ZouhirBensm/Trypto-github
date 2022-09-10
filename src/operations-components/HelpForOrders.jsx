import MyOrders from "../orders-functionalities/MyOrders"


class HelpForOrders extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render(){
    return (
      <React.Fragment>
        <div>HelpForOrders...{this.props.userID}</div>
        <MyOrders 
          userID_toQueryWith={this.props.userID}
        />
      </React.Fragment>
    )
  }
}

export default HelpForOrders