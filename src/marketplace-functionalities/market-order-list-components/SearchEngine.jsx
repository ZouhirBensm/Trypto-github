import './style/SearchEngine.css'

import LocalityFilter from '../search-engine/LocalityFilter'

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
    this.rangeLimits = this.rangeLimits.bind(this);

    // console.log("order_type=", this.props.order_type)
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



  rangeLimits(e) {
    // if (e.target.value < 2000) e.target.value = 2000

    const liveValue = parseInt(e.target.value)

    const minPriceTerm_value = parseInt(document.getElementById("my_form").elements["min-price"].value)
    const maxPriceTerm_value = parseInt(document.getElementById("my_form").elements["max-price"].value)


    if (e.target.name == "min-price") {
      if (liveValue > maxPriceTerm_value) {
        e.target.value = maxPriceTerm_value
      }
    }

    if (e.target.name == "max-price") {
      if (liveValue < minPriceTerm_value) {
        e.target.value = minPriceTerm_value
      }
    }

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


          <div className='search-inputs'>

            <form id="my_form" className='search-component' onSubmit={(e) => {
              e.preventDefault(e)

              let retrieved = this.validation()

              if (retrieved) {
                this.setState({
                  popup: retrieved
                })
                return
              }
              this.props.submitFilter(e);
              this.displayHideFilterEngine(e);

            }} onChange={this.props.searchEngineOnChange}>



              <h2>Filters</h2>

              {/* <label htmlFor="title-select">Title</label> */}
              <input type="text" id="title-select" name="title" defaultValue={this.props.searchEngineState.titleTerm} placeholder='Search'/>


              {/* <label htmlFor="category-select">Category</label> */}
              <select className='picker' name="category" id="category-select" defaultValue={this.props.searchEngineState.categoryTerm}>
                <option value="">Category</option>
                <option value="Other">Other</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Clothes">Clothes</option>
                <option value="Electronics">Electronics</option>
                <option value="Automobile">Automobile</option>
                <option value="Camping">Camping</option>
                <option value="Furniture">Furniture</option>
              </select>



              {/* <label htmlFor="condition-select">Condition</label> */}
              <select className='picker' name="condition" id="condition-select" defaultValue={this.props.searchEngineState.conditionTerm}>
                <option value="">Condition</option>
                <option value={1}>Brand new</option>
                <option value={2}>Just opened</option>
                <option value={3}>In good condition</option>
                <option value={4}>Used</option>
              </select>



              {/* <label htmlFor="chain-select">BTC Type/Chain</label> */}
              <select className='picker' name="chain" id="chain-select" defaultValue={this.props.searchEngineState.chainTerm}>
                <option value="">BTC Type/Chain</option>
                <option value="Bitcoin Base Chain">Bitcoin Base Chain</option>
                <option value="Bitcoin Lightning">Bitcoin Lightning</option>
                <option value="Bitcoin Liquid">Bitcoin Liquid</option>
              </select>



              <label htmlFor="min-price-input">Price Range ($)</label>



              <div id='relative-frame'>

                {/* <span>{this.props.minPriceTerm}</span> */}

                <input id="min-price-input" name="min-price" defaultValue={this.props.searchEngineState.minPriceTerm} type="range" min={`${rangeMin}`} max={`${rangeMax}`} step={`${rangeStep}`} onChange={this.rangeLimits} />

                <input id="max-price-input" name="max-price" defaultValue={this.props.searchEngineState.maxPriceTerm} type="range" min={`${rangeMin}`} max={`${rangeMax}`} step={`${rangeStep}`} onChange={this.rangeLimits} />
                
                {/* <span>{this.props.maxPriceTerm}</span> */}

              </div>



              <button id='reset-price' onClick={(e) => {
                e.preventDefault()
                const range1 = document.getElementById("my_form").elements["min-price"]
                const range2 = document.getElementById("my_form").elements["max-price"]
                const range_reset_value = parseInt(range1.min) + ((parseInt(range1.max) - parseInt(range1.min)) / 2)

                range1.value = range_reset_value
                range2.value = range_reset_value

                this.props.resetPriceFilter()
              }}>
                <img src="/img/SVG/market/filter/reset.svg" alt="" />
              </button>



              <br/><br/><br/><br/><br/><br/>


              <LocalityFilter
                countryTerm={this.props.searchEngineState.countryTerm}
                stateProvinceTerm={this.props.searchEngineState.stateProvinceTerm}
                cityTerm={this.props.searchEngineState.cityTerm}
              />

              { this.state.popup ? <span>{this.state.popup}</span> : null }


              <button id="filter-submit">Submit</button>

            </form>

            <button onClick={this.displayHideFilterEngine}>Drop Up</button>

          </div>
        }
      </React.Fragment>
    );
  }
}


export default SearchEngine