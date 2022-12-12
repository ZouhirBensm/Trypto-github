
class GetRecentMarketItems extends React.Component {
  constructor(){
    super()
    this.state = {
      orders: undefined
    }
    this.loadRecentMarketItems = this.loadRecentMarketItems.bind(this)
  }

  componentDidMount(){
    this.loadRecentMarketItems()
  }

  async loadRecentMarketItems(){
    let response

    response = await fetch(`/marketplace/recent-marketorders`)

    console.log(response)
    
    let json
    json = await response.json()
    
    console.log(json)
  }

  render(){
    return (
      <React.Fragment>
        <div>GetRecentMarketItems...</div>
      </React.Fragment>
    )
  }
}

export default GetRecentMarketItems