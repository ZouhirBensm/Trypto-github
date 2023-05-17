import CURRENCY_CODES from '../../full-stack-libs/Types/CurrencyCodes'

import HomeBannerCard from './HomeBannerCard'
import './styles/HomeBanner.css'


import ScrollChildManager from '../front-end-lib/dom-manips-utils/scroll-child-manager';


// !!!! TODO rename this Component, because holds more than prices

class HomeBanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.scrollChildManagerInstance = new ScrollChildManager();
    // this.popup = popup
    // console.log(this.props)
  }

  componentDidMount() {

    
    console.log("this.scrollChildManagerInstance", this.scrollChildManagerInstance)
    
    const homeHeaderPrices2 = document.getElementById("home-header-prices2")
    const scrollBar2 = document.getElementById("scroll-bar2")
    
    console.log(scrollBar2)
    
    
    // TODO !!!! HERE
    // SET THE FIRST CHILD ELEMENT INSTANCE


    scrollBar2.addEventListener('scroll', (e) => {

      // ---->> LEFT EDGE CONTROL <<----

      // console.log('scrollBar2: e.target.offsetLeft --->', e.target.offsetLeft)

      const rectObj = e.target.getBoundingClientRect()
      // console.log('scrollBar2: e.target.getBoundingClientRect() --->', rectObj)

      // console.log('scrollBar2: e.target.getBoundingClientRect() ---> (left, x)', `(${rectObj.left}, ${rectObj.x})`)


      // console.log('scrollBar2: e.target.offsetParent.offsetLeft --->', e.target.offsetParent.offsetLeft)


      // LEFT EDGE - CONTAINER EDGE
      // console.log('scrollBar2: e.target.scrollLeft --->', e.target.scrollLeft)
      const remainingLeftVariableScroll = e.target.scrollLeft



      // ---->> CHILD ENTIRE WIDTH <<----
      // console.log('scrollBar2: e.target.scrollWidth --->', e.target.scrollWidth)
      const entireChildWidth = e.target.scrollWidth


      // ---->> VIEWPORT/CONTAINER FIXED WIDTH <<----
      const containerFixedWidth = e.target.clientWidth


      // ---->> REMAINING SCROLL <<----
      const remainingRightFixedScroll = entireChildWidth - containerFixedWidth

      // console.log("remainingRightFixedScroll: ", remainingRightFixedScroll)


      const remainingRightVariableScroll = remainingRightFixedScroll - remainingLeftVariableScroll

      // console.log("remainingRightVariableScroll: ", remainingRightVariableScroll)
      // console.log("remainingLeftVariableScroll: ", remainingLeftVariableScroll)


      // TODO!!!! TRANFORM TO CLASS: STATIC METHODS APPEND CHILD, and SCROLL EVENT, DATASET PROPERTY

      if (remainingRightVariableScroll < 200) {
        console.log('BATTERY LOW ON THE RIGHT')
        // CLONE CHILD
        // APPEND AFTER TO ACTUAL -> ONCE EFFECT
        // SET A SCROLL EVENT SAME AS THIS ONE -> ONCE EFFECT
        
        // ONCE remainingRightVariableScroll HITS 0 DELETE ACTUAL with it EVENT LISTENER
      }

      if (remainingLeftVariableScroll < 200 && parseInt(scrollBar2.dataset.number) !== 0) {
        console.log('BATTERY LOW ON THE LEFT')
        // CLONE CHILD
        // APPEND PREVIOUS TO ACTUAL -> ONCE EFFECT
        // SET A SCROLL EVENT SAME AS THIS ONE -> ONCE EFFECT
        
        // ONCE remainingLeftVariableScroll HITS 0 DELETE ACTUAL with it EVENT LISTENER
      }



  })
}





setPriceElements() {

  // console.log(CURRENCY_CODES)
  const homeHeaderPrices = document.getElementById('scroll-bar')


  for (const country_code in this.props?.btc_gecko_prices) {


    if (Object.hasOwnProperty.call(this.props?.btc_gecko_prices, country_code)) {

      const price = this.props?.btc_gecko_prices[country_code];

      const priceElement = document.createElement('div');
      priceElement.classList.add("price-element");

      const span1 = document.createElement('span');
      const country_name = CURRENCY_CODES[country_code]
      const flagImg = document.createElement('img');
      flagImg.src = `/img/SVG/home/${country_name}.svg`;

      priceElement.appendChild(flagImg);
      span1.innerHTML = country_name;
      priceElement.appendChild(span1);
      const span2 = document.createElement('span');
      span2.innerHTML = price;
      priceElement.appendChild(span2);
      homeHeaderPrices.appendChild(priceElement);

    }
  }


}




render() {
  this.setPriceElements()


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


      {/* TESTING INFINITE SCROLL */}
      <div id="home-header-prices2">
        <div id="scroll-bar2" data-number="0">

          <div className="price-element2">
            <img src="/img/SVG/home/Europe.svg" />
            <span>bla bla</span>
          </div>
          <div className="price-element2">
            <img src="/img/SVG/home/Mexico.svg" />
            <span>bla bla</span>
          </div>
          <div className="price-element2">
            <img src="/img/SVG/home/Canada.svg" />
            <span>bla bla</span>
          </div>
          <div className="price-element2">
            <img src="/img/SVG/home/United States.svg" />
            <span>bla bla</span>
          </div>

        </div>
      </div>



    </React.Fragment>
  );
}
}

export default HomeBanner
