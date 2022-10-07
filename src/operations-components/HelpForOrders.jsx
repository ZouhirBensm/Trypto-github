import MyOrders from "../btclayerexchange-functionalities/MyOrders"


class HelpForOrders extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render(){
    return (
      <React.Fragment>
        <div>HelpForOrders...{this.props.selected_userID}</div>
        <MyOrders 
          userID_toQueryWith={this.props.selected_userID}
        />
      </React.Fragment>
    )
  }
}

export default HelpForOrders