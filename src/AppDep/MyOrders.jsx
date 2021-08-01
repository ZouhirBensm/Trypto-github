import React, { Component } from 'react';
import Order from './Order';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Edit from '../Matches';
let fetchedOrders = {}
let type

// function repairData(_fetchedOrders){
//   let _repairedData = []
//   _repairedData = _fetchedOrders.data
//   return _repairedData
// }


class MyOrders extends Component {
  constructor(){
    super()
    this.state = {
      userId: '',
      orderstype: 'buy',
      orders: [],
    }
    this.handleClick = this.handleClick.bind(this)
   
  }




  componentDidMount(){
    //DOM is ready
    this.loadData(this.state.orderstype)
  }
  async loadData(_orderstype) {
    let _userID = ''
    const response1 = await fetch('http://localhost:3000/databases/CurrentUserID')    
    // .then(response1 => response1.json())
    // .then(data => {
    //   _userID = data.data
    // });
    //OR
    const data = await response1.json()
    _userID = data.data

    console.log(_orderstype)
    //console.log('This',_userID)
    // if (_orderstype === '') {
    //   _orderstype = 'buy'
    // }
    const response2 = await fetch(`http://localhost:3000/data/${_orderstype}/${_userID}`)
    
    // .then(response2 => response2.json())
    // .then((data) => {
    //   fetchedOrders = data.data // you can pass the data to repairData function
    // });
    //OR
    const data2 = await response2.json()
    fetchedOrders = data2.data

    //console.log(data.type)
    this.setState({
      userId: _userID,
      orders: fetchedOrders
    })
    
  }

  componentDidUpdate(prevProps, prevState) {

    // Typical usage (don't forget to compare props):
    if (this.state.orderstype !== prevState.orderstype) {
      this.loadData(this.state.orderstype);
      
    }
  }
  handleClick(e){
    //e.preventDefault()
    //console.log(e.target.value);
    this.setState({
      orderstype: e.target.value
    })
  }
  render() {

    //console.log(this.state.orderstype)
    const myOrdersRows = this.state.orders.map(order => {
        return <Order key={order._id} order={order} type={this.state.orderstype}/>
      }
    )
    
    
    return (
      <div>
        <form name="toogle">
          <label><input type="radio" id="Buy" name="radio" value='buy' defaultChecked onClick={this.handleClick}/>Buy</label>
          <label><input type="radio" id="Sell" name="radio" value='sell' onClick={this.handleClick}/>Sell</label>  
        </form>
        <h1>State: {this.state.orderstype}</h1>
        <table className="bordered-table">
        <thead>
          <tr>
            <th>Order _id</th>
            <th>Posted By</th>
            <th>Date Posted</th>
            <th>Crypto</th>

            <th>Amount</th>

            <th>Min Amount</th>
            <th>Max Amount</th>
            
            <th>Price</th>
            <th>Expiry Date</th>
            <th>Expiry Time</th>
            <th>Payment</th>
            <th>Type</th>
            <th>Delete?</th>
            <th>Update Amount</th>
          </tr>
        </thead>
        <tbody>
          {myOrdersRows}
        </tbody>
      </table>


      </div>
    );
  }
}

export default MyOrders