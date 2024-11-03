
import LocalityFilter from "./LocalityFilter"
import '../style/SearchWindow.css'
import MARKET_CATEGORIES from "../../../full-stack-libs/Types/MarketCategories"
import BITCOIN_CHAINS_WALLETS from "../../../full-stack-libs/Types/BitcoinChainsWallets"


const rangeMin = 10
const rangeMax = 5000
const rangeStep = 10
const range = rangeMax - rangeMin

const width = '90%'


class SearchWindow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popup: undefined,
      categories_options: [],
      selectedCategory: this.props.searchEngineState.categoryTerm,
      // selectedSubcategory: this.props.searchEngineState.subcategoryTerm,

      
      
    }
    this.searchEngineOnChange = this.searchEngineOnChange.bind(this)

    this.inputTitle = React.createRef();
    this.selectCategory = React.createRef();
    this.selectSubcategory = React.createRef();
    this.selectChain = React.createRef();

    this.selectCondition = React.createRef();

    this.inputMinprice = React.createRef();
    this.inputMaxprice = React.createRef();
    this.divSearchinputs = React.createRef();

    this.onChangeCallerMin = this.onChangeCallerMin.bind(this);
    this.onChangeCallerMax = this.onChangeCallerMax.bind(this);
    this.setPopup = this.setPopup.bind(this);
  }

  handleCategoryChange = (event) => {
    this.setState({ selectedCategory: event.target.value });
  }

  // handleSubcategoryChange = (event) => {
  //   this.setState({ selectedSubcategory: event.target.value });
  // }

  setPopup(popup) {
    this.setState({
      popup: popup
    })
  }

  setOptions(_category) {
    let options = []

    for (const key in MARKET_CATEGORIES) {
      if (Object.hasOwnProperty.call(MARKET_CATEGORIES, key)) {
        const MARKET_CATEGORY = MARKET_CATEGORIES[key];
        if (MARKET_CATEGORY.name !== _category) continue

        options = MARKET_CATEGORY.sub.map((el, i) => <option key={i} value={el}>{el}</option>);

      }
    }

    return options
  }



  componentDidMount() {

    let categories_options = []

    for (const key in MARKET_CATEGORIES) {
      if (Object.hasOwnProperty.call(MARKET_CATEGORIES, key)) {
        const MARKET_CATEGORY = MARKET_CATEGORIES[key];
        categories_options.push(MARKET_CATEGORY.name)
      }
    }



    this.setState({ categories_options: categories_options })

    console.log("SearchWindow just mounted! 🔺")

    const minPriceTerm_value = parseInt(this.inputMinprice.current.value)
    const maxPriceTerm_value = parseInt(this.inputMaxprice.current.value)

    let percentageMin = minPriceTerm_value * 100 / range
    percentageMin = Math.round(percentageMin)


    let percentageMax = maxPriceTerm_value * 100 / range
    percentageMax = Math.round(percentageMax)


    const containerSpanMin = {
      width: width,
    };

    const spanStyleMin = {
      left: `${percentageMin}%`,
    };

    const inputStyleMin = {
      width: width,
    };

    const containerSpanMax = {
      width: width,
    };

    const spanStyleMax = {
      left: `${percentageMax}%`,
    };

    const inputStyleMax = {
      width: width,
    };


    this.setState({ containerSpanMin, spanStyleMin, inputStyleMin, containerSpanMax, spanStyleMax, inputStyleMax });


  }


  componentWillUnmount() {
    console.log("SearchWindow just unmounted! 🔻")
  }


  onChangeCallerMin(e) {
    const maxPriceTerm_value = parseInt(this.inputMaxprice.current.value)
    // if (e.target.value < 2000) e.target.value = 2000
    let liveValue = parseInt(e.target.value)


    if (liveValue > maxPriceTerm_value) {
      e.target.value = maxPriceTerm_value
      liveValue = parseInt(e.target.value)
    }

    let percentage = liveValue * 100 / range
    percentage = Math.round(percentage)


    const containerSpanMin = {
      width: width,
    };

    const spanStyleMin = {
      left: `${percentage}%`,
    };

    const inputStyleMin = {
      width: width,
    };


    this.setState({ containerSpanMin, spanStyleMin, inputStyleMin });



  }

  onChangeCallerMax(e) {

    const minPriceTerm_value = parseInt(this.inputMinprice.current.value)
    // if (e.target.value < 2000) e.target.value = 2000
    let liveValue = parseInt(e.target.value)

    if (liveValue < minPriceTerm_value) {
      e.target.value = minPriceTerm_value
      liveValue = parseInt(e.target.value)
    }

    let percentage = liveValue * 100 / range
    percentage = Math.round(percentage)

    const containerSpanMax = {
      width: width,
    };

    const spanStyleMax = {
      left: `${percentage}%`,
    };

    const inputStyleMax = {
      width: width,
    };

    this.setState({ containerSpanMax, spanStyleMax, inputStyleMax });



  }


  render() {

    let options = this.setOptions(this.state.selectedCategory)

    const { maxValue, minValue, containerSpanMax, containerSpanMin, spanStyleMax, spanStyleMin, inputStyleMax, inputStyleMin } = this.state;

    return (
      <React.Fragment>
        <div ref={this.divSearchinputs} className='search-inputs shadow p-4'>



          <form id="my_form" className='search-component' onSubmit={(e) => {
            e.preventDefault(e)

            let retrieved = this.props.validation({
              title: this.inputTitle.current.value,
              category: this.selectCategory.current.value,
              subcategory: this.selectSubcategory.current.value,
              condition: this.selectCondition.current.value,
              min_price: this.inputMinprice.current.value,
              max_price: this.inputMaxprice.current.value,
              chain: this.selectChain.current.value,
              country: document.getElementById("my_form").elements["country"].value,
              state_province: document.getElementById("my_form").elements["state-province"].value,
              city: document.getElementById("my_form").elements["city"].value,
            })

            if (retrieved) {
              this.setPopup(retrieved)
              const searchInputs = this.divSearchinputs.current
              searchInputs.scrollTo(0, 0);
              return
            }

            this.props.submitFilter(e);
            this.props.displayHideFilterEngine(e);

          }} onChange={this.searchEngineOnChange}>



            <h2>Filters</h2>

            {this.state.popup ? <span id="popup">{this.state.popup}</span> : null}


            <input ref={this.inputTitle} type="text" id="title-select" name="title" defaultValue={this.props.searchEngineState.titleTerm} placeholder='Search' />



            <select ref={this.selectCategory} className='picker' name="category" id="category-select"
              // defaultValue={this.props.searchEngineState.categoryTerm}
              value={this.state.selectedCategory} // Use selectedCategory from state
              onChange={this.handleCategoryChange}
            >
              <option value="">No Selection</option>
              {this.state.categories_options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>

            <select ref={this.selectSubcategory} className='picker' name="subcategory" id="subcategory-select"
              // defaultValue={this.props.searchEngineState.categoryTerm}
              value={this.props.searchEngineState.subcategoryTerm}

            // onChange={this.handleSubcategoryChange}
            >
              <option value="">No Selection</option>
              {options}
            </select>




            <select ref={this.selectCondition} className='picker' name="condition" id="condition-select" defaultValue={this.props.searchEngineState.conditionTerm}>
              <option value="">Condition</option>
              <option value={1}>Brand new</option>
              <option value={2}>Barely used</option>
              <option value={3}>In good condition</option>
              <option value={4}>Used</option>
            </select>




            <select ref={this.selectChain} className='picker' name="chain" id="chain-select" defaultValue={this.props.searchEngineState.chainTerm}>
              <option value="">BTC Type/Chain</option>
              <option value={BITCOIN_CHAINS_WALLETS.BITCOIN_BASE_CHAIN.name}>{BITCOIN_CHAINS_WALLETS.BITCOIN_BASE_CHAIN.name}</option>
              <option value={BITCOIN_CHAINS_WALLETS.BITCOIN_LIGHNING.name}>{BITCOIN_CHAINS_WALLETS.BITCOIN_LIGHNING.name}</option>
              <option value={BITCOIN_CHAINS_WALLETS.BITCOIN_LIQUID.name}>{BITCOIN_CHAINS_WALLETS.BITCOIN_LIQUID.name}</option>
            </select>



            <label htmlFor="min-price-input">Price Range ($)</label>

            <button id='reset-price' onClick={(e) => {
              e.preventDefault()
              const range1 = this.inputMinprice.current
              const range2 = this.inputMaxprice.current
              const range_reset_value = parseInt(range1.min) + ((parseInt(range1.max) - parseInt(range1.min)) / 2)

              console.log(range_reset_value)

              range1.value = range_reset_value
              range2.value = range_reset_value

              const containerSpanMax = { width: width };
              const spanStyleMax = { left: `50%` };
              const inputStyleMax = { width: width };

              const containerSpanMin = { width: width };
              const spanStyleMin = { left: `50%` };
              const inputStyleMin = { width: width };

              this.setState({ containerSpanMax, spanStyleMax, inputStyleMax, containerSpanMin, spanStyleMin, inputStyleMin });


              this.props.resetPriceFilter()
            }}>
              <img src="/img/SVG/market/filter/reset.svg" alt="" />
            </button>





            <div id='relative-frame'>

              <span style={{ ...containerSpanMin, width: width }}>
                <span style={spanStyleMin} id="min-price-value">{this.props.minPriceTerm ? `${this.props.minPriceTerm}$` : 'N/A'}</span>
              </span>

              <input ref={this.inputMinprice} style={inputStyleMin} id="min-price-input" name="min-price" defaultValue={this.props.searchEngineState.minPriceTerm} type="range" min={`${rangeMin}`} max={`${rangeMax}`} step={`${rangeStep}`} onChange={this.onChangeCallerMin} />

              <input ref={this.inputMaxprice} style={inputStyleMax} id="max-price-input" name="max-price" defaultValue={this.props.searchEngineState.maxPriceTerm} type="range" min={`${rangeMin}`} max={`${rangeMax}`} step={`${rangeStep}`} onChange={this.onChangeCallerMax} />

              <span style={{ ...containerSpanMax, width: width }}>
                <span style={spanStyleMax} id="max-price-value">{this.props.maxPriceTerm ? `${this.props.maxPriceTerm}$` : 'N/A'}</span>
              </span>

            </div>



            <label>Location</label>

            <LocalityFilter
              countryTerm={this.props.searchEngineState.countryTerm}
              stateProvinceTerm={this.props.searchEngineState.stateProvinceTerm}
              cityTerm={this.props.searchEngineState.cityTerm}
            />



            {/* <button id="filter-submit">Submit</button> */}

          </form>


          <div id="bottom-filter-buttons">
            <input type="submit" form="my_form" id="filter-submit" value="Submit" />
            <button onClick={this.props.displayHideFilterEngine}>Hide Filter</button>
          </div>


        </div>
      </React.Fragment>
    )
  }



  searchEngineOnChange(e) {
    if (e.target.name == "country") {
      document.getElementById("my_form").elements["state-province"].value = ''
      document.getElementById("my_form").elements["city"].value = ''
    }
    if (e.target.name == "state-province") {
      document.getElementById("my_form").elements["city"].value = ''
    }
    if (e.target.name == "category") {
      this.selectSubcategory.current.value = ''
    }

    let titleTerm_value = this.inputTitle.current.value
    let categoryTerm_value = this.selectCategory.current.value
    let subcategoryTerm_value = this.selectSubcategory.current.value
    let conditionTerm_value = this.selectCondition.current.value
    let chainTerm_value = this.selectChain.current.value

    let minPriceTerm_value = this.state.minPriceTerm
    let maxPriceTerm_value = this.state.maxPriceTerm

    let countryTerm_value = document.getElementById("my_form").elements["country"].value

    let stateProvinceTerm_value = document.getElementById("my_form").elements["state-province"].value
    let cityTerm_value = document.getElementById("my_form").elements["city"].value

    if (e.target.name == "min-price" || e.target.name == "max-price") {
      minPriceTerm_value = this.inputMinprice.current.value
      maxPriceTerm_value = this.inputMaxprice.current.value
    }


    this.props.state4QueryOnMarketOrders({
      titleTerm: titleTerm_value == '' ? undefined : titleTerm_value,
      categoryTerm: categoryTerm_value == '' ? undefined : categoryTerm_value,
      subcategoryTerm: subcategoryTerm_value == '' ? undefined : subcategoryTerm_value,
      conditionTerm: conditionTerm_value == '' ? undefined : conditionTerm_value,
      chainTerm: chainTerm_value == '' ? undefined : chainTerm_value,
      minPriceTerm: minPriceTerm_value,
      maxPriceTerm: maxPriceTerm_value,
      countryTerm: countryTerm_value == '' ? undefined : countryTerm_value,
      stateProvinceTerm: stateProvinceTerm_value == '' ? undefined : stateProvinceTerm_value,
      cityTerm: cityTerm_value == '' ? undefined : cityTerm_value,
    })

  }
  



}

export default SearchWindow