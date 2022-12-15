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


    return (
      <React.Fragment>
        <div>OrderNumbersInformation...</div>
        <div>Price: {this.props.price}</div>
        <div>Conversion: {this.props.conversion}</div>
        
        <span>Amounts to: {this.state.unit == "BTC" ? `${amountsToBTC} ` : this.state.unit == "SAT" ? `${amountsToSAT} ` : null} {this.state.unit}</span><br />

        <button onClick={(e) => { this.SATBTC(e) }}>in {this.state.unit == "BTC" ? "SAT" : this.state.unit == "SAT" ? "BTC" : null}</button><br />
        

        {this.props.isSuperUser ?
          <button onClick={(e) => {
            this.props.handleToogleEdit("OrderNumbersInformation")
          }}>Edit</button>
          :
          null
        }


      </React.Fragment>
    )
  }
}

export default OrderNumbersInformation