import MyCurrencyOrders from "../btclayerexchange-functionalities/MyCurrencyOrders"


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
        <MyCurrencyOrders 
          userID_toQueryWith={this.props.selected_userID}
        />
      </React.Fragment>
    )
  }
}

export default HelpForOrders