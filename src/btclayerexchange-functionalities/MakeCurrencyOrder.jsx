// import React from 'react';
import '../style/MakeCurrencyOrder.css'
import utils from '../../full-stack-libs/utils'
import {validateInputs, validateExpiry} from '../../full-stack-libs/validations'


class MakeCurrencyOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popup_state: null,
      unit: "BTC",
      amountsTo_inBTC: undefined,
      amountsTo_inSAT: undefined,
      chain: undefined,
    }
    this.clickGetCryptoPrice = this.clickGetCryptoPrice.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.clickCreateOrder = this.clickCreateOrder.bind(this)

    console.log("this.props.match.params.type------>>>>>", this.props.match.params.type, caseOptionBTClayerexchange, paths_URL, URL_)
  }

  componentDidMount() {
    //DOM is ready
    this.clickGetCryptoPrice()
  }

  displayErrorpopup(error=undefined){
    if(!error) return undefined
    console.log("in display pop up", error)

    this.setState({
      popup_state: error
    }, ()=>{
      console.log("scroll down")
      let container = document.getElementsByClassName("make-container")[0]
      console.log('container', container)
      container.scrollTo(0, container.scrollHeight);
    })

  }


  async clickCreateOrder(e){
    e.preventDefault()

    console.log("create order...")




    let [url_param_order_type_to_save, amount_s] = []

    caseOptionBTClayerexchange === "makebuy"? [url_param_order_type_to_save, amount_s] = ["buyorders", ["amount"]]:
    caseOptionBTClayerexchange === "makesell"? [url_param_order_type_to_save, amount_s] = ["sellorders", ["minamount", "maxamount"]]:
    null

    let amount_fields_obj = {}

    for (const field of amount_s) {
      // console.log("field", field)
      amount_fields_obj[field] = document.getElementById("form_id").elements[field].value
    }

    console.log(amount_fields_obj)

    let btc_orderinfo = {
      chain: document.getElementById("form_id").elements["chain"].value,
      ...amount_fields_obj,
      rate: document.getElementById("form_id").elements["price"].value,
      expirydate: document.getElementById("form_id").elements["expirydate"].value,
      expirytime: document.getElementById("form_id").elements["expirytime"].value,
      payment: document.getElementById("form_id").elements["payment"].value,
      // iterator: document.getElementById("form_id").elements[7].value,
    }



    console.log(btc_orderinfo, url_param_order_type_to_save)


    let error = validateInputs(btc_orderinfo) || validateExpiry(btc_orderinfo)

    console.log("error======>>>>>>>", error)
    // console.log("error1  ", error)

    error = parseInt(btc_orderinfo.minamount)>parseInt(btc_orderinfo.maxamount) && !error ? "Min Amount Cannot be superior than Max Amount, please edit, and resubmit.": error

    // console.log("error2  ", error)

    if(error) return this.displayErrorpopup(error)

    // console.log("do the fetch")



    let response = await fetch(`/${url_param_order_type_to_save}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(btc_orderinfo)
    })

    console.log("server response status:", response.status)

    switch (response.status) {
      case 200:
        console.log(200)
        this.setState({
          popup_state: "You have successfully made an order"
        })
        break;
      // case 400:
      //   console.log(400)
      //   this.setState({
      //     popup_state: "Expiry time and date field cannot be before present, please modify, and retry submission."
      //   })
      //   break;
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





  async clickGetCryptoPrice(e = null) {
    e?.preventDefault()
    console.log("Getting crypto price")

    // let crypto = document.getElementById('crypto-select').value
    let crypto = "Bitcoin"
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
      // console.log("data", data)
      // console.log(crypto.toLowerCase())
      value = data.data[crypto.toLowerCase()]?.cad
      // console.log("value", value)
      document.getElementById('price-select').value = value
    } else {
      console.error(`Error on the clickGetCryptoPrice() function response.status: ${response.status}`)
    }



    // let crypto = document.getElementById('crypto-select').value
    // // let amount = document.getElementById('amount-select').value
    // let value
    // //console.log(crypto, amount)

    // fetch(`/cryptoprice`)

    // .then(res => res.json())
    // .then(data => {
    //   value = data.data[crypto.toLowerCase()].cad
    //   //console.log(value)
    //   document.getElementById('price-select').value = value
    // })
    // .catch(e => alert(`Their seems to be an error. Enter Price manually. ${e}`))

    this.handleChange()

  }


  async handleChange() {
    console.log("changing....")


    
    let _priceRate, _crypto, crypto_sel, _chain
    
  
    _chain = document.getElementById('chain-select').value
    crypto_sel = "Bitcoin";
    _crypto = "Bitcoin";
    _priceRate = document.getElementById("form_id").elements["price"].value
    
    if(caseOptionBTClayerexchange == "makebuy"){

      let _amount, amountsToBTC, amountsToSAT, amountsToRaw


      _amount = document.getElementById("form_id").elements["amount"].value
      amountsToRaw = _amount / _priceRate
      amountsToBTC = amountsToRaw.toFixed(9)
      amountsToSAT = Math.trunc(amountsToRaw * 1000000000)
      this.setState({
        amountsTo_inBTC: amountsToBTC,
        amountsTo_inSAT: amountsToSAT,
        chain: _chain,
      })
    }

    if(caseOptionBTClayerexchange == "makesell"){
      let _minamount, _maxamount, minamountsToRaw, maxamountsToRaw, minamountsToBTC, maxamountsToBTC, minamountsToSAT, maxamountsToSAT

      _minamount = document.getElementById("form_id").elements["minamount"].value
      _maxamount = document.getElementById("form_id").elements["maxamount"].value

      minamountsToRaw = _minamount / _priceRate
      maxamountsToRaw = _maxamount / _priceRate

      minamountsToBTC = minamountsToRaw.toFixed(9)
      maxamountsToBTC = maxamountsToRaw.toFixed(9)

      minamountsToSAT = Math.trunc(minamountsToRaw * 1000000000)
      maxamountsToSAT = Math.trunc(maxamountsToRaw * 1000000000)

      this.setState({
        amountsTo_inBTC: `${minamountsToBTC} to ${maxamountsToBTC}`,
        amountsTo_inSAT: `${minamountsToSAT} to ${maxamountsToSAT}`,
        chain: _chain,
      })
    }



    
    // console.log({_priceRate, _amount, _chain, crypto_sel, _crypto})


    



  }



  render() {

    let amount_field
    let amountsTo_inBTC_msg, amountsTo_inSAT_msg

    if (caseOptionBTClayerexchange == "makebuy") {
      amount_field =
        <React.Fragment>
          <label htmlFor="amount-select">Amount (CAD)</label>
          <input onChange={(e) => this.handleChange(e)} type="number" id="amount-select" name="amount" required defaultValue='100' />
        </React.Fragment>

      // this.state.amountsTo_inBTC == XXX
      amountsTo_inBTC_msg = `Amounts to: ${this.state.amountsTo_inBTC} BTC`
      amountsTo_inSAT_msg = `Amounts to: ${this.state.amountsTo_inSAT} SATs`
    }

    if (caseOptionBTClayerexchange == "makesell") {
      amount_field =
        <React.Fragment>
          <label htmlFor="min-amount-select">Min Amount (CAD)</label>
          <input onChange={(e) => this.handleChange(e)} type="number" id="min-amount-select" name="minamount" required defaultValue='500' /> <br />

          <label htmlFor="max-amount-select">Max Amount (CAD)</label>
          <input onChange={(e) => this.handleChange(e)} type="number" id="max-amount-select" name="maxamount" required defaultValue='1000' /> <br />
        </React.Fragment>

      // this.state.amountsTo_inBTC == XXX and XXX
      amountsTo_inBTC_msg = `Amounts between: ${this.state.amountsTo_inBTC} BTC`
      amountsTo_inSAT_msg = `Amounts between: ${this.state.amountsTo_inSAT} SATs`
    }





    console.log(this.state)


    //_________________________________________________________________

    return (
      <div className="make-container">

        <form className="form" id="form_id">

          <h3>Making a {caseOptionBTClayerexchange} order...</h3>


          {/* <label htmlFor="crypto-select">Crypto</label>
          <select name="crypto" id="crypto-select" required>
              <option value="Bitcoin" defaultValue>Bitcoin</option>
          </select>  */}


          <label htmlFor="chain-select">BTC Type/Chain</label>
          <select name="chain" id="chain-select" required>
            <option value="Bitcoin Base Chain" defaultValue>Bitcoin Base Chain</option>
            <option value="Bitcoin Lightning">Bitcoin Lightning</option>
            <option value="Bitcoin Liquid">Bitcoin Liquid</option>
          </select><br />


          {amount_field}<br />


          <label htmlFor="price-select">Price/Unit</label>
          <input onChange={(e) => this.handleChange(e)} type="number" id="price-select" name="price" step="0.01" required defaultValue='50000' />
          <button onClick={this.clickGetCryptoPrice}>Market</button><br />

          <label htmlFor="expirydate-select">Order Expiry Date</label>
          <input id="expirydate-select" type="date" name="expirydate" required defaultValue='2022-12-25' /><br />

          <label htmlFor="expirytime-select">Order Expiry Time</label>
          <input id="expirytime-select" type="time" name="expirytime" required defaultValue='08:00' /><br />

          <label htmlFor="payment-select">Payment</label>
          <select name="payment" id="payment-select" required>
            <option value="Paypal" defaultValue>Paypal</option>
            <option value="Interac">Interac</option>
            <option value="Cash">Cash</option>
          </select> <br />


          <span>{this.state.unit == "BTC" ? amountsTo_inBTC_msg : this.state.unit == "SAT" ? amountsTo_inSAT_msg : null}</span><br />

          <button onClick={(e) => { this.toogleUnits(e) }}>in {this.state.unit == "BTC" ? "SAT" : this.state.unit == "SAT" ? "BTC" : null}</button><br />

          {/* <input type="hidden" name="iterator" value={this.state.iterator}/> */}
          <button type="submit" onClick={(e) => this.clickCreateOrder(e)}>Submit</button>
        </form><br />





        {this.state.popup_state ?
          <p>{this.state.popup_state}</p>
          : null}



      </div>

    );
  }
  //_________________________________________________________________




  toogleUnits(e) {
    e.preventDefault()

    console.log("toogle...")

    this.setState({
      unit: this.state.unit == "BTC" ? "SAT" : this.state.unit == "SAT" ? "BTC" : null
    })

  }

}

export default MakeCurrencyOrder