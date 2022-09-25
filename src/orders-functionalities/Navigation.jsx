// import React from 'react';
import './styles/Navigation.css'

class Navigation extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      state: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.switchResult = this.switchResult.bind(this)
  }

  handleClick(e){
    //e.preventDefault()
    //console.log(e.target.value);
    this.setState({
      state: e.target.id
    })
  }

  switchResult(_state, _mode){
    console.log(_state, _mode)
    // TODO template the navigation
    if (_mode == "marketplace") {
      switch(_state) {
        case null:
          return (
            <div className="default">
              <button id="MarketMake" onClick={this.handleClick}>Make a Market post</button>
              <button id="MarketSee" onClick={this.handleClick}>See Existing Maket posts</button>
            </div> 
          )
        case "MarketMake":
          return (
            <div className="make">
              <a href="/marketplace/make/makebuy">Make Buying request</a>
              <a href="/marketplace/make/makesell">Make Sell request</a>
            </div>
          )
        case "MarketSee":
          return (
            <div className="see"> 
              <a href={`/marketplace/databases/buyordersdata`}>Market buy posts</a>
              <a href={`/marketplace/databases/sellordersdata`}>Market sell posts</a>
              <a href="/marketplace/databases/AllMyOrders">All my market posts</a>
              <a href="/marketplace/databases/matches">Matches</a>
            </div>
          )
        default:
          return null
      }

    } else if (_mode == "orders"){
      switch(_state) {
        case null:
          return (
            <div className="default">
              <button id="Make" onClick={this.handleClick}>Make an order</button>
              <button id="See" onClick={this.handleClick}>See Existing orders</button>
            </div> 
          )
        case "Make":
          return (
            <div className="make">
              <a href="/make/makebuy">Make a Buy Order</a>
              <a href="/make/makesell">Make a Sell Order</a>
            </div>
          )
        case "See":
          return (
            <div className="see"> 
              <a href={`/databases/buyordersdata`}>People Buying</a>
              <a href={`/databases/sellordersdata`}>People Selling</a>
              <a href="/databases/AllMyOrders">All my Orders</a>
              <a href="/databases/matches">Matches</a>
            </div>
          )
        default:
          return null
      } 

    }
    
  }
  
  render(){
    let component = this.switchResult(this.state.state, this.props.mode);
    console.log(this.state.state)
    return(
      <div className="databases-wrapper">
        {component}
      </div>
    )
  }
}

export default Navigation