class MakeCurrencyOrderNumbers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      unit: "BTC",
      amountsTo_inBTC: undefined,
      amountsTo_inSAT: undefined,
    }

    this.getMarketBTCprice = this.getMarketBTCprice.bind(this)
    this.onChangeUpdateAmountsTo = this.onChangeUpdateAmountsTo.bind(this)
  }

  componentDidMount() {
    this.getMarketBTCprice()
  }

  async getMarketBTCprice(e = null) {
    e?.preventDefault()
    let bitcoin = "Bitcoin"
    let BTCcurrentMarketValue, response, data

    try {
      response = await fetch(`/cryptoprice`)
    } catch (error) {
      alert(`Their seems to be an error. Enter Price manually. ${error}`)
    }

    if (response.ok) {
      data = await response.json()
      BTCcurrentMarketValue = data.data[bitcoin.toLowerCase()]?.cad
      document.getElementById('price-select').value = BTCcurrentMarketValue
    } else {
      console.error(`Error on the clickGetCryptoPrice() function response.status: ${response.status}`)
    }
    this.onChangeUpdateAmountsTo()
    return
  }




  async onChangeUpdateAmountsTo() {
    const _priceRate = document.getElementById("form_id").elements["price"].value

    if (caseOptionBTClayerexchange == "makebuy") {

      let _amount, amountsToBTC, amountsToSAT, amountsToRaw

      _amount = document.getElementById("form_id").elements["amount"].value
      amountsToRaw = _amount / _priceRate
      amountsToBTC = amountsToRaw.toFixed(9)
      amountsToSAT = Math.trunc(amountsToRaw * 1000000000)

      this.setState({
        amountsTo_inBTC: amountsToBTC,
        amountsTo_inSAT: amountsToSAT,
      })
    }

    if (caseOptionBTClayerexchange == "makesell") {
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
      })
    }

  }

  setAmountInput() {
    let amount_field
    let amountsTo_inBTC_msg, amountsTo_inSAT_msg

    if (caseOptionBTClayerexchange == "makebuy") {
      console.log("makebuy")
      amount_field =
        <React.Fragment>
          <label htmlFor="amount-select">Amount (CAD)</label>
          <input type="number" id="amount-select" name="amount" required defaultValue='100' onChange={(e) => this.onChangeUpdateAmountsTo(e)} /> <br />
        </React.Fragment>

      amountsTo_inBTC_msg = `Amounts to: ${this.state.amountsTo_inBTC} BTC`
      amountsTo_inSAT_msg = `Amounts to: ${this.state.amountsTo_inSAT} SATs`
    }

    if (caseOptionBTClayerexchange == "makesell") {

      amount_field =
        <React.Fragment>
          <label htmlFor="min-amount-select">Min Amount (CAD)</label>
          <input type="number" id="min-amount-select" name="minamount" required defaultValue='500' onChange={(e) => this.onChangeUpdateAmountsTo(e)} /> <br />

          <label htmlFor="max-amount-select">Max Amount (CAD)</label>
          <input type="number" id="max-amount-select" name="maxamount" required defaultValue='1000' onChange={(e) => this.onChangeUpdateAmountsTo(e)} /> <br />
        </React.Fragment>

      amountsTo_inBTC_msg = `Amounts between: ${this.state.amountsTo_inBTC} BTC`
      amountsTo_inSAT_msg = `Amounts between: ${this.state.amountsTo_inSAT} SATs`
    }

    return [amount_field, amountsTo_inBTC_msg, amountsTo_inSAT_msg]
  }


  render() {

    let [AmountInput, amountsTo_inBTC_msg, amountsTo_inSAT_msg] = this.setAmountInput()

    return (
      <React.Fragment>

        {AmountInput}
        <label htmlFor="price-select">Price/Unit</label>
        <input type="number" id="price-select" name="price" step="0.01" required defaultValue='50000' onChange={(e) => this.onChangeUpdateAmountsTo(e)} />
        <button onClick={(e) => {
          this.getMarketBTCprice(e)
        }}>Market</button><br />


        <span>{this.state.unit == "BTC" ? amountsTo_inBTC_msg : this.state.unit == "SAT" ? amountsTo_inSAT_msg : null}</span>
        <button onClick={(e) => { this.viceVersaBTCSAT(e) }}>in {this.state.unit == "BTC" ? "SAT" : this.state.unit == "SAT" ? "BTC" : null}</button><br />

      </React.Fragment>
    )
  }

  viceVersaBTCSAT(e) {
    e.preventDefault()
    this.setState({
      unit: this.state.unit == "BTC" ? "SAT" : this.state.unit == "SAT" ? "BTC" : null
    })
  }

}

export default MakeCurrencyOrderNumbers