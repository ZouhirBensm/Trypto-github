// import React from 'react';
// TODO Make styles need to be put in a common folder
import { ThemeProvider } from 'react-bootstrap'
import '../orders-functionalities/styles/Make.css'

// TODO refactor naming in this component


class Make2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      unit: "BTC",
      popup_state: null,
      amountsToMsg: undefined,
      amountsTo_inBTC: undefined,
      amountsTo_inSAT: undefined,
      denomination: undefined,
      value: "N/A"
    }
    this.clickGetCryptoPrice = this.clickGetCryptoPrice.bind(this)
    this.clickCreateOrder = this.clickCreateOrder.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.change = this.change.bind(this)

    console.log("constructor", this.props.match.params.type)
  }


  componentDidMount() {
    this.handleChange()
  }


  toogleUnits(e) {
    e.preventDefault()
    console.log("toogle...")

    this.setState({
      unit: this.state.unit == "BTC" ? "SAT" : this.state.unit == "SAT" ? "BTC" : null
    })
  }

  async clickGetCryptoPrice(e) {
    e.preventDefault()
    let crypto = document.getElementById('crypto-select').value
    // let amount = document.getElementById('amount-select').value
    let value
    //console.log(crypto, amount)
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


    let _price, _conversionRate, _crypto, _denomination, _minprice, _maxprice, amountsToRaw, amountsToRawMin, amountsToRawMax, _unit, amountsToBTC, amountsToSAT, amountsToBTC_bottom, amountsToSAT_bottom, amountsToBTC_top, amountsToSAT_top, amountsToDisplay, amountsToDisplayRange


    _conversionRate = document.getElementById("form_id").elements["conversion"].value


    var crypto_sel = document.getElementById("form_id").elements["crypto"];

    _denomination = crypto_sel.options[crypto_sel.selectedIndex].text;
    _crypto = crypto_sel.value

    if (this.props.match.params.type == "makebuy") {
      _minprice = document.getElementById("form_id").elements["minprice"].value
      _maxprice = document.getElementById("form_id").elements["maxprice"].value

      amountsToRawMin = _minprice / _conversionRate
      amountsToRawMax = _maxprice / _conversionRate

      amountsToBTC_bottom = amountsToRawMin.toFixed(9)
      amountsToBTC_top = amountsToRawMax.toFixed(9)
      amountsToSAT_bottom = Math.trunc(amountsToRawMin * 1000000000)
      amountsToSAT_top = Math.trunc(amountsToRawMax * 1000000000)

    }
    if (this.props.match.params.type == "makesell") {
      _price = document.getElementById("form_id").elements["price"].value
      amountsToRaw = _price / _conversionRate

      amountsToBTC = amountsToRaw.toFixed(9)
      amountsToSAT = Math.trunc(amountsToRaw * 1000000000)
    }



    console.log(_price, _minprice, _maxprice, _conversionRate, _crypto, _denomination)



    this.setState({
      amountsTo_inBTC: amountsToBTC || [amountsToBTC_bottom, amountsToBTC_top],
      amountsTo_inSAT: amountsToSAT || [amountsToSAT_bottom, amountsToSAT_top],
      denomination: _denomination,
    })

    // if(_denomination == "Bitcoin Base Chain") {
    //   _unit = "BTC"
    //   amountsToDisplay = amountsToBTC
    //   amountsToDisplayRange = `${amountsToBTC_bottom} to ${amountsToBTC_top}`
    // }
    // else if(_denomination == "Bitcoin Lightning") {
    //   _unit = "SATs"
    //   amountsToDisplay = amountsToSAT
    //   amountsToDisplayRange = `${amountsToSAT_bottom} to ${amountsToSAT_top}`
    // }
    // else if(_denomination == "Bitcoin Liquid") {
    //   _unit = "SATs"
    //   amountsToDisplay = amountsToSAT
    //   amountsToDisplayRange = `${amountsToSAT_bottom} to ${amountsToSAT_top}`
    // }
    // else {}

    // let amounts_to_final_display = amountsToDisplay || amountsToDisplayRange



    // // console.log(amountsToRaw)

    // this.setState({
    //   amountsToMsg: `${amounts_to_final_display} ${_unit}`
    // })

  }


  async clickCreateOrder(e) {
    e.preventDefault()
    // console.log(e.target.parentNode)
    // console.log(document.getElementById("form_id").elements);
    // console.log(document.getElementById("form_id").elements[6].value)

    let _denomination, crypto_sel, _crypto

    crypto_sel = document.getElementById("form_id").elements["crypto"];
    _denomination = crypto_sel.options[crypto_sel.selectedIndex].text;

    let [url_param_order_type_to_save, price_s] = []


    console.log(this.props.match.params.type)

    this.props.match.params.type === "makebuy" ? [url_param_order_type_to_save, price_s] = ["buyorders", ["minprice", "maxprice"]] :
      this.props.match.params.type === "makesell" ? [url_param_order_type_to_save, price_s] = ["sellorders", ["price"]] :
        null



    let price_fields_obj = {}

    for (const field of price_s) {
      price_fields_obj[field] = document.getElementById("form_id").elements[field].value
    }

    console.log(price_fields_obj)

    console.log({
      title: document.getElementById("form_id").elements["title"].value,
      category: document.getElementById("form_id").elements["category"].value,
      ...price_fields_obj,
      crypto: document.getElementById("form_id").elements["crypto"].value,
      conversion: document.getElementById("form_id").elements["conversion"].value,
      conversion: document.getElementById("form_id").elements["conversion"].value,
      expirydate: document.getElementById("form_id").elements["expirydate"].value,
      expirytime: document.getElementById("form_id").elements["expirytime"].value,
      payment: document.getElementById("form_id").elements["payment"].value,
      chain: _denomination,
      // iterator: document.getElementById("form_id").elements[7].value,
    }, url_param_order_type_to_save)


    console.log(`/${url_param_order_type_to_save}/save`)
    // let response = await fetch(`/${url_param_order_type_to_save}/save`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     crypto: document.getElementById("form_id").elements["crypto"].value,
    //     ...amount_fields_obj,
    //     price: document.getElementById("form_id").elements["price"].value,
    //     expirydate: document.getElementById("form_id").elements["expirydate"].value,
    //     expirytime: document.getElementById("form_id").elements["expirytime"].value,
    //     payment: document.getElementById("form_id").elements["payment"].value,
    //   })
    // })

    // console.log("server response status:", response.status)

    // switch (response.status) {
    //   case 200:
    //     console.log(200)
    //     this.setState({
    //       popup_state: "You have successfully made an order"
    //     })
    //     break;
    //   case 400:
    //     console.log(400)
    //     this.setState({
    //       popup_state: "Expiry time and date field cannot be before present, please modify, and retry submission."
    //     })
    //     break;
    //   case 500:
    //     console.log(500)
    //     this.setState({
    //       popup_state: "An issue has occured, please try again later. A website maintainer is looking into the mater."
    //     })
    //     break;

    //   default:
    //     break;
    // }

    // let json_SRV = await response.json()
    // console.log("server response json:", json_SRV)


  }

  setOptions(_denomination) {
    let options
    let tag_options_arr_data = []

    if(_denomination == "Bitcoin Base Chain") {
      tag_options_arr_data = ["Wallet1", "Wallet2", "Wallet3", "Wallet4"]
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
      // options = <option value="BaseWallet">BaseWallet</option>
    }
    else if(_denomination == "Bitcoin Lightning") {
      tag_options_arr_data = ["Wallet5", "Wallet6", "Wallet7", "Wallet8"]
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else if(_denomination == "Bitcoin Liquid") {
      tag_options_arr_data = ["Wallet9", "Wallet10", "Wallet11", "Wallet12"]
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else {}

    // let selector = document.getElementById('payment-select')
    // console.log(document.getElementById('payment-select'));
    // selector.options[0].selected = true;

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
    let price_field

    let amountsToMsg = this.state.amountsToMsg


    console.log("----------->>>>", this.state.denomination)
    let options = this.setOptions(this.state.denomination)


    console.log(this.state.unit)

    let amountsTo_inBTC = Array.isArray(this.state.amountsTo_inBTC) ? `${this.state.amountsTo_inBTC[0]} - ${this.state.amountsTo_inBTC[1]} BTC` : `${this.state.amountsTo_inBTC} BTC`
    let amountsTo_inSAT = Array.isArray(this.state.amountsTo_inSAT) ? `${this.state.amountsTo_inSAT[0]} - ${this.state.amountsTo_inSAT[1]} SATs` : `${this.state.amountsTo_inSAT} SATs`

    if (this.props.match.params.type == "makebuy") {
      price_field =
        <React.Fragment>
          <label htmlFor="min-price-select">Min Price (CAD)</label>
          <input onChange={(e) => this.handleChange(e)} type="number" id="min-price-select" name="minprice" required defaultValue='500' />

          <label htmlFor="max-price-select">Max Price (CAD)</label>
          <input onChange={(e) => this.handleChange(e)} type="number" id="max-price-select" name="maxprice" required defaultValue='1000' />
        </React.Fragment>
    }

    if (this.props.match.params.type == "makesell") {
      price_field =
        <React.Fragment>
          <label htmlFor="price-select">Price in CAD</label>
          <input onChange={(e) => this.handleChange(e)} type="number" id="price-select" name="price" step="0.01" required defaultValue='135' /><br />
        </React.Fragment>
    }

    return (
      <div className="make-container">

        <form className="form" id="form_id">

          <h3>Making a {this.props.match.params.type} order...</h3><br />


          <label htmlFor="title-select">Title</label>
          <input type="text" id="title-select" defaultValue='SomeObject' name="title" required /><br />

          <label htmlFor="category-select">Category</label>
          <select name="category" id="category-select" required>
            <option value="Kitchen" defaultValue>Kitchen</option>
            <option value="Clothes">Clothes</option>
            <option value="Electronics">Electronics</option>
            <option value="Automobile">Automobile</option>
            <option value="Camping">Camping</option>
            <option value="Furniture">Furniture</option>
            <option value="Other">Other</option>
          </select><br />


          {price_field}



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

          {/* <input type="hidden" name="iterator" value={this.state.iterator}/> */}
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