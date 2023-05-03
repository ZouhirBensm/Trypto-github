import { validateInputs } from '../../../full-stack-libs/validations'
import './style/EditOrderNumbersInformation.css'


class EditOrderNumbersInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      amountsToBTC: undefined,
      amountsToSAT: undefined,
      unit: "BTC",
      popup: undefined
    }
    this.SATBTC = this.SATBTC.bind(this)
    this.amountsToCalculatorChange = this.amountsToCalculatorChange.bind(this)
    this.setpopup = this.setpopup.bind(this)
  }


  setpopup(error_message) {
    console.log(`Setting popup: ${error_message}`)
    this.setState({
      popup: error_message
    })
  }

  EditValidation(EditBaseOrderInformation_data) {
    let error_msg_retrieved_if_any

    if (parseInt(EditBaseOrderInformation_data.price) === this.props.price && EditBaseOrderInformation_data.conversion === this.props.conversion) {
      error_msg_retrieved_if_any = `Nothing has changed, therefor nothing to update!`
      this.setpopup(error_msg_retrieved_if_any)
      return false
    }

    error_msg_retrieved_if_any = validateInputs(EditBaseOrderInformation_data)

    if (error_msg_retrieved_if_any) {
      this.setpopup(error_msg_retrieved_if_any)
      return false
    } else {
      this.setpopup(undefined)
      return true
    }
  }


  async EditFunction2(EditBaseOrderInformation_data) {
    console.log("Making api call to edit this component!")


    const response = await fetch(`/marketplace/${userId}/update23`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        EditBaseOrderInformation_data
      })
    })

    const json = await response.json()

    console.log(response)
    console.log(json)

    if (response.status === 200) {
      this.props.handleToogleEdit(undefined)
      this.props.loadData()
      return
    } else {
      const message = `Server Error | Please, try again later!`
      this.setpopup(json?.error?.message || message)
      return
    }

  }



  SATBTC(e) {
    e.preventDefault()
    this.setState({
      unit: this.state.unit == "BTC" ? "SAT" : this.state.unit == "SAT" ? "BTC" : null
    })
  }

  componentDidMount() {
    this.amountsToCalculatorChange()
  }

  // shouldComponentUpdate(prevProp, prevState) {
  //   if (prevState.price !== this.state.price ||
  //     prevState.conversion !== this.state.conversion) {
  //     return true
  //   }
  //   return false
  // }


  render() {


    let symbol
    if (this.state.unit == 'BTC') { symbol = '₿' }
    if (this.state.unit == 'SAT') { symbol = 'S' }


    return (
      <React.Fragment>

        <form className="form flex" id="form_id">

          {/* ONE */}


          <div id='p1'>
            {/* <label htmlFor="price-input">Price</label> */}
            <input onChange={(e) => {
              this.amountsToCalculatorChange(e);
            }} type="number" id="price-input" name="price" step="0.01" defaultValue={this.props.price} />
            <span>CA</span><span className='round-symbol green special-padding-1'>$</span><br />



            <label htmlFor="conversion-input">Rate: </label>
            <button className='margin-right' onClick={(e) => { this.clickGetBTCPrice(e) }}>
              <img src="/img/SVG/market/individual-article/graph.svg" alt="" />
            </button>


            <input onChange={(e) => {
              this.amountsToCalculatorChange(e);
            }} type="number" id="conversion-input" name="conversion" step="0.01" defaultValue={this.props.conversion} />
            <span>CA$/BTC</span>

          </div>



          {/* TWO */}
          <div id="p2">
            <span>{this.state.unit == "BTC" ? `${this.state.amountsToBTC} ` : this.state.unit == "SAT" ? `${this.state.amountsToSAT} ` : null}</span>

            <span className='round-symbol blue special-padding-1'>{symbol}</span>

            {/* in {this.state.unit == "BTC" ? "SAT" : this.state.unit == "SAT" ? "BTC" : null} */}
            <button className='margin-left' onClick={(e) => { this.SATBTC(e) }}>
              <img src="/img/SVG/market/individual-article/arrow-switch.svg" alt="" />
            </button>

          </div>







          {/* THREE */}
          <div id="p3">

            {this.state.popup ?
              <span className='popup'>{this.state.popup}</span>
              : null}



            <button onClick={(e) => {
              this.props.handleToogleEdit(undefined)
            }}>
              <img src="/img/SVG/market/individual-article/revert2.svg" alt="" />
            </button>





            <button className='save-part margin-left' onClick={async (e) => {

              e.preventDefault()
              let EditBaseOrderInformation_data = {
                orderID: this.props.orderID,
                price: document.getElementById("form_id").elements["price"].value,
                conversion: document.getElementById("form_id").elements["conversion"].value
              }

              let ret_EditValidation = this.EditValidation(EditBaseOrderInformation_data)
              if (ret_EditValidation) {
                let ret_EditFunction2 = await this.EditFunction2(EditBaseOrderInformation_data)
                return
              } else {
                return
              }
            }}>Save</button>


          </div>





        </form><br />




      </React.Fragment>
    )
  }


  async clickGetBTCPrice(e = null) {
    e?.preventDefault()

    let actual_BTC_value, response, json

    response = await fetch(`/cryptoprice`)

    let conversionInput = document.getElementById("conversion-input")

    if (response.ok) {
      json = await response.json()
      actual_BTC_value = json.data["bitcoin"]?.cad

      console.log(actual_BTC_value)
      conversionInput.value = actual_BTC_value
      return

    } else {
      const message = `Unable to retrieve BTC market value. Enter manually!`
      this.setpopup(message)
      return
    }
  }


  async amountsToCalculatorChange(e = null) {
    e?.preventDefault()


    let realtime_price, realtime_conversion


    realtime_price = document.getElementById("price-input").value
    realtime_conversion = document.getElementById("conversion-input").value



    if (e?.target.id == "price-input") {
      realtime_price = e.target.value
    }
    if (e?.target.id == "conversion-input") {
      realtime_conversion = e.target.value
    }

    console.log(realtime_price, realtime_conversion)
    let amountsToRaw, amountsToBTC, amountsToSAT
    amountsToRaw = realtime_price / realtime_conversion
    amountsToBTC = amountsToRaw.toFixed(9)
    amountsToSAT = Math.trunc(amountsToRaw * 1000000000)

    if (isNaN(amountsToRaw) || amountsToRaw == Infinity) {
      amountsToBTC = ''
      amountsToSAT = ''
    }

    this.setState({
      amountsToBTC: amountsToBTC,
      amountsToSAT: amountsToSAT,
    })
  }

}

export default EditOrderNumbersInformation