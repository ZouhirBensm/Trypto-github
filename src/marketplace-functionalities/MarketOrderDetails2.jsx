
import RetrievedMarketOrderData from './RetrievedMarketOrderData'
import '../style/reactDivMobile.css'

// TODO !!!! add the amounts to display SAT and BTC
// TODO !!!! display market order images on the market orders details page



class MarketOrderDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order: undefined,
    }
    this.loadData = this.loadData.bind(this)
  }

  componentDidMount() {
    this.loadData()
  }

  async loadData() {
    let response = await fetch(`/marketplace/order/${userId}/${this.props.match.params.order_type}/${this.props.match.params.orderID}`)

    let json = await response.json()

    if (response.ok) {

      this.setState({
        order: json
      })
    } else {
      // POP UP! "No order data retrieved from server!"
    }

  }


  render() {
    return (
      <React.Fragment>
        <RetrievedMarketOrderData
          order={this.state.order}
          loadData={this.loadData}
        />
      </React.Fragment>
    )
  }


}




export default MarketOrderDetails