import CURRENCY_CODES from '../../full-stack-libs/Types/CurrencyCodes'

import HomeBannerCard from './HomeBannerCard'
import './styles/HomeBanner.css'


// !!!! TODO rename this Component, because holds more than prices

class HomeBanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    // this.popup = popup
    // console.log(this.props)
    this.ulRef = React.createRef();
  }

  componentDidMount() {
    var scrollContainer = document.querySelector('.scroll-container');
    var scrollContent = document.querySelector('.scroll-content');

    scrollContainer.addEventListener('scroll', function () {
      // console.log(scrollContainer.scrollLeft)
      // console.log(Math.ceil(scrollContainer.scrollLeft + scrollContainer.offsetWidth))
      // console.log(Math.floor(scrollContainer.scrollWidth))
      // if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth) {

      if (Math.ceil(scrollContainer.scrollLeft + scrollContainer.offsetWidth) >= Math.floor(scrollContainer.scrollWidth)) {

        scrollContainer.scrollLeft = 0;
      }

      
      // var newScrollLeft = scrollContainer.scrollLeft;
      // var divWidth = scrollContainer.offsetWidth;
      // var scrollWidth = scrollContainer.scrollWidth;
  
      // console.log(Math.ceil(newScrollLeft), Math.floor(scrollWidth - divWidth))
  
      // if (Math.ceil(newScrollLeft) === Math.floor(scrollWidth - divWidth)) {
      //   scrollContainer.scrollLeft = 0;
      // }
      
    });
    
    


    


  }

  scrollContent = () => {
    const { scrollHeight, clientHeight, scrollTop } = this.scrollContainer;
    const scrollDistance = scrollHeight - clientHeight;

    // Scroll to the top if we have reached the bottom
    if (scrollTop >= scrollDistance) {
      this.scrollContainer.scrollTop = 0;
    } else {
      // Otherwise, scroll to the next position
      this.scrollContainer.scrollTop += clientHeight;
    }
  };




  setPriceElements() {

    console.log(CURRENCY_CODES)
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





        <div className="scroll-container">
          <div className="scroll-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quo fugit laboriosam consequuntur id similique eum explicabo ipsa adipisci, aliquam neque minus numquam, deserunt cupiditate nesciunt quis molestiae facilis impedit. Dolor expedita sequi at. Molestiae aliquam obcaecati excepturi et perferendis omnis id vitae enim culpa?
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default HomeBanner
