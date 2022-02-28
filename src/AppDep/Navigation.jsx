import React, { Component } from 'react';
import '../styles/Navigation.css'

class Navigation extends React.Component {
  constructor(){
    super()
    this.state = {
      state: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }



  handleClick(e){
    //e.preventDefault()
    //console.log(e.target.value);
    this.setState({
      state: e.target.id
    })

    //window.location.href="/databases"
  }
  
  render(){
    console.log(this.state.state)
    return(

      // <div>
      //   <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quis iste rerum esse. Ex odio aut consectetur modi incidunt autem! Error ab quis illo eius!</h1>
      // </div>
      <div className="databases-wrapper">
  
        {(this.state.state != "Make" && this.state.state != "See") ?
          <div className="default">
            <button id="Make" onClick={this.handleClick}>Make an order</button>
            <button id="See" onClick={this.handleClick}>See Existing orders</button>
          </div> 
          :
        null
        }
        
  
        {(this.state.state === "Make") ?
          <div className="make">
            {/* When this is changed and one of the link is accessed/clicked => affect parent class */}
            <a href="/databases/makebuy">Make a Buy Order</a>
            <a href="/databases/makesell">Make a Sell Order</a>
          </div>
          :
          (this.state.state === "See") ?
          <div className="see"> 
            <a href="/databases/buyordersdata">People Buying</a>
            <a href="/databases/sellordersdata">People Selling</a>
            <a href="/databases/AllMyOrders">All my Orders</a>
          </div> :
          null
        }
      </div>
    )
  }
}

export default Navigation