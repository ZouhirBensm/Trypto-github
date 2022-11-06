
import '../style/reactDivMobile.css'



class _2_InputNumbersMarketOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      amountsTo_inBTC: undefined,
      amountsTo_inSAT: undefined,
      unit: "BTC",
    }
    this.amountsToCalculatorChange = this.amountsToCalculatorChange.bind(this)
  }

  componentDidMount() {
    this.amountsToCalculatorChange()
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.price !== this.props.price ||
      prevProp.onBTCvaluation !== this.props.onBTCvaluation) {
        this.amountsToCalculatorChange()
    }
  }



  // ____________________________________________________

  render() {
    let options = this.setOptions(this.props.chain)

    return (
      <React.Fragment>
        <div>InputNumbersMarketOrder...</div>

        <div className="make-container">

          <form className="form" id="form_id">

            <label htmlFor="chain-input">Chain Network</label>

            <select onChange={(e) => {
              this.props.handleChange("chain", e);
            }} name="chain" id="chain-input" required value={this.props.chain}>

              <option value="">No Selection</option>
              <option value="Bitcoin Base Chain">Bitcoin Base Chain</option>
              <option value="Bitcoin Lightning">Bitcoin Lightning</option>
              <option value="Bitcoin Liquid">Bitcoin Liquid</option>

            </select> <br />


            <label htmlFor="price-input">Price in CAD</label>
            <input onChange={(e) => {
              this.props.handleChange("price", e);
              this.amountsToCalculatorChange(e);
            }} type="number" id="price-input" name="price" step="0.01" required value={this.props.price || ''}/><br />


            <label htmlFor="onBTCvaluation-input">Based on what BTC value</label>
            <input onChange={(e) => {
              this.props.handleChange("onBTCvaluation", e);
              this.amountsToCalculatorChange(e);
            }} type="number" id="onBTCvaluation-input" name="conversion" step="0.01" required value={this.props.onBTCvaluation}/>
            <button onClick={(e) => { this.props.clickGetCryptoPrice(e) }}>Market</button><br />


            <span>Amounts to: {this.state.unit == "BTC" ? `${this.state.amountsTo_inBTC} BTC` : this.state.unit == "SAT" ? `${this.state.amountsTo_inSAT} SAT` : null}</span><br />

            <button onClick={(e) => { this.toogleUnits(e) }}>in {this.state.unit == "BTC" ? "SAT" : this.state.unit == "SAT" ? "BTC" : null}</button><br />



            <label htmlFor="payment-input">Payment on</label>
            <select name="payment" id="payment-input" onChange={(e) => {
              // this.change(); 
              this.props.handleChange("payment", e);
            }} required value={this.props.payment} >

              <option value="">No Selection</option>
              {options}
            </select> <br />


          </form><br />
        </div>

        <button onClick={(e) => {
          this.props.previousStep(e)
        }}>Previous</button>
        <button onClick={(e) => {
          this.props.nextStep(e)
        }}>Next</button>
      </React.Fragment>
    )
  }
  // ____________________________________________________


  async amountsToCalculatorChange() {
    let _price, _onBTCvaluation, amountsToBTC, amountsToSAT, amountsToRaw

    _onBTCvaluation = this.props.onBTCvaluation
    _price = this.props.price

    amountsToRaw = _price / _onBTCvaluation
    amountsToBTC = amountsToRaw.toFixed(9)
    amountsToSAT = Math.trunc(amountsToRaw * 1000000000)

    if (isNaN(amountsToRaw) || amountsToRaw == Infinity) {
      amountsToBTC = ''
      amountsToSAT = ''
    }

    this.setState({
      amountsTo_inBTC: amountsToBTC,
      amountsTo_inSAT: amountsToSAT,
    })
  }


  setOptions(_chain) {
    let options
    let tag_options_arr_data = []

    if (_chain == "Bitcoin Base Chain") {
      tag_options_arr_data = ["Wallet1", "Wallet2", "Wallet3", "Wallet4"]
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else if (_chain == "Bitcoin Lightning") {
      tag_options_arr_data = ["Wallet5", "Wallet6", "Wallet7", "Wallet8"]
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else if (_chain == "Bitcoin Liquid") {
      tag_options_arr_data = ["Wallet9", "Wallet10", "Wallet11", "Wallet12"]
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else { }

    return options
  }




  toogleUnits(e) {
    e.preventDefault()
    // console.log("toogle...")

    this.setState({
      unit: this.state.unit == "BTC" ? "SAT" : this.state.unit == "SAT" ? "BTC" : null
    })
  }


}

export default _2_InputNumbersMarketOrder