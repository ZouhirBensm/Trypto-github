import './style/OrderNumbersInformation.css'


class OrderNumbersInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      unit: "BTC",
    }
    this.SATBTC = this.SATBTC.bind(this)
  }

  SATBTC(e){
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
    if(this.state.unit == 'BTC') { symbol = '₿' }
    if(this.state.unit == 'SAT') { symbol = 'S' }


    return (
      <React.Fragment>

        <div className='flex'>

          {/* ONE */}
          <div id='p1'>
            <div>{this.props.price} CA </div>
            <span style={{backgroundColor: 'green', padding: '3px 5px 9px 6px'}} className='round-symbol'>$</span> <br />

            <span>Rate </span>
            <div>{this.props.conversion} CA$/BTC</div>
          </div>


          {/* TWO */}
          <div id="p2">
            <span>{this.state.unit == "BTC" ? `${amountsToBTC} ` : this.state.unit == "SAT" ? `${amountsToSAT} ` : null}</span>


            <span style={{backgroundColor: '#80E8FF', padding: '3px 5px 9px 5px'}} className='round-symbol'>{symbol}</span>
            

            {/* in {this.state.unit == "BTC" ? "SAT" : this.state.unit == "SAT" ? "BTC" : null} */}
            <button onClick={(e) => { this.SATBTC(e) }}>
              <img src="/img/SVG/market/individual-article/arrow-switch.svg" alt="" />
            </button>

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