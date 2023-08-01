
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
    // const minPriceInput = document.getElementById("min-price-input");

    const minPriceTerm_value = parseInt(document.getElementById("my_form").elements["min-price"].value)
    const maxPriceTerm_value = parseInt(document.getElementById("my_form").elements["max-price"].value)

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


  onChangeCallerMin(e){
    const maxPriceTerm_value = parseInt(document.getElementById("my_form").elements["max-price"].value)
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

  onChangeCallerMax(e){

    const minPriceTerm_value = parseInt(document.getElementById("my_form").elements["min-price"].value)
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
        <div className='search-inputs'>

          

          <form id="my_form" className='search-component' onSubmit={(e) => {
            e.preventDefault(e)

            // TEMPORAL
            // let retrieved = this.props.validation()

            // if (retrieved) {
            //   this.setPopup(retrieved)
            //   const searchInputs = document.getElementsByClassName('search-inputs')[0]
            //   searchInputs.scrollTo(0, 0);
            //   return
            // }

            this.props.submitFilter(e);
            // this.props.displayHideFilterEngine(e);

          }} onChange={this.props.searchEngineOnChange}>



            <h2>Filters</h2>

            {this.state.popup ? <span id="popup">{this.state.popup}</span> : null}


            <input type="text" id="title-select" name="title" defaultValue={this.props.searchEngineState.titleTerm} placeholder='Search' />



            <select className='picker' name="category" id="category-select" 
            // defaultValue={this.props.searchEngineState.categoryTerm}
            value={this.state.selectedCategory} // Use selectedCategory from state
            onChange={this.handleCategoryChange}
            >
              <option value="">No Selection</option>
              {this.state.categories_options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>

            <select className='picker' name="subcategory" id="subcategory-select" 
            // defaultValue={this.props.searchEngineState.categoryTerm}
            value={this.props.searchEngineState.subcategoryTerm}

            // onChange={this.handleSubcategoryChange}
            >
              <option value="">No Selection</option>
              {options}
            </select>




            <select className='picker' name="condition" id="condition-select" defaultValue={this.props.searchEngineState.conditionTerm}>
              <option value="">Condition</option>
              <option value={1}>Brand new</option>
              <option value={2}>Barely used</option>
              <option value={3}>In good condition</option>
              <option value={4}>Used</option>
            </select>




            <select className='picker' name="chain" id="chain-select" defaultValue={this.props.searchEngineState.chainTerm}>
              <option value="">BTC Type/Chain</option>
              <option value={BITCOIN_CHAINS_WALLETS.BITCOIN_BASE_CHAIN.name}>{BITCOIN_CHAINS_WALLETS.BITCOIN_BASE_CHAIN.name}</option>
              <option value={BITCOIN_CHAINS_WALLETS.BITCOIN_LIGHNING.name}>{BITCOIN_CHAINS_WALLETS.BITCOIN_LIGHNING.name}</option>
              <option value={BITCOIN_CHAINS_WALLETS.BITCOIN_LIQUID.name}>{BITCOIN_CHAINS_WALLETS.BITCOIN_LIQUID.name}</option>
            </select>



            <label htmlFor="min-price-input">Price Range ($)</label>

            <button id='reset-price' onClick={(e) => {
              e.preventDefault()
              const range1 = document.getElementById("my_form").elements["min-price"]
              const range2 = document.getElementById("my_form").elements["max-price"]
              const range_reset_value = parseInt(range1.min) + ((parseInt(range1.max) - parseInt(range1.min)) / 2)

              console.log(range_reset_value)

              range1.value = range_reset_value
              range2.value = range_reset_value

              const containerSpanMax = { width: width };
              const spanStyleMax = { left: `50%`};
              const inputStyleMax = { width: width };

              const containerSpanMin = { width: width };
              const spanStyleMin = { left: `50%`};
              const inputStyleMin = { width: width };
              
              this.setState({ containerSpanMax, spanStyleMax, inputStyleMax, containerSpanMin, spanStyleMin, inputStyleMin });


              this.props.resetPriceFilter()
            }}>
              <img src="/img/SVG/market/filter/reset.svg" alt="" />
            </button>





            <div id='relative-frame'>

              <span style={{...containerSpanMin, width: width}}>
                <span style={spanStyleMin} id="min-price-value">{this.props.minPriceTerm ? `${this.props.minPriceTerm}$` : 'N/A'}</span>
              </span>

              <input style={inputStyleMin} id="min-price-input" name="min-price" defaultValue={this.props.searchEngineState.minPriceTerm} type="range" min={`${rangeMin}`} max={`${rangeMax}`} step={`${rangeStep}`} onChange={this.onChangeCallerMin} />

              <input style={inputStyleMax} id="max-price-input" name="max-price" defaultValue={this.props.searchEngineState.maxPriceTerm} type="range" min={`${rangeMin}`} max={`${rangeMax}`} step={`${rangeStep}`} onChange={this.onChangeCallerMax} />

              <span style={{...containerSpanMax, width: width}}>
                <span style={spanStyleMax} id="max-price-value">{ this.props.maxPriceTerm? `${this.props.maxPriceTerm}$` : 'N/A'}</span>
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
            <input type="submit" form="my_form" id="filter-submit" value="Submit"/>
            <button onClick={this.props.displayHideFilterEngine}>Hide Filter</button>
          </div>
          

        </div>
      </React.Fragment>
    )
  }
}

export default SearchWindow