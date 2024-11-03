import HomeBanner from "../home-functionalities/HomeBanner.jsx";
import GetRecentArticles from "../home-functionalities/GetRecentArticles.jsx";
import GetRecentMarketItems from "../home-functionalities/GetRecentMarketItems.jsx";
import FAQ from "../home-functionalities/FAQ";
import Features from "../home-functionalities/Features";
import OnPageFooter from "../generic-components/OnPageFooter";

import EMAIL_MARKETING_TYPES from "../../full-stack-libs/Types/EmailMarketingTypes.js";

import EmailMarketingCollector from "../home-functionalities/EmailMarketingCollector";

import "../style/reactDivMobile.css";

import "./styles/App.css";
import HomeFirstSection from "../home-functionalities/HomeFirstSection.jsx";
import Categories from "../home-functionalities/Categories.jsx";
import MARKET_CATEGORIES from "../../full-stack-libs/Types/MarketCategories.js";

import TicketSection from "../home-functionalities/TicketSection.jsx";
import Popup from "../generic-components/Popup.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
    };
    this.popup = popup;
  }

  componentDidMount() {
    // console.log("in component: ", userId)

    this.loadData();
    // this.popup ? this.displacePopup() : null;
  }

  displacePopup() {
    let header = document.getElementById("bidblock-navbar");
    let popup = document.getElementById("popup");

    popup.style.display = "block";
    // display: flex;
    // position: fixed;
    // right: 50px;
    // bottom: 100px;
    // background: #4BB543;
    // padding: 1rem;
    // border-radius: 0.5rem;
    // height: 3rem;
    // color: white;
    // align-items: center;

    header.insertBefore(popup, header.firstChild);

    // reactDiv.appendChild(popup)
  }

  async loadData() {
    let btc_gecko_prices = {};
    const response = await fetch(`/cryptoprice`);
    const data = await response.json();

    // console.log(btc_gecko_prices, data.data.bitcoin)

    this.setState({
      prices: data.data.bitcoin,
    });
    return;
  }

  render() {
    // console.log(userId, '<<<<<--------USERID')

    return (
      // Home
      <React.Fragment>
        {this.popup && <Popup message={this.popup} />}
        <HomeFirstSection>
          <HomeBanner
            btc_gecko_prices={this.state.prices}
            categories={MARKET_CATEGORIES}
          />
          <Categories categories={MARKET_CATEGORIES} />
          <TicketSection />
        </HomeFirstSection>

        {/* <GetRecentMarketItems /> */}

        <GetRecentArticles />

        <FAQ />

        <Features />

        <OnPageFooter />
      </React.Fragment>
    );
  }
}

const element = <App />;

ReactDOM.render(element, document.getElementById("react-div"));

export default App;

// require('react-dom');
// window.React2 = require('react');
// console.log("same---->>>", window.React1 === window.React2);
// console.log(window.React1)
// console.log(window.React2)
