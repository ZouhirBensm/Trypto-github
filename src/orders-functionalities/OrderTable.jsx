import React, { Component } from 'react';

class OrderTable extends Component {

  constructor(props){
    super(props)
    this.state = {
      orderID_toToggle: undefined,
      buttons: this.props.buttons
    }
    this.handleToogleEdit = this.handleToogleEdit.bind(this)
  }

  handleToogleEdit(buttons, valueid, e){
    //e.preventDefault()
    //console.log(e.target.value);
    this.setState(prevState => ({
      orderID_toToggle: valueid,
      buttons: buttons
    }))
  }

  render(){
    // console.log("Parent toogled id ", this.state.orderID_toToggle )
    // console.log("buttons ", this.state.buttons )

    const ordersRow = this.props.orders.map((order) => {
      return <OrderRow 
      handleClick={this.props.handleClick} 
      buttons={order._id === this.state.orderID_toToggle? this.state.buttons: this.props.buttons} 
      order_type={this.props.order_type} 
      key={order._id} 
      order={order}
      handleToogleEdit={this.handleToogleEdit}
      />
    })
    // console.log("Does Not Require Keys: ", ordersRow)

    return(
      <table className="bordered-table">
        {/* <thead>
          <tr>
            <th>Order _id</th>
            <th>Posted by</th>
            <th>Date Posted</th>
            <th>Crypto</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Expiry</th>
            <th>Payment</th>
            <th>Deal</th>
          </tr>
        </thead> */}
        <tbody>
          {ordersRow}
        </tbody>
      </table>
    );
  }
}


class OrderRow extends Component {
  constructor(props){
    super(props)
    // this.state = {
    // }
  }

  render(){
    console.log("state buttons child", this.props.buttons)
    const order = this.props.order;

    console.log(order)
    let display_normal = [];
    let display_editing = [];
    // console.log(this.props.buttons)
    
    let amount_normal;
    let amount_editing;
    // console.log("WTF ", this.props.order_type)
    // console.log(order)
    if (this.props.order_type == "buyordersdata") {
      amount_normal = <td id="amount1" key={`td-amount-key-order:${order._id}`}>{'Amount: ' + order.amount}</td>
      amount_editing =      
      <td id="amount1" key={`td-edit-amount-key-order:${order._id}`}>
        <BuyAmount amount = {order.amount} />
      </td>   
    }

    if (this.props.order_type == "sellordersdata") {
      amount_normal = <td id="amount1" key={`td-amount-key-order:${order._id}`}>{'Amount Range: ' +  order.minamount}-{order.maxamount}</td>
      amount_editing =
      <td id="amount1" key={`td-edit-amount-key-order:${order._id}`}>
        <SellAmount minamount = {order.minamount} maxamount = {order.maxamount}/>
      </td>   
    }

    display_normal.push(
      <td id="crypto1" key={`td-crypto-key-order:${order._id}`}>{order.crypto}</td>,
      <td id="price1" key={`td-price-key-order:${order._id}`}>{'Price: ' + order.price}</td>,
      <td id="expiry1" key={`td-expiry-key-order:${order._id}`}>{'Exp.: ' + order.expirydate}@{order.expirytime}</td>,
      <td id="payment1" key={`td-payment-key-order:${order._id}`}>{order.payment}</td>,
      amount_normal,
    )

    if (this.props.buttons == "normal") {
      display_normal.push(<td id="deal1" key={`td-deal-key-order:${order._id}`}><a href="/messaging"><button>Deal</button></a></td>)
    }
  
    if (this.props.buttons == "my") {
      display_normal.push(<td id="button1" key={`td-button1-key-order:${order._id}`}><button onClick={(e) => this.props.handleClick(this.props.order_type, order._id, e)}>Delete</button></td>, <td id="button2" key={`td-button2-key-order:${order._id}`}><button onClick={(e) => this.props.handleToogleEdit("edit", order._id, e)}>Update</button></td>)
    }

    if (this.props.buttons == "edit") {
      display_editing.push(
        <td id="form4" key={`td-edit-form4-key-order:${order._id}`}><form action="/update" method="post" id="my_form"></form></td>,
        <td id="ordertype4" key={`td-edit-ordertype4-key-order:${order._id}`}><input form="my_form" type='hidden' name='OrderType' value={this.props.order_type}/></td>,
        <td id="orderid4" key={`td-edit-orderid4-key-order:${order._id}`}><input form="my_form" type='hidden' name='OrderID' value={order._id}/> </td>,
        <td id="crypto1" key={`td-edit-crypto-key-order:${order._id}`}>
          <label htmlFor="crypto-select">Crypto</label>
          <TheSelectCrypto 
            curentValue = {order.crypto}
          />
        </td> ,
        amount_editing,
        <td id="price1" key={`td-edit-price-key-order:${order._id}`}>
          <label htmlFor="price-select">Price</label>
          <input form="my_form" type="number" id="price-select" name="NewPrice" min="0" required defaultValue={order.price}/> 
        </td>,
        <td id="expiry1" key={`td-edit-expiry-key-order:${order._id}`}>
          <label htmlFor="expirydate-select">Order Expiry Date</label>
          <input form="my_form" id="expirydate-select" type="date" name="NewExpiryDate" required defaultValue={order.expirydate}/>
          <label htmlFor="expirytime-select">Order Expiry Time</label>
          <input form="my_form" id="expirytime-select" type="time" name="NewExpiryTime" required defaultValue={order.expirytime}/>
        </td> ,
        <td id="payment1" key={`td-edit-payment-key-order:${order._id}`}>
          <label htmlFor="payment-select">Payment</label>
          <TheSelectPayment 
            curentValue = {order.payment}
          />
        </td>,
        <td id="button1" key={`td-edit-button1-key-order:${order._id}`}><input form="my_form" type="submit" value='Save'/></td>,
        <td id="button2" key={`td-edit-button2-key-order:${order._id}`}><button onClick={(e) => this.props.handleToogleEdit("my", order._id, e)}>Revert</button></td>
      )
    }

    // console.log("Require Keys: ", display_editing)
    return(
      <tr>
        <td id="id1">{order._id}</td>
        <td id="email1">{order.userid.email} wants to buy</td>
        <td id="posteddate1">{'On: ' + order.postedDate}</td>
        {this.props.buttons == "normal" || this.props.buttons == "my" ? display_normal: null}
        {this.props.buttons == "edit" ? display_editing: null}
      </tr>
    );
  }
}














function TheSelectCrypto(props){
  let currentValue = props.curentValue;
  return(
  <select form="my_form" name="NewCrypto" id="crypto-select" required defaultValue={currentValue}>
    <option value="Bitcoin">Bitcoin</option>
    <option value="Ethereum">Ethereum</option>
    <option value="Litecoin">Litecoin</option>
    <option value="Bitcoin Cash">Bitcoin Cash</option>
    <option value="Zcash">Zcash</option>
    <option value="Monero">Monero</option>
  </select>
 )
}

function BuyAmount(props) {
  return(
  <div>
    <label htmlFor="amount-select">Amount</label>
    <input form="my_form" type="number" id="amount-select" name="NewAmount" min="10" max="10000" required defaultValue={props.amount}/>  
  </div>
  )
}

function SellAmount(props) {
  return (
  <div>
      <label htmlFor="min-amount-select">Min Amount</label>
      <input form="my_form" type="number" id="min-amount-select" name="NewMinAmount" required defaultValue={props.minamount}/> 
      <label htmlFor="max-amount-select">Max Amount</label>
      <input form="my_form" type="number" id="max-amount-select" name="NewMaxAmount" required defaultValue={props.maxamount}/> 
  </div>
  )
}

function TheSelectPayment(props){
  let currentValue = props.curentValue;
  return(
  <select form="my_form" name="NewPayment" id="payment-select" required defaultValue={currentValue}>
    <option value="Paypal">Paypal</option>
    <option value="Interac">Interac</option>
    <option value="Cash">Cash</option>
  </select>
 )
}

export default OrderTable