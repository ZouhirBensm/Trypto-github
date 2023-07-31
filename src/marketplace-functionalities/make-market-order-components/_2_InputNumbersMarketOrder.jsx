import BITCOIN_CHAINS_WALLETS from '../../../full-stack-libs/Types/BitcoinChainsWallets'
import { validateInputs, validateEmpty, validateRegEx } from '../../../full-stack-libs/validations'
import '../style/_2_InputNumbersMarketOrder.css'



class _2_InputNumbersMarketOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      amountsTo_inBTC: undefined,
      amountsTo_inSAT: undefined,
      unit: "BTC",
    }
    this.amountsToCalculatorChange = this.amountsToCalculatorChange.bind(this)
    
    
    this.selectCategory = React.createRef();
    this.inputPrice = React.createRef();
    this.inputConversion = React.createRef();
    this.selectPayment = React.createRef();
  }

  async validation() {
    
    let _2_InputNumbersMarketOrder_data = {
      price: this.inputPrice.current.value,
      conversion: this.inputConversion.current.value,
      chain: this.selectCategory.current.value,
      payment: this.selectPayment.current.value
    }

    console.log(_2_InputNumbersMarketOrder_data)

    let error_msg_retrieved_if_any

    // validateEmpty
    // validateRegEx
    error_msg_retrieved_if_any = validateInputs(_2_InputNumbersMarketOrder_data)

    console.log("error======>>>>>>> ", error_msg_retrieved_if_any)

    if (error_msg_retrieved_if_any) {
      this.props.setpopup(error_msg_retrieved_if_any)
      return false
    } else { return true }

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

    const CADPrice = (this.props.price * 1.34).toFixed(2)

    return (
      <React.Fragment>

        <div className="make-container">

          <form className="form" id="form_id">

            <label className='picker-label' htmlFor="chain-input">Chain Network</label>

            <select ref={this.selectCategory} className='picker' onChange={(e) => {
              this.props.handleChange("chain", e);
            }} name="chain" id="chain-input" required value={this.props.chain}>

              <option value="">No Selection</option>
              <option value={BITCOIN_CHAINS_WALLETS.BITCOIN_BASE_CHAIN.name}>{BITCOIN_CHAINS_WALLETS.BITCOIN_BASE_CHAIN.name}</option>
              <option value={BITCOIN_CHAINS_WALLETS.BITCOIN_LIGHNING.name}>{BITCOIN_CHAINS_WALLETS.BITCOIN_LIGHNING.name}</option>
              <option value={BITCOIN_CHAINS_WALLETS.BITCOIN_LIQUID.name}>{BITCOIN_CHAINS_WALLETS.BITCOIN_LIQUID.name}</option>

            </select>


            <label htmlFor="price-input">Price in USD</label>
            <input ref={this.inputPrice} onChange={(e) => {
              this.props.handleChange("price", e);
              this.amountsToCalculatorChange(e);
            }} type="number" id="price-input" name="price" step="0.01" required value={this.props.price || ''} placeholder='USD' />

            <label>Price in CAD</label>
            <div className='display'>
              <span>{isNaN(CADPrice) ? '' : CADPrice } CAD </span>
            </div>


            <label htmlFor="onBTCvaluation-input">Based on what BTC value</label>
            <input ref={this.inputConversion} onChange={(e) => {
              this.props.handleChange("onBTCvaluation", e);
              this.amountsToCalculatorChange(e);
            }} type="number" id="onBTCvaluation-input" name="conversion" step="0.01" required value={this.props.onBTCvaluation} />


            <button onClick={(e) => { this.props.clickGetCryptoPrice(e) }}>Market</button>


            <label>Amounts to:</label>
            <div id='amounts-to' className='display'>
              <span>{this.state.unit == "BTC" ? `${this.state.amountsTo_inBTC} BTC` : this.state.unit == "SAT" ? `${this.state.amountsTo_inSAT} SAT` : null}</span>

              {/* <button onClick={(e) => { this.toogleUnits(e) }}>in {this.state.unit == "BTC" ? "SAT" : this.state.unit == "SAT" ? "BTC" : null}</button> */}

              <button onClick={(e) => { this.toogleUnits(e) }}>
                <span style={this.state.unit == "BTC" ? { fontWeight: 700, color: '#010757' } : null}>btc </span>
                |
                <span style={this.state.unit == "SAT" ? { fontWeight: 700, color: '#010757' } : null}> sat</span>

                {/* {this.state.unit == "BTC" ? "SAT" : this.state.unit == "SAT" ? "BTC" : null} */}
              </button>
            </div>



            <label className='picker-label' htmlFor="payment-input">Payment on</label>
            <select ref={this.selectPayment} className='picker' name="payment" id="payment-input" onChange={(e) => {
              // this.change(); 
              this.props.handleChange("payment", e);
            }} value={this.props.payment} >

              <option value="">No Selection</option>
              {options}
            </select>


          </form>
        </div>



        <div id='proceed'>
          <img src="/img/SVG/sub/previous.svg" alt=""></img>
          <button onClick={(e) => {
            this.props.previousStep(e)
          }}>Previous</button>

          <button onClick={async (e) => {
            let ret_validation = await this.validation()

            if (ret_validation) {
              return this.props.nextStep(e)
            } else {
              return
            }
          }}>Proceed</button>
          <img src="/img/SVG/sub/proceed.svg" alt=""></img>
        </div>

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

    if (_chain == BITCOIN_CHAINS_WALLETS.BITCOIN_BASE_CHAIN.name) {
      tag_options_arr_data = BITCOIN_CHAINS_WALLETS.BITCOIN_BASE_CHAIN.wallets
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else if (_chain == BITCOIN_CHAINS_WALLETS.BITCOIN_LIGHNING.name) {
      tag_options_arr_data = BITCOIN_CHAINS_WALLETS.BITCOIN_LIGHNING.wallets
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else if (_chain == BITCOIN_CHAINS_WALLETS.BITCOIN_LIQUID.name) {
      tag_options_arr_data = BITCOIN_CHAINS_WALLETS.BITCOIN_LIQUID.wallets
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