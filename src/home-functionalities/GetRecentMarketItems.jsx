import './styles/GetRecentMarketItems.css'

import MarketOrderTable from '../marketplace-functionalities/market-order-list-components/MarketOrderTable'

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
    
    // console.log(json)

    this.setState({
      orders: json.srv_
    })

  }

  render(){

    return (
      // TODO REPETED CODE
      <React.Fragment>

        
        {/* MARKET MAIN COMPONENT */}
        <div id="market-main-component" className='higher-level-div'>
          <h1>Trending Items</h1>



          <MarketOrderTable
            orders={this.state.orders}
          />


          <a href={userId ? '/marketplace/sellordersdata' : '/subscription'}>View all</a>
          {/* <a href={'/marketplace/sellordersdata'}>View all</a> */}

        </div>
        {/* MARKET MAIN COMPONENT */}



      </React.Fragment>
    )
  }
}

export default GetRecentMarketItems