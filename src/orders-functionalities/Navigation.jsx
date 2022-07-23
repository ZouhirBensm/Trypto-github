// import React from 'react';
import './styles/Navigation.css'

class Navigation extends React.Component {
  constructor(){
    super()
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

  switchResult(_state){
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
            <a href="/databases/makebuy">Make a Buy Order</a>
            <a href="/databases/makesell">Make a Sell Order</a>
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
  
  render(){
    let component = this.switchResult(this.state.state);
    console.log(this.state.state)
    return(
      <div className="databases-wrapper">
        {component}
      </div>
    )
  }
}

export default Navigation