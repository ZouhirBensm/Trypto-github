import './style/SearchEngine.css'

import SearchWindow from '../search-engine/SearchWindow'

import { validateInputsAgainstInjection } from '../../../full-stack-libs/validations'


const rangeMin = 10
const rangeMax = 5000
const rangeStep = 10

class SearchEngine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on_off: false,
      popup: undefined
    }
    this.displayHideFilterEngine = this.displayHideFilterEngine.bind(this);
    // this.rangeLimits = this.rangeLimits.bind(this);
    this.setPopup = this.setPopup.bind(this);

    // console.log("order_type=", this.props.order_type)
  }

  setPopup(popup) {
    this.setState({
      popup: popup
    })
  }


  validation() {
    const filter_values = {
      title: document.getElementById("my_form").elements["title"].value,
      category: document.getElementById("my_form").elements["category"].value,
      condition: document.getElementById("my_form").elements["condition"].value,
      min_price: document.getElementById("my_form").elements["min-price"].value,
      max_price: document.getElementById("my_form").elements["max-price"].value,
      country: document.getElementById("my_form").elements["country"].value,
      state_province: document.getElementById("my_form").elements["state-province"].value,
      city: document.getElementById("my_form").elements["city"].value,
    }

    console.log("filter_values", filter_values)

    let retrieved = validateInputsAgainstInjection(filter_values)
    console.log("retrieved", retrieved)

    return retrieved

  }





  // rangeLimits(e) {
  //   // if (e.target.value < 2000) e.target.value = 2000
  //   const liveValue = parseInt(e.target.value)

  //   const minPriceTerm_value = parseInt(document.getElementById("my_form").elements["min-price"].value)
  //   const maxPriceTerm_value = parseInt(document.getElementById("my_form").elements["max-price"].value)


  //   if (e.target.name == "min-price") {
  //     if (liveValue > maxPriceTerm_value) {
  //       e.target.value = maxPriceTerm_value
  //     }
  //   }

  //   if (e.target.name == "max-price") {
  //     if (liveValue < minPriceTerm_value) {
  //       e.target.value = minPriceTerm_value
  //     }
  //   }

  // }


  displayHideFilterEngine(e = undefined) {
    e?.preventDefault()

    this.setState(prevState => ({
      on_off: !prevState.on_off,
      popup: undefined
    }), () => {
      if (this.state.on_off == true) {
        let filterSubmitButton = document.getElementById("filter-submit")
        filterSubmitButton.disabled = true
        const rand_delta = Number((Math.random() * 100).toFixed(2))
        const fake_delay = 1000 + rand_delta

        setTimeout(() => {
          filterSubmitButton.disabled = false
        }, fake_delay)


      }
    })
  }




  render() {
    return (
      <React.Fragment>
        {!this.state.on_off ?
          <button id='drop-down' onClick={this.displayHideFilterEngine}>Filter</button> :

          <SearchWindow
            validation={this.validation}
            setPopup={this.setPopup}
            submitFilter={this.props.submitFilter}
            displayHideFilterEngine={this.displayHideFilterEngine}
            searchEngineOnChange={this.props.searchEngineOnChange}
            searchEngineState={this.props.searchEngineState}
            resetPriceFilter={this.props.resetPriceFilter}
            minPriceTerm={this.props.minPriceTerm}
            maxPriceTerm={this.props.maxPriceTerm}
          />


        }
      </React.Fragment>
    );
  }
}


export default SearchEngine