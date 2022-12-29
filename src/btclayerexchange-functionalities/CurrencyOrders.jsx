import './styles/CurrencyOrders.css'
import CurrencyOrderTable from './CurrencyOrderTable';
// import PageSelector from './PageSelector';
import PageSelector from '../generic-components/PageSelector';
import SearchEngine from './SearchEngine';

class CurrencyOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      page: 1,
      limit: 3,
      nextPage: 2,
      previousPage: undefined,
      on_off_limit_next: false,
      on_off_limit_previous: true,
      crypto: undefined,
      searchEngineState: {
        chainTerm: undefined,
      },
      number_of_pages: 1,
    }
    this.controls = this.controls.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.userId = userId

    console.log("CurrencyOrders: constructor()->this.props.match.params.order_type, userId", this.props.match.params.order_type, userId)
  }



  controls(_page) {
    this.setState({
      page: _page
    }, () => {
      this.loadData()
    })
  }

  componentDidMount() {
    this.loadData()
  }

  async loadData() {
    let theUtilizedSearchQuery = this.setuptheSeachQuery(this.state.searchEngineState)

    console.log("CurrencyOrders: loadData()->theUtilizedSearchQuery:", theUtilizedSearchQuery)


    console.log(`/currency/paginated-orders/${this.props.match.params.order_type}?page=${this.state.page}&limit=${this.state.limit}${theUtilizedSearchQuery ? theUtilizedSearchQuery : ""}`)


    let response = await fetch(`/currency/paginated-orders/${this.props.match.params.order_type}?page=${this.state.page}&limit=${this.state.limit}${theUtilizedSearchQuery ? theUtilizedSearchQuery : ""}`)

    let serverOBJ = await response.json()

    console.log(response)

    if (response.ok) {

      console.log("CurrencyOrders: loadData()->serverOBJ: ", serverOBJ)

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
    } else {
      console.error("Error: ", serverOBJ)
    }

  }

  render() {
    return (
      <React.Fragment>
        {/* TODO #102 Add touch event to slide search engine */}

        <SearchEngine
          searchEngineState={this.state.searchEngineState}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          order_type={this.props.match.params.order_type}
        />

        <div className='wrapper'>
          <CurrencyOrderTable
            selected_userID={this.userId}
            buttons='normal'
            order_type={this.props.match.params.order_type}
            orders={this.state.orders}
            loadData={this.loadData}
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



  handleChange(e) {
    console.log("CurrencyOrders: handleChange()->The form is changing....")

    let chainTerm_value = document.getElementById("my_form").elements["chain"].value

    this.setState({
      searchEngineState: {
        chainTerm: chainTerm_value == '' ? undefined : chainTerm_value
      }
    })
  }


  handleSubmit(e = undefined) {
    e?.preventDefault()
    this.setState({
      page: 1
    }, () => {
      this.loadData()
    })
  }



  setuptheSeachQuery(_searchEngineState) {
    console.log("CurrencyOrders: setuptheSeachQuery()-->_searchEngineState:", _searchEngineState)

    // let searchObjectFilteredFromUndefined = {}
    for (const key in _searchEngineState) {
      // console.log("key", key)
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

    console.log("CurrencyOrders: setuptheSeachQuery()-> setuptheSeachQuery: ", _theUtilizedSearchQuery)
    return _theUtilizedSearchQuery
  }


}

export default CurrencyOrders
