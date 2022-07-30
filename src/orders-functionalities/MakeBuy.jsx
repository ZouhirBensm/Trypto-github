// import React from 'react';
import './styles/Make.css'


class MakeBuy extends React.Component {
  constructor(){
    super()
    this.state = {
      popup_state: null,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async handleSubmit(e){
    e.preventDefault()
    // console.log(e.target.parentNode)
    // console.log(document.getElementById("form_id").elements);
    // console.log(document.getElementById("form_id").elements[6].value)

    let response = await fetch(`${process.env.ROOT}/buyorders/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        crypto: document.getElementById("form_id").elements[0].value,
        amount: document.getElementById("form_id").elements[1].value,
        price: document.getElementById("form_id").elements[2].value,
        expirydate: document.getElementById("form_id").elements[4].value,
        expirytime: document.getElementById("form_id").elements[5].value,
        payment: document.getElementById("form_id").elements[6].value,
        // iterator: document.getElementById("form_id").elements[7].value,
      })
    })

    console.log("server response status:", response.status)

    switch (response.status) {
      case 200:
        console.log(200)
        this.setState({
          popup_state: "You have successfully made an order"
        })
        break;
      case 400:
        console.log(400)
        this.setState({
          popup_state: "Expiry time and date field cannot be before present, please modify, and retry submission."
        })
        break;
      case 500:
        console.log(500)
        this.setState({
          popup_state: "An issue has occured, please try again later. A website maintainer is looking into the mater."
        })
        break;
    
      default:
        break;
    }

    let json_SRV = await response.json()
    console.log("server response json:", json_SRV)

  }

  handleClick(e){
    e.preventDefault()
    let crypto = document.getElementById('crypto-select').value
    // let amount = document.getElementById('amount-select').value
    let value
    //console.log(crypto, amount)
    
    fetch(`${process.env.ROOT}/cryptoprice`)
    
    .then(res => res.json())
    .then(data => {
      value = data.data[crypto.toLowerCase()].cad
      //console.log(value)
      document.getElementById('price-select').value = value
    })
    .catch(e => alert(`Their seems to be an error. Enter Price manually. ${e}`))
  }
  render() {
    // console.log("(1) (render) iterator", this.state.iterator, this.state.message)
    return (
      <div className="make-container">
        <form className="form" id="form_id">
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
          {/* <input type="hidden" name="iterator" value={this.state.iterator}/> */}
          <button type="submit" onClick={(e) => this.handleSubmit(e)}>Submit</button>
        </form>

        {this.state.popup_state?
        <p>{this.state.popup_state}</p>
        :null}
        
      </div>

    );
  }
}

export default MakeBuy