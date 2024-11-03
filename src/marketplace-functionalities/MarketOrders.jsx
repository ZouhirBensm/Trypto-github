import "./style/market-main-component.css";
import "./style/MarketOrders.css";

import NavigationNew from "./NavigationNew";
import SearchEngine from "./market-order-list-components/SearchEngine";
import MarketOrderTable from "./market-order-list-components/MarketOrderTable";
import PageSelector from "../generic-components/PageSelector";
import OnPageFooter from "../generic-components/OnPageFooter";

// TODO !!!! Need to add refs to search elements when possible

class MarketOrders extends React.Component {
  constructor(props) {
    super(props);

    const queryParams = new URLSearchParams(window.location.search);
    const search = queryParams.get("s"); 
    const category = queryParams.get("cat"); 

    this.state = {
      orders: [],
      page: 1,
      limit: 3,
      nextPage: 2,
      previousPage: undefined,
      on_off_limit_next: false,
      on_off_limit_previous: true,
      crypto: undefined,
      number_of_pages: 1,

      titleTerm: search,
      categoryTerm: category,
      subcategoryTerm: undefined,
      conditionTerm: undefined,
      minPriceTerm: undefined,
      maxPriceTerm: undefined,
      chainTerm: undefined,
      countryTerm: undefined,
      stateProvinceTerm: undefined,
      cityTerm: undefined,
    };

    this.controls = this.controls.bind(this);
    this.state4QueryOnMarketOrders = this.state4QueryOnMarketOrders.bind(this);

    this.submitFilter = this.submitFilter.bind(this);

    this.resetPriceFilter = this.resetPriceFilter.bind(this);
    this.userId = userId;
    this.popup = popup;
    // console.log("userId---------->>>>>", userId)
  }

  resetPriceFilter() {
    this.setState({
      minPriceTerm: undefined,
      maxPriceTerm: undefined,
    });
  }

  controls(_page) {
    this.setState(
      {
        page: _page,
      },
      () => {
        const searchEngineState = {
          titleTerm: this.state.titleTerm,
          categoryTerm: this.state.categoryTerm,
          subcategoryTerm: this.state.subcategoryTerm,
          conditionTerm: this.state.conditionTerm,
          minPriceTerm: this.state.minPriceTerm,
          maxPriceTerm: this.state.maxPriceTerm,
          chainTerm: this.state.chainTerm,
          countryTerm: this.state.countryTerm,
          stateProvinceTerm: this.state.stateProvinceTerm,
          cityTerm: this.state.cityTerm,
        };
        let theUtilizedSearchQuery = this.setuptheSeachQuery(searchEngineState);
        this.loadData(theUtilizedSearchQuery);
      }
    );
  }

  componentDidMount() {
    const searchEngineState = {
      titleTerm: this.state.titleTerm,
      categoryTerm: this.state.categoryTerm,
      subcategoryTerm: this.state.subcategoryTerm,
      conditionTerm: this.state.conditionTerm,
      minPriceTerm: this.state.minPriceTerm,
      maxPriceTerm: this.state.maxPriceTerm,
      chainTerm: this.state.chainTerm,
      countryTerm: this.state.countryTerm,
      stateProvinceTerm: this.state.stateProvinceTerm,
      cityTerm: this.state.cityTerm,
    };

    console.log(searchEngineState);
    let theUtilizedSearchQuery = this.setuptheSeachQuery(searchEngineState);

    this.loadData(theUtilizedSearchQuery);
  }

  async loadData(theUtilizedSearchQuery = undefined) {
    let response = await fetch(
      `/marketplace/paginated-orders/sellordersdata?page=${
        this.state.page
      }&limit=${this.state.limit}${
        theUtilizedSearchQuery ? theUtilizedSearchQuery : ""
      }`
    );

    let serverOBJ = await response.json();
    this.setState(
      {
        orders: serverOBJ.srv_.ORDERS,
        nextPage: serverOBJ.srv_.next,
        previousPage: serverOBJ.srv_.previous,
        number_of_pages: serverOBJ.srv_.number_of_pages.number,
      },
      () => {
        if (this.state.nextPage == undefined) {
          this.setState({
            on_off_limit_next: true,
          });
        } else {
          this.setState({
            on_off_limit_next: false,
          });
        }
        if (this.state.previousPage == undefined) {
          this.setState({
            on_off_limit_previous: true,
          });
        } else {
          this.setState({
            on_off_limit_previous: false,
          });
        }
      }
    );
  }

  render() {
    const searchEngineState = {
      titleTerm: this.state.titleTerm,
      categoryTerm: this.state.categoryTerm,
      subcategoryTerm: this.state.subcategoryTerm,
      conditionTerm: this.state.conditionTerm,
      minPriceTerm: this.state.minPriceTerm,
      maxPriceTerm: this.state.maxPriceTerm,
      chainTerm: this.state.chainTerm,
      countryTerm: this.state.countryTerm,
      stateProvinceTerm: this.state.stateProvinceTerm,
      cityTerm: this.state.cityTerm,
    };

    return (
      <React.Fragment>
        {/* <NavigationNew
          order_type="sellordersdata"
        /> */}

        <div className="container d-flex justify-content-between pt-5 mt-5">
          <div className="w-100 row">
            <div className="col-3">
              <SearchEngine
                searchEngineState={searchEngineState}
                submitFilter={this.submitFilter}
                state4QueryOnMarketOrders={this.state4QueryOnMarketOrders}
                resetPriceFilter={this.resetPriceFilter}
                minPriceTerm={this.state.minPriceTerm}
                maxPriceTerm={this.state.maxPriceTerm}
              />
            </div>
            <div className="col-9 pl-5">
              <h1 className="pl-3">Articles</h1>
              <hr className="w-100" />

              {this.popup ? <span className="popup">{this.popup}</span> : null}

              <MarketOrderTable
                // selected_userID={this.userId}
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
          </div>
        </div>
        <OnPageFooter />
      </React.Fragment>
    );
  }

  submitFilter(e = undefined) {
    e?.preventDefault();

    this.setState(
      {
        page: 1,
      },
      () => {
        const searchEngineState = {
          titleTerm: this.state.titleTerm,
          categoryTerm: this.state.categoryTerm,
          subcategoryTerm: this.state.subcategoryTerm,
          conditionTerm: this.state.conditionTerm,
          minPriceTerm: this.state.minPriceTerm,
          maxPriceTerm: this.state.maxPriceTerm,
          chainTerm: this.state.chainTerm,
          countryTerm: this.state.countryTerm,
          stateProvinceTerm: this.state.stateProvinceTerm,
          cityTerm: this.state.cityTerm,
        };

        let theUtilizedSearchQuery = this.setuptheSeachQuery(searchEngineState);

        this.loadData(theUtilizedSearchQuery);
        return;
      }
    );
  }

  state4QueryOnMarketOrders(newStateQueryTerms) {
    this.setState(newStateQueryTerms);
  }

  setuptheSeachQuery(_searchEngineState) {
    for (const key in _searchEngineState) {
      if (Object.hasOwnProperty.call(_searchEngineState, key)) {
        const value = _searchEngineState[key];
        if (value == undefined) {
          delete _searchEngineState[key];
        }
      }
    }

    let _theUtilizedSearchQuery;
    if (
      _searchEngineState &&
      Object.keys(_searchEngineState).length === 0 &&
      Object.getPrototypeOf(_searchEngineState) === Object.prototype
    ) {
      _theUtilizedSearchQuery = undefined;
    } else {
      _theUtilizedSearchQuery = `&search=${JSON.stringify(_searchEngineState)}`;
    }

    return _theUtilizedSearchQuery;
  }
}

export default MarketOrders;

// TODO #102 Add touch event to slide search engine

// TODO !!! Add, when typing a locality, the ability to
// 1. Dynamicly display the options that match what is being typed
// 2. Select one from the dynamic list
