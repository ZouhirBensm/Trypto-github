
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
        <dl>
          <dt>Component:</dt>
          <dd>{this.constructor.name}</dd>
          <dt>Selected user ID:</dt>
          <dd>{this.props.selected_userID}</dd>
        </dl>

        <MyMarketOrders
          userID_toQueryWith={this.props.selected_userID}
        />




      </React.Fragment>
    )
  }
}

export default HelpForMarketOrders