
import '../style/reactDivMobile.css'


import loadable from "@loadable/component";
import Loading from "../generic-components/Loading"

const _1_InputGeneralMarketOrder = loadable(() => import("./_1_InputGeneralMarketOrder"), {
  fallback: <Loading />
});

const _2_InputNumbersMarketOrder = loadable(() => import("./_2_InputNumbersMarketOrder"), {
  fallback: <Loading />
});

const _3_InputLocationMarketOrder = loadable(() => import("./_3_InputLocationMarketOrder"), {
  fallback: <Loading />
});

const _4_InputImagesMarketOrder = loadable(() => import("./_4_InputImagesMarketOrder"), {
  fallback: <Loading />
});


class MakeMarketOrder2 extends React.Component {
  constructor() {
    super()
    this.state = {
      popup_state: null,
      step: 1,

      title: undefined,
      description: undefined,
      category: undefined,
      condition: undefined,
      expirytime: undefined,
      expirydate: undefined,
      
      lat: undefined, 
      lng: undefined,
      address: undefined,
      st_number: undefined,
      st: undefined,
      neigh: undefined,
      province_state: undefined,
      city: undefined,
      country: undefined,

      
      crypto: "Bitcoin",
      chain: undefined,
      price: undefined,
      onBTCvaluation: undefined,
      payment: undefined,

      images: undefined
    }

    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setStateStep = this.setStateStep.bind(this)
    
    this.clickGetCryptoPrice = this.clickGetCryptoPrice.bind(this)
  }

  setStateStep(step) {
    this.setState({
      step: step
    })
  }
  nextStep(e) {
    this.setState({
      step: ++this.state.step
    })
  }
  previousStep(e) {
    this.setState({
      step: --this.state.step
    })
  }

  handleChange(input, e = undefined) {
    let payment = null

    if(input == "chain") payment = {
      payment: ""
    }


    if (e) return this.setState({
      [input]: e.target.value,
      ...payment
    });


    return this.setState({
      [input]: document.getElementById(`${input}-input`).value
    });

  }

  
  // _____________________________________________

  render() {
    let component = this.determineComponent()

    return (
      <React.Fragment>
        <a href="/marketplace/makesell"> Reset </a>
        {component}

        {this.state.popup_state ?
        <p>{this.state.popup_state}</p>
        : null}


      </React.Fragment>
    )
  }


  // _____________________________________________

  determineComponent() {
    let component
    switch (this.state.step) {
      case 1:
        component = <_1_InputGeneralMarketOrder
          handleChange={this.handleChange}
          setStateStep={this.setStateStep}
          step={this.state.step}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
          title={this.state.title}
          description={this.state.description}
          category={this.state.category}
          condition={this.state.condition}
          expirydate={this.state.expirydate}
          expirytime={this.state.expirytime}
        />
        break;
      case 2:
        component = <_2_InputNumbersMarketOrder
          handleChange={this.handleChange}
          setStateStep={this.setStateStep}
          step={this.state.step}
          nextStep={this.nextStep}
          previousStep={this.previousStep}

          // unit={this.state.unit}
          crypto={this.state.crypto}
          chain={this.state.chain}
          price={this.state.price}
          onBTCvaluation={this.state.onBTCvaluation}
          payment={this.state.payment}
          clickGetCryptoPrice={this.clickGetCryptoPrice}
          
        />
        break;
      case 3:
        component = <_3_InputLocationMarketOrder
          handleChange={this.handleChange}
          setStateStep={this.setStateStep}
          step={this.state.step}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
        />
        break;
      case 4:
        component = <_4_InputImagesMarketOrder
          handleChange={this.handleChange}
          setStateStep={this.setStateStep}
          step={this.state.step}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
        />
        break;
      default:
        component = null
        break;
    }
    return component
  }

  componentDidMount() {
    this.clickGetCryptoPrice()
  }


  async clickGetCryptoPrice(e = null) {
    e?.preventDefault()
    let _crypto = "Bitcoin"
    let market_price_btc, response, pkg_prices

    try {
      response = await fetch(`/cryptoprice`)
    } catch (error) {
      alert(`Their seems to be an error. Enter Price manually. ${error}`)
    }
    if (response.ok) {
      pkg_prices = await response.json()
      market_price_btc = pkg_prices.data[_crypto.toLowerCase()]?.cad

      return this.setState({
        onBTCvaluation: market_price_btc
      })
      

    } else {
      console.error(`Error on the clickGetCryptoPrice() function response.status: ${response.status}`)
    }
  }



}

export default MakeMarketOrder2