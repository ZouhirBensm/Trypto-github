// import React from 'react';
// TODO Make styles need to be put in a common folder
import { ThemeProvider } from 'react-bootstrap'
import '../orders-functionalities/styles/Make.css'

// TODO refactor naming in this component
// TODO add location fields google maps


class Make2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      unit: "BTC",
      popup_state: null,
      amountsTo_inBTC: undefined,
      amountsTo_inSAT: undefined,
      denomination: undefined,
      value: "N/A"
    }
    this.clickGetCryptoPrice = this.clickGetCryptoPrice.bind(this)
    this.clickCreateOrder = this.clickCreateOrder.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.change = this.change.bind(this)
    this.validateInputs = this.validateInputs.bind(this)

    console.log("constructor", this.props.match.params.type)
  }


  componentDidMount() {
    this.clickGetCryptoPrice()
  }


  toogleUnits(e) {
    e.preventDefault()
    console.log("toogle...")

    this.setState({
      unit: this.state.unit == "BTC" ? "SAT" : this.state.unit == "SAT" ? "BTC" : null
    })
  }

  async clickGetCryptoPrice(e = null) {
    e?.preventDefault()
    let crypto = document.getElementById('crypto-select').value
    let value
    let response
    let data

    try {
      response = await fetch(`/cryptoprice`)
    } catch (error) {
      alert(`Their seems to be an error. Enter Price manually. ${error}`)
    }


    if (response.ok) {
      data = await response.json()
      console.log("data", data)
      // console.log(crypto.toLowerCase())
      value = data.data[crypto.toLowerCase()]?.cad
      console.log("value", value)
      document.getElementById('conversion-select').value = value
    } else {
      console.error(`Error on the clickGetCryptoPrice() function response.status: ${response.status}`)
    }

    this.handleChange()
  }

  async handleChange() {
    console.log("changing....")


    let _price, _conversionRate, _crypto, _denomination,amountsToBTC, amountsToSAT, amountsToRaw


    _conversionRate = document.getElementById("form_id").elements["conversion"].value


    var crypto_sel = document.getElementById("form_id").elements["crypto"];

    _denomination = crypto_sel.options[crypto_sel.selectedIndex].text;
    _crypto = crypto_sel.value


    _price = document.getElementById("form_id").elements["price"].value
    amountsToRaw = _price / _conversionRate

    amountsToBTC = amountsToRaw.toFixed(9)
    amountsToSAT = Math.trunc(amountsToRaw * 1000000000)


    console.log(_price, _conversionRate, _crypto, _denomination)



    this.setState({
      amountsTo_inBTC: amountsToBTC,
      amountsTo_inSAT: amountsToSAT,
      denomination: _denomination,
    })

    

  }

  validateInputs(_packagedObjectToSendinFetch) {
    console.log("validating inputs", _packagedObjectToSendinFetch)

    let error
    const preventInjectionsRegEx = /[<>;}{\&]/;

    for (const property in _packagedObjectToSendinFetch) {
      console.log(`${property}: ${_packagedObjectToSendinFetch[property]}`);

      if (_packagedObjectToSendinFetch[property] == '' || preventInjectionsRegEx.test(_packagedObjectToSendinFetch[property])) {
        error = `This field: ${property}, inputed value is not proper. Please modify`
        break
      }

    }


    // console.log("------>>>", parseInt(_packagedObjectToSendinFetch.minprice), parseInt(_packagedObjectToSendinFetch.maxprice), parseInt(_packagedObjectToSendinFetch.minprice) > parseInt(_packagedObjectToSendinFetch.maxprice))



    let expireAt = new Date(_packagedObjectToSendinFetch.expirydate.slice(0, 4), _packagedObjectToSendinFetch.expirydate.slice(5, 7) - 1, _packagedObjectToSendinFetch.expirydate.slice(8, 10), _packagedObjectToSendinFetch.expirytime.slice(0, 2), _packagedObjectToSendinFetch.expirytime.slice(3, 5))



    if (expireAt < new Date() && !error) {
      error = `Expiry date & time cannot set before now. Please modify`
    }



    if (error) {
      this.setState({
        popup_state: error
      })
    } else { return true }

  }

  async clickCreateOrder(e) {
    e.preventDefault()

    let _denomination, crypto_sel, _crypto

    crypto_sel = document.getElementById("form_id").elements["crypto"];
    _denomination = crypto_sel.options[crypto_sel.selectedIndex].text;


    console.log("this.props.match.params.type", this.props.match.params.type)



    let packagedObjectToSendinFetch = {
      title: document.getElementById("form_id").elements["title"].value,
      category: document.getElementById("form_id").elements["category"].value,
      price: document.getElementById("form_id").elements["price"].value,
      crypto: document.getElementById("form_id").elements["crypto"].value,
      conversion: document.getElementById("form_id").elements["conversion"].value,
      conversion: document.getElementById("form_id").elements["conversion"].value,
      expirydate: document.getElementById("form_id").elements["expirydate"].value,
      expirytime: document.getElementById("form_id").elements["expirytime"].value,
      payment: document.getElementById("form_id").elements["payment"].value,
      chain: _denomination,
    }

    // console.log(packagedObjectToSendinFetch, "sellorders")

    let validated = this.validateInputs(packagedObjectToSendinFetch)
    if (!validated) return


    console.log(`/marketplace/sellorders/save`)

    let response = await fetch(`/marketplace/sellorders/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(packagedObjectToSendinFetch)
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
        this.setState({
          popup_state: "Server did not respond as expected. A error was probably thrown on the server. Please have a look!"
        })
        break;
    }

    // let json_SRV = await response.json()
    // console.log("server response json:", json_SRV)


  }

  setOptions(_denomination) {
    let options
    let tag_options_arr_data = []

    if (_denomination == "Bitcoin Base Chain") {
      tag_options_arr_data = ["Wallet1", "Wallet2", "Wallet3", "Wallet4"]
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else if (_denomination == "Bitcoin Lightning") {
      tag_options_arr_data = ["Wallet5", "Wallet6", "Wallet7", "Wallet8"]
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else if (_denomination == "Bitcoin Liquid") {
      tag_options_arr_data = ["Wallet9", "Wallet10", "Wallet11", "Wallet12"]
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else { }

    console.log("SELECT:", document.getElementById('payment-select')?.options[0].selected)

    return options
  }

  change(event) {
    this.setState({
      value: event.target.value
    });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.value != nextState.value;
  // }


  render() {


    console.log("----------->>>>", this.state.denomination)
    let options = this.setOptions(this.state.denomination)


    console.log(this.state.unit)

    let amountsTo_inBTC = `${this.state.amountsTo_inBTC} BTC`
    let amountsTo_inSAT = `${this.state.amountsTo_inSAT} SATs`

    return (
      <div className="make-container">

        <form className="form" id="form_id">

          <h3>Making a {this.props.match.params.type} order...</h3><br />


          <label htmlFor="title-select">Title</label>
          <input type="text" id="title-select" defaultValue='SomeObject' name="title" required /><br />

          <label htmlFor="category-select">Category</label>
          <select name="category" id="category-select" required>
            <option value="Other" defaultValue>Other</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Clothes">Clothes</option>
            <option value="Electronics">Electronics</option>
            <option value="Automobile">Automobile</option>
            <option value="Camping">Camping</option>
            <option value="Furniture">Furniture</option>
          </select><br />


          

          <label htmlFor="price-select">Price in CAD</label>
          <input onChange={(e) => this.handleChange(e)} type="number" id="price-select" name="price" step="0.01" required defaultValue='135' /><br />



          <label htmlFor="crypto-select">Chain Network</label>
          <select onChange={(e) => this.handleChange(e)} name="crypto" id="crypto-select" required>
            <option value="Bitcoin" defaultValue>Bitcoin Base Chain</option>
            <option value="Bitcoin">Bitcoin Lightning</option>
            <option value="Bitcoin">Bitcoin Liquid</option>
          </select> <br />


          <label htmlFor="conversion-select">{this.props.match.params.type} based on what BTC value</label>
          <input onChange={(e) => this.handleChange(e)} type="number" id="conversion-select" name="conversion" step="0.01" required defaultValue='0' />
          <button onClick={(e) => { this.clickGetCryptoPrice(e) }}>Market</button><br />

          <span>Amounts to: {this.state.unit == "BTC" ? amountsTo_inBTC : this.state.unit == "SAT" ? amountsTo_inSAT : null}</span><br />
          <button onClick={(e) => { this.toogleUnits(e) }}>in {this.state.unit == "BTC" ? "SAT" : this.state.unit == "SAT" ? "BTC" : null}</button><br />








          <label htmlFor="expirydate-select">Order Expiry Date</label>
          <input id="expirydate-select" type="date" name="expirydate" required defaultValue='2022-12-25' /><br />

          <label htmlFor="expirytime-select">Order Expiry Time</label>
          <input id="expirytime-select" type="time" name="expirytime" required defaultValue='08:00' /><br />

          <label htmlFor="payment-select">Payment on</label>
          <select name="payment" id="payment-select" onChange={this.change} required value={this.state.value}>
            <option value="N/A" defaultValue>N/A</option>
            {options}
            {/* <option value="Wallet2" defaultValue>Wallet1</option>
              <option value="BlueWallet">BlueWallet</option>
              <option value="Strike">Strike</option>
              <option value="Wallet3">Wallet3</option>
              <option value="Wallet4">Wallet4</option>
              <option value="Wallet5">Wallet5</option> */}
          </select> <br />

          <button type="submit" onClick={(e) => this.clickCreateOrder(e)}>Submit</button>
        </form><br />


        {this.state.popup_state ?
          <p>{this.state.popup_state}</p>
          : null}

      </div>

    );
  }
}

export default Make2