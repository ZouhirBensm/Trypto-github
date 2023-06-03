import HomeBanner from '../home-functionalities/HomeBanner.jsx';
import GetRecentArticles from '../home-functionalities/GetRecentArticles.jsx';
import GetRecentMarketItems from '../home-functionalities/GetRecentMarketItems.jsx';
import FAQ from '../home-functionalities/FAQ'
import OnPageFooter from '../generic-components/OnPageFooter'

import EmailMarketingCollector from '../home-functionalities/EmailMarketingCollector'

import '../style/reactDivMobile.css'

import './styles/App.css'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      prices: []
    }
    this.popup = popup
  }


  componentDidMount() {
    // console.log("in component: ", userId)

    this.loadData()
    this.popup ? this.displacePopup() : null
  }

  displacePopup() {
    let header = document.getElementById('header')
    let popup = document.getElementById('popup')

    popup.style.display = "block";

    header.insertBefore(popup, header.firstChild);


    // reactDiv.appendChild(popup)
  }

  async loadData() {
    let btc_gecko_prices = {}
    const response = await fetch(`/cryptoprice`)
    const data = await response.json()

    // console.log(btc_gecko_prices, data.data.bitcoin)

    this.setState({
      prices: data.data.bitcoin
    })
  }


  render() {
    // console.log(userId, '<<<<<--------USERID')

    return (

      // Home
      <React.Fragment>


        <HomeBanner btc_gecko_prices={this.state.prices} />

        <EmailMarketingCollector />

        <GetRecentMarketItems />

        <GetRecentArticles />

        <FAQ />

        <OnPageFooter />

      </React.Fragment>

    );
  }



}

const element = <App />;


ReactDOM.render(element, document.getElementById('react-div'));


export default App




// require('react-dom');
// window.React2 = require('react');
// console.log("same---->>>", window.React1 === window.React2);
// console.log(window.React1)
// console.log(window.React2)