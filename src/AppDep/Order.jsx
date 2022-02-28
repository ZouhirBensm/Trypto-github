import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import Edit from './Edit';
import Form from './Form';
import '../styles/Order.css'



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
    const response1 = await fetch(`${process.env.ROOT}/databases/CurrentUserID`)  
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
    //console.log('here', this.props.type)
    return (
      
    <React.Fragment>
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
        handleclick = {this.handleClick}
        /> :
        <Form
        orderid = {order._id}
        email = {order.userid.email}
        postedDate = {order.postedDate}
        crypto = {order.crypto}
        amount = {order.amount ? order.amount : ''}
        minamount = {order.minamount ? order.minamount : ''}
        maxamount = {order.maxamount ? order.maxamount : ''}
        price = {order.price}
        expirydate = {order.expirydate}
        expirytime = {order.expirytime}
        payment = {order.payment}
        valuetype = {this.props.type}
        valueid = {order._id}
        handleclick = {this.handleClick}
        handleDelete = {this.props.handleDelete}
        
        on_off_limit_previous={this.props.on_off_limit_previous}
        on_off_limit_next={this.props.on_off_limit_next}
        limit={this.props.limit}
        number_of_pages={this.props.number_of_pages}
        />
      }
    </React.Fragment>
    );
  }
}

export default Order