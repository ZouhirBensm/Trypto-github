// import React from 'react';
import './styles/Make.css'
import utils from '../../full-stack-libs/utils'


class Make extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      popup_state: null,
    }
    this.clickGetCryptoPrice = this.clickGetCryptoPrice.bind(this)
    this.clickCreateOrder = this.clickCreateOrder.bind(this)

    console.log("this.props.match.params.type------>>>>>", this.props.match.params.type, caseOptionBTClayerexchange, paths_URL, URL_)
  }


  async clickCreateOrder(e){
    e.preventDefault()
    // console.log(e.target.parentNode)
    // console.log(document.getElementById("form_id").elements);
    // console.log(document.getElementById("form_id").elements[6].value)

    let [url_param_order_type_to_save, amount_s] = []

    caseOptionBTClayerexchange === "makebuy"? [url_param_order_type_to_save, amount_s] = ["buyorders", ["amount"]]:
    caseOptionBTClayerexchange === "makesell"? [url_param_order_type_to_save, amount_s] = ["sellorders", ["minamount", "maxamount"]]:
    null

    let amount_fields_obj = {}
    for (const field of amount_s) {
      // console.log("field", field)
      amount_fields_obj[field] = document.getElementById("form_id").elements[field].value
    }

    // console.log(amount_fields_obj)

    // console.log({
    //   crypto: document.getElementById("form_id").elements["crypto"].value,
    //   ...amount_fields_obj,
    //   price: document.getElementById("form_id").elements["price"].value,
    //   expirydate: document.getElementById("form_id").elements["expirydate"].value,
    //   expirytime: document.getElementById("form_id").elements["expirytime"].value,
    //   payment: document.getElementById("form_id").elements["payment"].value,
    //   // iterator: document.getElementById("form_id").elements[7].value,
    // }, url_param_order_type_to_save)

    let response = await fetch(`/${url_param_order_type_to_save}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        crypto: document.getElementById("form_id").elements["crypto"].value,
        ...amount_fields_obj,
        price: document.getElementById("form_id").elements["price"].value,
        expirydate: document.getElementById("form_id").elements["expirydate"].value,
        expirytime: document.getElementById("form_id").elements["expirytime"].value,
        payment: document.getElementById("form_id").elements["payment"].value,
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

  clickGetCryptoPrice(e){
    e.preventDefault()
    let crypto = document.getElementById('crypto-select').value
    // let amount = document.getElementById('amount-select').value
    let value
    //console.log(crypto, amount)
    
    fetch(`/cryptoprice`)
    
    .then(res => res.json())
    .then(data => {
      value = data.data[crypto.toLowerCase()].cad
      //console.log(value)
      document.getElementById('price-select').value = value
    })
    .catch(e => alert(`Their seems to be an error. Enter Price manually. ${e}`))
  }
  render() {
    
    let amount_field
    if (caseOptionBTClayerexchange == "makebuy") {
      amount_field = 
      <React.Fragment>
        <label htmlFor="amount-select">Amount (CAD)</label>
        <input type="number" id="amount-select" name="amount" required defaultValue='100'/> 
      </React.Fragment>
    }

    if (caseOptionBTClayerexchange == "makesell") {
      amount_field = 
      <React.Fragment>
        <label htmlFor="min-amount-select">Min Amount (CAD)</label>
        <input type="number" id="min-amount-select" name="minamount" required defaultValue='500'/>  

        <label htmlFor="max-amount-select">Max Amount (CAD)</label>
        <input type="number" id="max-amount-select" name="maxamount" required defaultValue='1000'/> 
      </React.Fragment>
    }

    return (
      <div className="make-container">
        <form className="form" id="form_id">
          <h3>Making a {caseOptionBTClayerexchange} order...</h3>
          <label htmlFor="crypto-select">Crypto</label>
          <select name="crypto" id="crypto-select" required>
              <option value="Bitcoin" defaultValue>Bitcoin</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Litecoin">Litecoin</option>
              <option value="Bitcoin Cash">Bitcoin Cash</option>
              <option value="Zcash">Zcash</option>
              <option value="Monero">Monero</option>
          </select> 


          {amount_field}


          <label htmlFor="price-select">Price/Unit</label>
          <input type="number" id="price-select" name="price" step="0.01" required defaultValue='50000'/> 
          <button onClick={this.clickGetCryptoPrice}>Market</button>
          <label htmlFor="expirydate-select">Order Expiry Date</label>
          <input id="expirydate-select" type="date" name="expirydate" required defaultValue='2022-12-25'/>
          <label htmlFor="expirytime-select">Order Expiry Time</label>
          <input id="expirytime-select" type="time" name="expirytime" required defaultValue='08:00'/>
          <label htmlFor="payment-select">Payment</label>
          <select name="payment" id="payment-select" required>
              <option value="Paypal" defaultValue>Paypal</option>
              <option value="Interac">Interac</option>
              <option value="Cash">Cash</option>
          </select> 
          {/* <input type="hidden" name="iterator" value={this.state.iterator}/> */}
          <button type="submit" onClick={(e) => this.clickCreateOrder(e)}>Submit</button>
        </form>

        {this.state.popup_state?
        <p>{this.state.popup_state}</p>
        :null}
        
      </div>

    );
  }
}

export default Make