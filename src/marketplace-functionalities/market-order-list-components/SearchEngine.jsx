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
    }
    this.displayHideFilterEngine = this.displayHideFilterEngine.bind(this);
  }




  validation(filter_values) {

    console.log("filter_values", filter_values)

    let retrieved = validateInputsAgainstInjection(filter_values)
    console.log("retrieved", retrieved)

    return retrieved

  }



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