// import React from 'react';
import './styles/CurrencyOrders.css'
import CurrencyOrderTable from './CurrencyOrderTable';
// import PageSelector from './PageSelector';
import PageSelector from '../generic-components/PageSelector';
import SearchEngine from './SearchEngine';

class CurrencyOrders extends React.Component {
  constructor(props){
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
      // searchTerm: '',
      searchEngineState: {
        chainTerm: undefined,
      },
      number_of_pages: 1,
    }
    this.controls = this.controls.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.userId = document.getElementById("userId").innerHTML
    this.userId = userId
    // this.repairData = this.repairData.bind(this)
    
    console.log("order_type------->>>>", this.props.match.params.order_type)
  }
  
  // repairData(_objOrders){
  //   let _repairedData = []
  //   _repairedData = _objOrders.srv_.results
  //   return _repairedData
  // }
  
  

  controls(_page) {
    this.setState({
      page: _page
    }, () => {
      this.loadData()
    })
  }

  componentDidMount(){
    //DOM is ready
    this.loadData()
  }

  async loadData(){
    // `${this.state.crypto ? `&crypto=${this.state.crypto}`: "" }`

    let theUtilizedSearchQuery = this.setuptheSeachQuery(this.state.searchEngineState)
    console.log("theUtilizedSearchQuery:", theUtilizedSearchQuery)


    console.log(`/paginated-orders/${this.props.match.params.order_type}?page=${this.state.page}&limit=${this.state.limit}${theUtilizedSearchQuery ? theUtilizedSearchQuery : "" }`)


    let response = await fetch(`/paginated-orders/${this.props.match.params.order_type}?page=${this.state.page}&limit=${this.state.limit}${theUtilizedSearchQuery ? theUtilizedSearchQuery : "" }`)

    let serverOBJ = await response.json()

    console.log(response)

    if(response.ok){

      // console.log("serverOBJ: ", serverOBJ)

      this.setState({
        orders: serverOBJ.srv_.ORDERS,
        nextPage: serverOBJ.srv_.next,
        previousPage: serverOBJ.srv_.previous,
        number_of_pages: serverOBJ.srv_.number_of_pages.number
      }, () => {
        if(this.state.nextPage==undefined){
          this.setState({
            on_off_limit_next: true
          })
        } else {
          this.setState({
            on_off_limit_next: false
          })
        }
        if(this.state.previousPage==undefined){
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
    // console.log("Here orders!: ", this.state.orders)
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
        selected_userID = {this.userId}
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



  handleChange(e){
    console.log("The form is changing....")

    // console.log(e.target.value)

    let chainTerm_value = document.getElementById("my_form").elements["chain"].value
    // console.log({chainTerm_value})


    this.setState({
      searchEngineState: {
        chainTerm: chainTerm_value == '' ? undefined : chainTerm_value
      }
    })
  }


  handleSubmit(e = undefined){
    e?.preventDefault()

    console.log("submission...")

    this.setState({
      page: 1
    }, () => {
      this.loadData()
    })



  }



  setuptheSeachQuery(_searchEngineState){
    console.log("------------->>>> IN setuptheSeachQuery:::", _searchEngineState)
    // let searchObjectFilteredFromUndefined = {}

    for (const key in _searchEngineState) {
      // console.log("key", key)
      if (Object.hasOwnProperty.call(_searchEngineState, key)) {
        const value = _searchEngineState[key];
        if (value==undefined){
          delete _searchEngineState[key]
        }
      }
    }

    console.log("------------->>>> IN setuptheSeachQuery:::", _searchEngineState)

    let _theUtilizedSearchQuery

    if (_searchEngineState
    && Object.keys(_searchEngineState).length === 0
    && Object.getPrototypeOf(_searchEngineState) === Object.prototype) {
      _theUtilizedSearchQuery = undefined
    } else {
      _theUtilizedSearchQuery = `&search=${JSON.stringify(_searchEngineState)}`
    }

    console.log(_theUtilizedSearchQuery)
    return _theUtilizedSearchQuery
  }


}

export default CurrencyOrders
