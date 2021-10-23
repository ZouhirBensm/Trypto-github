import React, { Component } from 'react';
import Order from './Order';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Edit from '../Matches';
import '../styles/MyOrders.css'
import PageSelector from './PageSelector';


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
      page: 1,
      limit: 3, //Limit per page defined here!
      nextPage: 2,
      previousPage: undefined,
      on_off_limit_next: false,
      on_off_limit_previous: true,
    }
    this.handleClick = this.handleClick.bind(this)
    this.controls = this.controls.bind(this);
  }

  controls(_page) {
    this.setState({
      page: _page
    }, () => {
      //console.log("callback: ", this.state.page)
      this.loadData(this.state.orderstype)
    })
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
    const response2 = await fetch(`http://localhost:3000/data/${_orderstype}/${_userID}?page=${this.state.page}&limit=${this.state.limit}`)
    
    // .then(response2 => response2.json())
    // .then((data) => {
    //   fetchedOrders = data.data // you can pass the data to repairData function
    // });
    //OR
    const data2 = await response2.json()
    
    fetchedOrders = data2.data.results

    //console.log(data.type)
    this.setState({
      userId: _userID,
      orders: fetchedOrders,
      nextPage: data2.data.next,
      previousPage: data2.data.previous,
    }, () => {
      if(this.state.nextPage==undefined){
        this.setState({
          on_off_limit_next: true
        })
      } else {
        this.setState({
          on_off_limit_next: false
        })
      }
      if(this.state.previousPage==undefined){
        this.setState({
          on_off_limit_previous: true
        })
      } else {
        this.setState({
          on_off_limit_previous: false
        })
      }

    })
    
  }


  handleClick(e){
    //e.preventDefault()
    //console.log(e.target.value);
    this.setState({
      orderstype: e.target.value,
      page: 1,
    }, () => {
      this.loadData(this.state.orderstype);
    })
  }
  render() {

    console.log(" parent updating: ", this.state.page)
    const myOrdersRows = this.state.orders.map(order => {
        console.log("boom: ", order)
        return <Order key={order._id} order={order} type={this.state.orderstype}/>
      }
    )
    
    
    return (
      <div className='wrapper2'>
        <form name="toogle">
          <label><input type="radio" id="Buy" name="radio" value='buy' defaultChecked onClick={this.handleClick}/>Buy</label>
          <label><input type="radio" id="Sell" name="radio" value='sell' onClick={this.handleClick}/>Sell</label>  
        </form>
        {/* <h1>State: {this.state.orderstype}</h1> */}
        <table className="bordered-table">
        {/* <thead>
          <tr>
            <th>Order _id</th>
            <th>Posted By</th>
            <th>Date Posted</th>
            <th>Crypto</th>

            <th>Amount</th>

            
            <th>Price</th>
            <th>Expiry Date</th>
            <th>Expiry Time</th>
            <th>Payment</th>
            
            <th>Delete?</th>
            <th>Update Amount</th>
          </tr>
        </thead> */}
        <tbody>
          {myOrdersRows}
        </tbody>
      </table>
      {console.log("parents fucking page: ", this.state.page)}
      <PageSelector page={this.state.page} on_off_limit_previous={this.state.on_off_limit_previous} on_off_limit_next={this.state.on_off_limit_next} previousPage={this.state.previousPage} nextPage={this.state.nextPage} controls={this.controls}/>

      </div>
    );
  }
}

export default MyOrders