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

    if (_mode == "marketplace") {
      switch(_state) {
        case null:
          return (
            <div className="default">
              {/* <button id="MarketMake" onClick={this.handleClick}>Make a Market post</button> */}
              <a className="button" href="/marketplace/makesell">Make Sell request</a>
              <button id="MarketSee" onClick={this.handleClick}>See Existing Maket posts</button>
            </div> 
          )
        case "MarketSee":
          return (
            <div className="see"> 
              {/* <a href={`/marketplace/buyordersdata`}>Market buy posts</a> */}
              <a href={`/marketplace/sellordersdata`}>Market sell posts</a>
              <a href="/marketplace/allmyorders">All my market posts</a>
              {/* <a href="/marketplace/matches">Matches</a> */}
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
              <a href="/btclayerexchange/makebuy">Make a Buy Order</a>
              <a href="/btclayerexchange/makesell">Make a Sell Order</a>
            </div>
          )
        case "See":
          return (
            <div className="see"> 
              <a href={`/btclayerexchange/buyordersdata`}>People Buying</a>
              <a href={`/btclayerexchange/sellordersdata`}>People Selling</a>
              <a href="/btclayerexchange/allmyorders">All my Orders</a>
              <a href="/btclayerexchange/matches">Matches</a>
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