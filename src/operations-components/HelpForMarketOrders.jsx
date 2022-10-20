
import MyMarketOrders from "../marketplace-functionalities/MyMarketOrders"



class HelpForMarketOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log(props)
  }

  render() {
    return (
      <React.Fragment>
        <div>HelpForMarketOrders...{this.props.selected_userID}</div>
        <MyMarketOrders
          userID_toQueryWith={this.props.selected_userID}
        />




      </React.Fragment>
    )
  }
}

export default HelpForMarketOrders