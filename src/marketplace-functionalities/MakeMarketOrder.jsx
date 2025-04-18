
import NavigationNew from './NavigationNew'

import './style/MakeMarketOrder.css'
import './style/market-main-component.css'
import './style/googlemaps.css'

import loadable from "@loadable/component";
import Loading from "../generic-components/Loading"

import { utils } from '../../full-stack-libs/utils.address'

const _1_InputGeneralMarketOrder = loadable(() => import("./make-market-order-components/_1_InputGeneralMarketOrder"), {
  fallback: <Loading />
});

const _2_InputNumbersMarketOrder = loadable(() => import("./make-market-order-components/_2_InputNumbersMarketOrder"), {
  fallback: <Loading />
});

const _3_InputLocationMarketOrder = loadable(() => import("./make-market-order-components/_3_InputLocationMarketOrder"), {
  fallback: <Loading />
});

const _4_InputImagesMarketOrder = loadable(() => import("./make-market-order-components/_4_InputImagesMarketOrder"), {
  fallback: <Loading />
});


class MakeMarketOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popup_state: null,
      step: 1,

      title: undefined,
      description: undefined,
      category: undefined,
      subcategory: undefined,
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

      images: [],
      filelist: []
    }

    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleimages = this.handleimages.bind(this)
    this.setStateStep = this.setStateStep.bind(this)
    this.setpopup = this.setpopup.bind(this)

    this.clickGetCryptoPrice = this.clickGetCryptoPrice.bind(this)
    this.changeStateLocationParent = this.changeStateLocationParent.bind(this)
    this.resetLocation = this.resetLocation.bind(this)

    // console.log(userId)
  }

  setpopup(message) {
    this.setState({
      popup_state: message
    })
  }

  setStateStep(step, popup = null) {
    this.setState({
      step: step,
      popup_state: popup
    })
  }

  nextStep(e) {
    this.setState({
      step: ++this.state.step,
      popup_state: null
    })
  }

  previousStep(e) {
    this.setState({
      step: --this.state.step,
      popup_state: null
    })
  }

  handleChange(input, e = undefined) {

    console.log(input)
    let payment = null
    let subcategory = null


    if (input == "category") subcategory = {subcategory: ''}
    
    if (input == "chain") payment = {payment: ''}


    if (e) return this.setState({
      [input]: e.target.value,
      popup_state: null,
      ...payment,
      ...subcategory
    });

    return this.setState({
      [input]: document.getElementById(`${input}-input`).value,
      popup_state: null,
    });

  }

  handleimages(newimages, newFileList, popup_state = null) {
    return this.setState({
      images: newimages,
      filelist: newFileList,
      popup_state: popup_state,
    });
  }


  render() {
    let component = this.determineComponent()

    return (
      <React.Fragment>

        <NavigationNew/>

        <div id='market-main-component'>

          <div id='header-grid'>
            <h1>Add Article</h1>
            <div>
              <img src="/img/SVG/market/add-article/step1/reset.svg" alt=""/>
              <a href="/marketplace/makesell"> Reset </a>
            </div>
            <span>Please take your time to fill in the form.</span>
          </div>

          {this.state.popup_state ?
            <p>{this.state.popup_state}</p>
            : null}

          {component}

        </div>

        <div id="google-maps"></div>


      </React.Fragment>
    )
  }


  determineComponent() {
    // default style hide map
    let the_map = document.getElementById('the-map');
    let autocomplete_block = document.getElementById('autocomplete-block');

    the_map.style.display = "none"
    autocomplete_block.style.display = "none"


    let component
    switch (this.state.step) {
      case 1:
        component = <_1_InputGeneralMarketOrder
          handleChange={this.handleChange}
          setStateStep={this.setStateStep}
          step={this.state.step}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
          setpopup={this.setpopup}

          title={this.state.title}
          description={this.state.description}
          category={this.state.category}
          subcategory={this.state.subcategory}
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
          setpopup={this.setpopup}

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
          setpopup={this.setpopup}


          changeStateLocationParent={this.changeStateLocationParent}
          resetLocation={this.resetLocation}
          geometry={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
        />

        the_map.style.display = "block"
        autocomplete_block.style.display = "block"

        break;
      case 4:
        component = <_4_InputImagesMarketOrder
          handleChange={this.handleChange}
          setStateStep={this.setStateStep}
          step={this.state.step}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
          setpopup={this.setpopup}
          userId={this.props.userId}

          images={this.state.images}
          filelist={this.state.filelist}
          handleimages={this.handleimages}
          formData={this.state}
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
    this.firstPlacementMap()
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
      market_price_btc = pkg_prices.data[_crypto.toLowerCase()]?.usd

      return this.setState({
        onBTCvaluation: market_price_btc
      })
    } else {
      console.error(`Error on the clickGetCryptoPrice() function response.status: ${response.status}`)
    }
  }


  changeStateLocationParent(geoloc) {
    this.setState({
      lat: geoloc.lat,
      lng: geoloc.lng,
    })
  }

  resetLocation() {
    this.setState({
      lat: undefined,
      lng: undefined,

      address: undefined,
      st_number: undefined,
      st: undefined,
      neigh: undefined,
      province_state: undefined,
      city: undefined,
      country: undefined,
    })
  }

  async geolocateAndSetState() {
    let geocoder = window.geocoder

    const latlng = {
      lat: parseFloat(this.state.lat),
      lng: parseFloat(this.state.lng),
      popup_state: null,
    };

    let response
    try {
      response = await geocoder.geocode({ location: latlng })
    } catch (e) {
      console.error("Geocoder failed due to: " + e)
    }

    console.log(response)

    const address = response.results[0].formatted_address, addressArray = response.results[0].address_components;

    let st_number = utils.getStreetNumber(addressArray),
      st = utils.getStreet(addressArray),
      neigh = utils.getNeighborhood(addressArray),
      province_state = utils.getProvinceState(addressArray),
      city = utils.getCity(addressArray),
      country = utils.getCountry(addressArray)


    st_number = (st_number) ? st_number : undefined
    st = (st) ? st : undefined
    neigh = (neigh) ? neigh : undefined
    province_state = (province_state) ? province_state : undefined
    city = (city) ? city : undefined
    country = (country) ? country : undefined


    // console.log({
    //   address: (address) ? address : undefined,
    //   st_number: st_number,
    //   st: st,
    //   neigh: neigh,
    //   province_state: province_state,
    //   city: city,
    //   country: country,
    // })

    return this.setState({
      address: (address) ? address : undefined,
      st_number: st_number,
      st: st,
      neigh: neigh,
      province_state: province_state,
      city: city,
      country: country,
      popup_state: null,
    })
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.state.lat == undefined ||
      this.state.lng == undefined) {
      return
    }
    if (this.state.lat !== prevState.lat ||
      this.state.lng !== prevState.lng) {
      return this.geolocateAndSetState()
    }
    return
  }


  // firstPlacementMap() {

  //   var a = document.querySelectorAll('a[href="/marketplace/makesell"]')[1]
  //   console.log(a)

    
  //   let the_map = document.getElementById('the-map');
  //   let autocomplete_block = document.getElementById('autocomplete-block');

  //   a.parentNode.insertBefore(autocomplete_block, a.nextSibling);
  //   autocomplete_block.parentNode.insertBefore(the_map, autocomplete_block.nextSibling);
  // }

  firstPlacementMap() {

    var div_google_maps = document.getElementById("google-maps")
    console.log(div_google_maps)

    
    let the_map = document.getElementById('the-map');
    let autocomplete_block = document.getElementById('autocomplete-block');

    div_google_maps.appendChild(autocomplete_block)
    div_google_maps.appendChild(the_map)


    var mainMarketComponent = document.getElementById("market-main-component")
    console.log(mainMarketComponent)

    mainMarketComponent.appendChild(div_google_maps)

  }

}

export default MakeMarketOrder