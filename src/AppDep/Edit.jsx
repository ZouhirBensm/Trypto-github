import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import '../styles/Edit.css'



class Edit extends Component {
  render() {
    return (
        // <form action="/update" method="post" id="my_form">
        //   <input type='hidden' name='UserID' value={this.props.userid}/> 
        //   <input type='hidden' name='OrderType' value={this.props.ordertype}/> 
        //   <input type='hidden' name='OrderID' value={this.props.orderid}/> 

        //   <label htmlFor="crypto-select">Crypto</label>
        //   <TheSelectCrypto 
        //     curentValue = {this.props.crypto}
        //   />

        //   <Amount ordertype={this.props.ordertype} amount={this.props.amount} minamount={this.props.minamount} maxamount={this.props.maxamount}/>


        //   <label htmlFor="price-select">Price</label>
        //   <input type="number" id="price-select" name="NewPrice" min="0" required defaultValue={this.props.price}/> 
        //   <label htmlFor="expirydate-select">Order Expiry Date</label>
        //   <input id="expirydate-select" type="date" name="NewExpiryDate" required defaultValue={this.props.expirydate}/>
        //   <label htmlFor="expirytime-select">Order Expiry Time</label>
        //   <input id="expirytime-select" type="time" name="NewExpiryTime" required defaultValue={this.props.expirytime}/>
          
        //   <label htmlFor="payment-select">Payment</label>
        //   <TheSelectPayment 
        //     curentValue = {this.props.payment}
        //   />
        //   <button onClick={this.props.handleclick}>Update</button>
        //   <input type="submit" onClick={this.props.handleclick} value='Update this order'/>
        // </form>

    <tr className="edit">
        <td id="form4"><form action="/update" method="post" id="my_form"></form></td>
        <td id="userid4"><input form="my_form" type='hidden' name='UserID' value={this.props.userid}/></td>
        <td id="ordertype4"><input form="my_form" type='hidden' name='OrderType' value={this.props.ordertype}/></td>
        <td id="orderid4"><input form="my_form" type='hidden' name='OrderID' value={this.props.orderid}/> </td>
        <td id="crypto4">
          <label htmlFor="crypto-select">Crypto</label>
          <TheSelectCrypto 
            curentValue = {this.props.crypto}
          />
        </td>
        <td id="amount4">
          <Amount ordertype={this.props.ordertype} amount={this.props.amount} minamount={this.props.minamount} maxamount={this.props.maxamount}/>
        </td>
        <td id="price4">
          <label htmlFor="price-select">Price</label>
          <input form="my_form" type="number" id="price-select" name="NewPrice" min="0" required defaultValue={this.props.price}/> 
        </td>
        <td id="expiry4">
          <label htmlFor="expirydate-select">Order Expiry Date</label>
          <input form="my_form" id="expirydate-select" type="date" name="NewExpiryDate" required defaultValue={this.props.expirydate}/>
          <label htmlFor="expirytime-select">Order Expiry Time</label>
          <input form="my_form" id="expirytime-select" type="time" name="NewExpiryTime" required defaultValue={this.props.expirytime}/>
        </td>

        <td id="payment4">
         <label htmlFor="payment-select">Payment</label>
         <TheSelectPayment 
           curentValue = {this.props.payment}
         />
        </td>
        <td id="revert4">
          <button form="my_form" onClick={this.props.handleclick}>Revert</button>
        </td>
        <td id="submit4"><input form="my_form" type="submit" value='Save Edits'/></td>
    </tr>

      
     
      

      
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