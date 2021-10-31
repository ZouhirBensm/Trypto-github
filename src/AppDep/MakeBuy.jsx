import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../styles/Make.css'


class MakeBuy extends Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
   
  }

  handleClick(e){
    e.preventDefault()
    let crypto = document.getElementById('crypto-select').value
    let amount = document.getElementById('amount-select').value
    let value
    console.log(crypto, amount)
    
    fetch('http://localhost:3000/api')
    .then(res => res.json())
    .then(data => {
      value = data.data[crypto.toLowerCase()].cad
      console.log(value)
      document.getElementById('price-select').value = value
    })
    .catch(e => alert(`Their seems to be an error. Enter Price manually. ${e}`))
  }
  render() {
    return (
      <form action="/buyorders/store" method="POST" className="form">
        <h3>Making a buy order...</h3>
        <label htmlFor="crypto-select">Crypto</label>
        <select name="crypto" id="crypto-select" required>
            <option value="Bitcoin" defaultValue>Bitcoin</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Litecoin">Litecoin</option>
            <option value="Bitcoin Cash">Bitcoin Cash</option>
            <option value="Zcash">Zcash</option>
            <option value="Monero">Monero</option>
        </select> 
        <label htmlFor="amount-select">Amount (CAD)</label>
        <input type="number" id="amount-select" name="amount" required defaultValue='100'/>  
        <label htmlFor="price-select">Price/Unit</label>
        <input type="number" id="price-select" name="price" step="0.01" required defaultValue='50000'/> 
        <button onClick={this.handleClick}>Market</button>
        <label htmlFor="expirydate-select">Order Expiry Date</label>
        <input id="expirydate-select" type="date" name="expirydate" required defaultValue='2022-09-15'/>
        <label htmlFor="expirytime-select">Order Expiry Time</label>
        <input id="expirytime-select" type="time" name="expirytime" required defaultValue='08:00'/>
        <label htmlFor="payment-select">Payment</label>
        <select name="payment" id="payment-select" required>
            <option value="Paypal" defaultValue>Paypal</option>
            <option value="Interac">Interac</option>
            <option value="Cash">Cash</option>
        </select> 
        <button type="submit">Submit</button>

      </form>
    );
  }
}

export default MakeBuy