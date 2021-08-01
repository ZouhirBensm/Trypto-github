import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import Edit from './Edit';




class Order extends Component {
  constructor(){
    super()
    this.state = {
      userId: '',
      showComponent: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    //e.preventDefault()
    //console.log(e.target.value);
    this.setState(prevState => ({
      showComponent: !prevState.showComponent
    }));
  }

  componentDidMount(){
    //DOM is ready
    this.loadData()
  }
  async loadData() {
    let _userID = ''
    const response1 = await fetch('http://localhost:3000/databases/CurrentUserID')  
    const data = await response1.json()
    _userID = data.data
    // .then(response1 => response1.json())
    // .then(data => {
    //   _userID = data.data
    // });

    this.setState({
      userId: _userID,
    })
  }

  render() {
    const order = this.props.order;
    console.log('here', this.props.type)
    return (
    <tr>
      <td>{order._id}</td>
      <td>{order.userid.email}</td>
      <td>{order.postedDate}</td>
      <td>{order.crypto}</td>

      <td>{order.amount ? order.amount : ''}</td>

      <td>{order.minamount ? order.minamount : ''}</td>
      <td>{order.maxamount ? order.maxamount : ''}</td>

      <td>{order.price}</td>
      <td>{order.expirydate}</td>
      <td>{order.expirytime}</td>
      <td>{order.payment}</td>
      <td>{this.props.type}</td>
      <td>
        <form action="/deleteThisOrder" method="post">
          <input type='hidden' name='OrderType' value={this.props.type}/> 
          <input type='hidden' name='OrderID' value={order._id}/> 
          <input type="submit" value='Delete this order'/>
        </form>
      </td>
      <td>   
       <button onClick={this.handleClick}>Update</button>
        {this.state.showComponent ?
            <Edit           
            orderid={order._id}
            ordertype={this.props.type}
            userid={this.state.userId}
            
            crypto = {order.crypto}

            amount = {order.amount ? order.amount : ''}

            minamount = {order.minamount ? order.minamount : ''}
            maxamount = {order.maxamount ? order.maxamount : ''}
            
            price={order.price}
            expirydate={order.expirydate}
            expirytime={order.expirytime}
            payment={order.payment}
            /> :
           null
          }
      </td>
    </tr>
    );
  }
}

export default Order