import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../styles/Make.css'


class MakeSell extends Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
   
  }

  handleClick(e){
    e.preventDefault()
    let crypto = document.getElementById('crypto-select').value
    // let minamount = document.getElementById('min-amount-select').value
    // let maxamount = document.getElementById('max-amount-select').value
    let value
    //console.log(crypto, minamount, maxamount)
    
    fetch(`${process.env.ROOT}/api`)
    .then(res => res.json())
    .then(data => {
      value = data.data[crypto.toLowerCase()].cad
      //console.log(value)
      document.getElementById('price-select').value = value
    })
    .catch(e => alert(`Their seems to be an error. Enter Price manually. ${e}`))
  }
  render() {
    return (
    <form action="/sellorders/store" method="POST" className="form">  
    <h3>Making a sell order...</h3>
      <label htmlFor="crypto-select">Crypto</label>
      <select name="crypto" id="crypto-select" required>
        <option value="Bitcoin">Bitcoin</option>
        <option value="Ethereum" defaultValue>Ethereum</option>
        <option value="Litecoin">Litecoin</option>
        <option value="Bitcoin Cash">Bitcoin Cash</option>
        <option value="Zcash">Zcash</option>
        <option value="Monero">Monero</option>
      </select>   
      
      <label htmlFor="min-amount-select">Min Amount (CAD)</label>
      <input type="number" id="min-amount-select" name="minamount" required defaultValue='500'/>  

      <label htmlFor="max-amount-select">Max Amount (CAD)</label>
      <input type="number" id="max-amount-select" name="maxamount" required defaultValue='1000'/> 

      <label htmlFor="price-select">Price/Unit</label>
      <input type="number" id="price-select" name="price" step="0.01" required defaultValue='500'/> 
      <button onClick={this.handleClick}>Market</button>

      <label htmlFor="expirydate-select">Order Expiry Date</label>
      <input id="expirydate-select" type="date" name="expirydate" required defaultValue='2022-11-15'/>

      <label htmlFor="expirytime-select">Order Expiry Time</label>
      <input id="expirytime-select" type="time" name="expirytime" required defaultValue='08:37'/>

      
      <label htmlFor="payment-select">Payment</label>
      <select name="payment" id="payment-select" required>
          <option value="Paypal">Paypal</option>
          <option value="Interac" defaultValue>Interac</option>
          <option value="Cash">Cash</option>
      </select> 

      <button type="submit">Submit</button>
    </form>
    );
  }
}

export default MakeSell