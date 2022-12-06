import React from "react"

class PricesComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    // console.log(this.props)
  }



  setTDs(){
    let currencies, values
    currencies = Object.keys(this.props?.btc_gecko_prices)
    values = Object.values(this.props?.btc_gecko_prices)
    
    let tds_currencies = []
    for (let i = 0; i < currencies.length; i++) {
      const currency = currencies[i];
      tds_currencies.push(<td key={i}>{currency}</td>)
    }
    let tds_values = []
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      tds_values.push(<td key={i}>{value}</td>)
    }
    return [tds_currencies, tds_values]
  }




  render() {
    let tds_currencies, tds_values
    [tds_currencies, tds_values] = this.setTDs()


    return (
      <React.Fragment>
      <h1>Bitcoin Prices</h1>
      <table>
        <tbody>
          <tr>
            {tds_currencies}
          </tr>
          <tr>
            {tds_values}
          </tr>
        </tbody>
      </table>
      </React.Fragment>
    );
  }
}

export default PricesComponent
