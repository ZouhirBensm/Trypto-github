import CURRENCY_CODES from '../../full-stack-libs/Types/CurrencyCodes'

import HomeBannerCard from './HomeBannerCard'
import './styles/HomeBanner.css'


// TODO !!! rename this Component, because holds more than prices

class HomeBanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    // this.scrollChildManagerInstance = new ScrollChildManager();
    // this.popup = popup
    // console.log(this.props)
  }

  componentDidMount() {


    // let reactDiv = document.getElementById('react-div')
    // let header = document.getElementById('header')


    // reactDiv.insertBefore(header, reactDiv.firstChild);
  }





  setPriceElements() {

    // console.log(CURRENCY_CODES)
    const homeHeaderPrices = document.getElementById('scroll-bar')


    let i = 3


    do {
      for (const country_code in this.props?.btc_gecko_prices) {


        if (Object.hasOwnProperty.call(this.props?.btc_gecko_prices, country_code)) {

          const price = this.props?.btc_gecko_prices[country_code];

          const priceElement = document.createElement('div');
          priceElement.classList.add("price-element");

          const span1 = document.createElement('span');
          const country_name = CURRENCY_CODES[country_code].name
          const currency_symbol = CURRENCY_CODES[country_code].symbol
          const flagImg = document.createElement('img');
          flagImg.src = `/img/SVG/home/${country_name}.svg`;

          priceElement.appendChild(flagImg);
          span1.innerHTML = country_name;
          priceElement.appendChild(span1);
          const span2 = document.createElement('span');
          span2.innerHTML = `${price.toLocaleString()} ${currency_symbol}`;
          priceElement.appendChild(span2);
          homeHeaderPrices.appendChild(priceElement);

        }
      }

      --i;

    } while (i > 0);

  }




  render() {
    this.setPriceElements()


    return (
      <React.Fragment>
        <div>

          <div id='header'>

            <span id="vertical-rect"></span>
            <span id="vertical-rect"></span>

            <img className='symbol' src="/img/SVG/home/inner/bitcoin-symbol.svg" alt="" />
            <img className="clean symbol" src="/img/SVG/home/outer/clean.svg" alt="" />

            <img className="broken symbol" src="/img/SVG/home/outer/broken.svg" alt="" />


            <div id="home-header-text">
              <div>
                <h1>
                  Buy, Sell, and Trade Market Items
                </h1>
                <h2>
                  In Bitcoin and Sats
                </h2>
                <div>
                  Welcome to Bidblock<br />
                  We are building the most ethical item market that disposes of a system to facilitate Bitcoin transactions
                </div>
              </div>
            </div>



            <div id="home-header-cards">
              <HomeBannerCard
                icon_path='/img/SVG/home/home-cards/downwallet.svg'
                text='Deposit on Bitcoin wallets. Upcoming.'
              />
              <HomeBannerCard
                icon_path='/img/SVG/home/home-cards/credit-card.svg'
                text='In-app transaction system. Upcoming.'
              />
              <HomeBannerCard
                icon_path='/img/SVG/home/home-cards/wallet.svg'
                text='Sales dashboards, and graphs to monitor your financial progress. Upcoming.'
              />

            </div>





            <div id="home-header-prices">
              <div id="scroll-bar">

              </div>


              {/* <table>
              <tbody>
                <tr>
                  {tds_currencies}
                </tr>
                <tr>
                  {tds_values}
                </tr>
              </tbody>
            </table> */}


            </div>




          </div>
        </div>



      </React.Fragment>
    );
  }
}

export default HomeBanner
