import './styles/GetRecentMarketItems.css'


import MockMarketOrderTable from './MockMarketOrderTable'

class GetRecentMarketItems extends React.Component {
  constructor(){
    super()
    this.state = {
      orders: []
    }
    this.loadRecentMarketItems = this.loadRecentMarketItems.bind(this)
  }

  componentDidMount(){
    this.loadRecentMarketItems()
  }

  async loadRecentMarketItems(){
    let response

    response = await fetch(`/marketplace/recent-marketorders`)

    // console.log(response)
    
    let json
    json = await response.json()
    
    console.log(json)

    this.setState({
      orders: json.srv_
    })

  }

  render(){
    return (
      // TODO REPETED CODE
      <React.Fragment>

        
        {/* MARKET MAIN COMPONENT */}
        <div className="market-main-component">
          <h1>Trending Items</h1>



          <MockMarketOrderTable
            orders={this.state.orders}
          />


        </div>
        {/* MARKET MAIN COMPONENT */}


      </React.Fragment>
    )
  }
}

export default GetRecentMarketItems