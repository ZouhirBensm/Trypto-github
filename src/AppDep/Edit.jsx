import React, {Component} from 'react';
import ReactDOM from 'react-dom'



class Edit extends Component {
 

  render() {

    return (
      <div>
        <form action="/update" method="post">
          <input type='hidden' name='UserID' value={this.props.userid}/> 
          <input type='hidden' name='OrderType' value={this.props.ordertype}/> 
          <input type='hidden' name='OrderID' value={this.props.orderid}/> 

          <label htmlFor="crypto-select">Crypto</label>
          <TheSelectCrypto 
            curentValue = {this.props.crypto}
          />

          <Amount ordertype={this.props.ordertype} amount={this.props.amount} minamount={this.props.minamount} maxamount={this.props.maxamount}/>


          <label htmlFor="price-select">Price</label>
          <input type="number" id="price-select" name="NewPrice" min="0" required defaultValue={this.props.price}/> 
          <label htmlFor="expirydate-select">Order Expiry Date</label>
          <input id="expirydate-select" type="date" name="NewExpiryDate" required defaultValue={this.props.expirydate}/>
          <label htmlFor="expirytime-select">Order Expiry Time</label>
          <input id="expirytime-select" type="time" name="NewExpiryTime" required defaultValue={this.props.expirytime}/>
          
          <label htmlFor="payment-select">Payment</label>
          
          <TheSelectPayment 
            curentValue = {this.props.payment}
          />


          
          <input type="submit" value='Update this order'/>
        </form>

      </div>
    );
  }
}


export default Edit
// const element = <Edit />;

// ReactDOM.render(element, document.getElementById('contents'));

function BuyAmount(props) {
  return(
  <div>
    <label htmlFor="amount-select">Amount</label>
    <input type="number" id="amount-select" name="NewAmount" min="10" max="10000" required defaultValue={props.amount}/>  
  </div>
  )
}

function SellAmount(props) {
  return (
  <div>
      <label htmlFor="min-amount-select">Min Amount</label>
      <input type="number" id="min-amount-select" name="NewMinAmount" required defaultValue={props.minamount}/> 
      <label htmlFor="max-amount-select">Max Amount</label>
      <input type="number" id="max-amount-select" name="NewMaxAmount" required defaultValue={props.maxamount}/> 
  </div>
  )
}

function Amount(props) {
  const OrderType = props.ordertype;
  if (OrderType === 'buy') {    
    return <BuyAmount amount = {props.amount} />;  
  } else if (OrderType === 'sell'){
    return <SellAmount minamount = {props.minamount} maxamount = {props.maxamount}/>;}
  } 


  function TheSelectCrypto(props){
    let currentValue = props.curentValue;
    return(
    <select name="NewCrypto" id="crypto-select" required defaultValue={currentValue}>
      <option value="Bitcoin">Bitcoin</option>
      <option value="Ethereum">Ethereum</option>
      <option value="Litecoin">Litecoin</option>
      <option value="Bitcoin Cash">Bitcoin Cash</option>
      <option value="Zcash">Zcash</option>
      <option value="Monero">Monero</option>
    </select>
   )
}

function TheSelectPayment(props){
  let currentValue = props.curentValue;
  return(
  <select name="NewPayment" id="payment-select" required defaultValue={currentValue}>
    <option value="Paypal">Paypal</option>
    <option value="Interac">Interac</option>
    <option value="Cash">Cash</option>
  </select>
 )
}