import './style/MarketOrders.css'


import MarketOrderTable from './MarketOrderTable';
import PageSelector from '../generic-components/PageSelector';
import SearchEngine from './SearchEngine';



// TODO #102 Add touch event to slide search engine


// TODO !!!! Organize jsx files in the market space into folders. E.g. I have StateProvinceSelector and ProvinceSelector, and have 2 SearchEngine components. This can get confusing.


// TODO !!!! HERE In StateProvinceSelector figure out a way to load all the proper cities corresponding to the proper state and province.
// TODO !!! Add search engine security validation on inputs
// TODO !! Add, when typing a locality, the ability to 
// 1. Dynamicly display the options that match what is being typed
// 2. Select one from the dynamic list
// TODO When done locality filter, Implement same solution for the currency orders search engine

class MarketOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      page: 1,
      limit: 3, //Limit per page defined here!
      nextPage: 2,
      previousPage: undefined,
      on_off_limit_next: false,
      on_off_limit_previous: true,
      crypto: undefined,
      number_of_pages: 1,

      titleTerm: undefined,
      categoryTerm: undefined,
      conditionTerm: undefined,
      minPriceTerm: undefined,
      maxPriceTerm: undefined,
      chainTerm: undefined,
      countryTerm: undefined,
      stateProvinceTerm: undefined,
      cityTerm: undefined,
    }

    this.controls = this.controls.bind(this);
    this.submitFilter = this.submitFilter.bind(this)
    this.searchEngineOnChange = this.searchEngineOnChange.bind(this)
    this.resetPriceFilter = this.resetPriceFilter.bind(this)
    this.userId = userId
    this.popup = popup
    // console.log("---------->>>>>!!!", userId)
  }

  resetPriceFilter(){
    this.setState({
      minPriceTerm: undefined,
      maxPriceTerm: undefined,
    })
  }

  controls(_page) {
    this.setState({
      page: _page
    }, () => {
      const searchEngineState = {
        titleTerm: this.state.titleTerm,
        categoryTerm: this.state.categoryTerm,
        conditionTerm: this.state.conditionTerm,
        minPriceTerm: this.state.minPriceTerm,
        maxPriceTerm: this.state.maxPriceTerm,
        chainTerm: this.state.chainTerm,
        countryTerm: this.state.countryTerm,
        stateProvinceTerm: this.state.stateProvinceTerm,
        cityTerm: this.state.cityTerm,
      }
      let theUtilizedSearchQuery = this.setuptheSeachQuery(searchEngineState)
      this.loadData(theUtilizedSearchQuery)
    })
  }

  componentDidMount() {
    const searchEngineState = {
      titleTerm: this.state.titleTerm,
      categoryTerm: this.state.categoryTerm,
      conditionTerm: this.state.conditionTerm,
      minPriceTerm: this.state.minPriceTerm,
      maxPriceTerm: this.state.maxPriceTerm,
      chainTerm: this.state.chainTerm,
      countryTerm: this.state.countryTerm,
      stateProvinceTerm: this.state.stateProvinceTerm,
      cityTerm: this.state.cityTerm,
    }
    let theUtilizedSearchQuery = this.setuptheSeachQuery(searchEngineState)

    this.loadData(theUtilizedSearchQuery)
  }



  async loadData(theUtilizedSearchQuery = undefined) {

    console.log("MarketOrders: loadData()->theUtilizedSearchQuery:", theUtilizedSearchQuery)


    // console.log(`/marketplace/paginated-orders/sellordersdata?page=${this.state.page}&limit=${this.state.limit}${theUtilizedSearchQuery ? theUtilizedSearchQuery : ""}`)


    let response = await fetch(`/marketplace/paginated-orders/sellordersdata?page=${this.state.page}&limit=${this.state.limit}${theUtilizedSearchQuery ? theUtilizedSearchQuery : ""}`)

    let serverOBJ = await response.json()


    // console.log("MarketOrders: loadData()->response", response)

    if (response.ok) {

      // console.log("MarketOrders: loadData()->serverOBJ", serverOBJ)

      this.setState({
        orders: serverOBJ.srv_.ORDERS,
        nextPage: serverOBJ.srv_.next,
        previousPage: serverOBJ.srv_.previous,
        number_of_pages: serverOBJ.srv_.number_of_pages.number
      }, () => {
        if (this.state.nextPage == undefined) {
          this.setState({
            on_off_limit_next: true
          })
        } else {
          this.setState({
            on_off_limit_next: false
          })
        }
        if (this.state.previousPage == undefined) {
          this.setState({
            on_off_limit_previous: true
          })
        } else {
          this.setState({
            on_off_limit_previous: false
          })
        }
      })
      // Custom Errors get spitted out here
    } else {
      console.error("Error: ", serverOBJ)
    }

  }

  render() {
    const searchEngineState = {
      titleTerm: this.state.titleTerm,
      categoryTerm: this.state.categoryTerm,
      conditionTerm: this.state.conditionTerm,
      minPriceTerm: this.state.minPriceTerm,
      maxPriceTerm: this.state.maxPriceTerm,
      chainTerm: this.state.chainTerm,
      countryTerm: this.state.countryTerm,
      stateProvinceTerm: this.state.stateProvinceTerm,
      cityTerm: this.state.cityTerm,
    }

    return (
      <React.Fragment>
        <SearchEngine
          searchEngineState={searchEngineState}
          submitFilter={this.submitFilter}
          searchEngineOnChange={this.searchEngineOnChange}
          resetPriceFilter={this.resetPriceFilter}
          minPriceTerm={this.state.minPriceTerm}
          maxPriceTerm={this.state.maxPriceTerm}
        />

        <div id="market-order-table-wrapper" className='wrapper'>

          {this.popup ?
            <p>{this.popup}</p>
            : null}

          <MarketOrderTable
            selected_userID={this.userId}
            orders={this.state.orders}
            order_type="sellordersdata"
          />

          <PageSelector
            number_of_pages={this.state.number_of_pages}
            page={this.state.page}
            on_off_limit_previous={this.state.on_off_limit_previous}
            on_off_limit_next={this.state.on_off_limit_next}
            previousPage={this.state.previousPage}
            nextPage={this.state.nextPage}
            controls={this.controls}
          />
        </div>

      </React.Fragment>
    );
  }

  submitFilter(e = undefined) {
    e?.preventDefault()
    this.setState({
      page: 1
    }, () => {
      const searchEngineState = {
        titleTerm: this.state.titleTerm,
        categoryTerm: this.state.categoryTerm,
        conditionTerm: this.state.conditionTerm,
        minPriceTerm: this.state.minPriceTerm,
        maxPriceTerm: this.state.maxPriceTerm,
        chainTerm: this.state.chainTerm,
        countryTerm: this.state.countryTerm,
        stateProvinceTerm: this.state.stateProvinceTerm,
        cityTerm: this.state.cityTerm,
      }

      let theUtilizedSearchQuery = this.setuptheSeachQuery(searchEngineState)
      this.loadData(theUtilizedSearchQuery)
    })
  }


  searchEngineOnChange(e) {
    if (e.target.name == "country") {
      document.getElementById("my_form").elements["state-province"].value = ''
      document.getElementById("my_form").elements["city"].value = ''
    }
    if (e.target.name == "state-province") {
      document.getElementById("my_form").elements["city"].value = ''
    }

    
    let titleTerm_value = document.getElementById("my_form").elements["title"].value
    let categoryTerm_value = document.getElementById("my_form").elements["category"].value
    let conditionTerm_value = document.getElementById("my_form").elements["condition"].value
    let chainTerm_value = document.getElementById("my_form").elements["chain"].value

    let minPriceTerm_value = this.state.minPriceTerm
    let maxPriceTerm_value = this.state.maxPriceTerm

    let countryTerm_value = document.getElementById("my_form").elements["country"].value
    
    let stateProvinceTerm_value = document.getElementById("my_form").elements["state-province"].value
    let cityTerm_value = document.getElementById("my_form").elements["city"].value

    if (e.target.name == "min-price" || e.target.name == "max-price") {
      minPriceTerm_value = document.getElementById("my_form").elements["min-price"].value
      maxPriceTerm_value = document.getElementById("my_form").elements["max-price"].value
    }


 

    this.setState({
      titleTerm: titleTerm_value == '' ? undefined : titleTerm_value,
      categoryTerm: categoryTerm_value == '' ? undefined : categoryTerm_value,
      conditionTerm: conditionTerm_value == '' ? undefined : conditionTerm_value,
      chainTerm: chainTerm_value == '' ? undefined : chainTerm_value,
      minPriceTerm: minPriceTerm_value,
      maxPriceTerm: maxPriceTerm_value,
      countryTerm: countryTerm_value == '' ? undefined : countryTerm_value,
      stateProvinceTerm: stateProvinceTerm_value == '' ? undefined : stateProvinceTerm_value,
      cityTerm: cityTerm_value == '' ? undefined : cityTerm_value,
    })
  }



  setuptheSeachQuery(_searchEngineState) {

    for (const key in _searchEngineState) {
      if (Object.hasOwnProperty.call(_searchEngineState, key)) {
        const value = _searchEngineState[key];
        if (value == undefined) {
          delete _searchEngineState[key]
        }
      }
    }

    let _theUtilizedSearchQuery
    if (_searchEngineState
      && Object.keys(_searchEngineState).length === 0
      && Object.getPrototypeOf(_searchEngineState) === Object.prototype) {
      _theUtilizedSearchQuery = undefined
    } else {
      _theUtilizedSearchQuery = `&search=${JSON.stringify(_searchEngineState)}`
    }

    // console.log("CurrencyOrders: setuptheSeachQuery()-> setuptheSeachQuery: ", _theUtilizedSearchQuery)
    return _theUtilizedSearchQuery
  }


}

export default MarketOrders
