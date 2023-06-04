import './style/OrderNumbersInformation.css'


class OrderNumbersInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      unit: "BTC",
    }
    this.SATBTC = this.SATBTC.bind(this)
  }

  SATBTC(e) {
    e.preventDefault()
    this.setState({
      unit: this.state.unit == "BTC" ? "SAT" : this.state.unit == "SAT" ? "BTC" : null
    })
  }

  render() {
    let amountsToRaw, amountsToBTC, amountsToSAT

    amountsToRaw = this.props.price / this.props.conversion
    amountsToBTC = amountsToRaw.toFixed(9)
    amountsToSAT = Math.trunc(amountsToRaw * 1000000000)


    let symbol
    if (this.state.unit == 'BTC') {
      symbol = <img src="/img/SVG/market/individual-article/bitcoin.svg" alt="" />
    }
    if (this.state.unit == 'SAT') { symbol = 'Sats' }


    return (
      <React.Fragment>

        <div className='flex'>

          {/* ONE */}
          <div id='p1'>
            <span>{this.props.price} </span>
            <img src="/img/SVG/market/individual-article/dollar.svg" alt="" />
            <br />
            <span>Rate: </span>
            <span>{this.props.conversion} $/BTC</span>

          </div>


          {/* TWO */}
          <div id="p2">
            <div>

              <span>{this.state.unit == "BTC" ? `${amountsToBTC} ` : this.state.unit == "SAT" ? `${amountsToSAT} ` : null}</span>


              <span>{symbol}</span>


              {/* in {this.state.unit == "BTC" ? "SAT" : this.state.unit == "SAT" ? "BTC" : null} */}
              <button className='margin-left' onClick={(e) => { this.SATBTC(e) }}>
                <img src="/img/SVG/market/individual-article/arrow-switch.svg" alt="" />
              </button>

            </div>


            <div>
              <span> {(this.props.price * 1.34).toFixed(2)} </span>
              <img src="/img/SVG/market/individual-article/maple.svg" alt="" />
              <span> Dollar's</span>
              {/* <img src="/img/SVG/market/individual-article/dollar2.svg" alt="" /> */}

            </div>

          </div>



          {/* THREE */}


          {this.props.isSuperUser ?
            <React.Fragment>
              <div id="p3">
                <button onClick={(e) => {
                  this.props.handleToogleEdit("OrderNumbersInformation")
                }}>
                  <img src="/img/SVG/market/individual-article/edit.svg" alt="" />
                </button>
              </div>
            </React.Fragment>
            :
            null
          }


        </div>

      </React.Fragment>
    )
  }
}

export default OrderNumbersInformation