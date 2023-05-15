import HomeBannerCard from './HomeBannerCard'
import './styles/PricesComponent.css'


// !!!! TODO rename this Component, because holds more than prices

class PricesComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    // this.popup = popup
    // console.log(this.props)
  }



  setTDs() {
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
        <div id='header'>

          <img src="/img/SVG/home/rbitcoin-inner2.svg" alt="" />

          <div id="home-header-text">
            <h1>Buy, Sell, Trade</h1>
            <h2>In Bitcoin and Sats</h2>
            <div>Welcome to Bidblock, we are currently building the most ethical market that integrates a system to facilite bitcoin transactions on upcomming bitcoin technologies.</div>
          </div>


          <br />
          <br />
          <br />

          <div id="home-header-cards">
            <HomeBannerCard
              icon_path='/img/SVG/home/home-cards/downwallet.svg'
              text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, quas. A odit officia quia perferendis?'
            />
            <HomeBannerCard
              icon_path='/img/SVG/home/home-cards/credit-card.svg'
              text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, quas. A odit officia quia perferendis?'
            />
            <HomeBannerCard
              icon_path='/img/SVG/home/home-cards/wallet.svg'
              text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, quas. A odit officia quia perferendis?'
            />

          </div>



          <div id="home-header-prices">
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

          </div>





        </div>



      </React.Fragment>
    );
  }
}

export default PricesComponent
