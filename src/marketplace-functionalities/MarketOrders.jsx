
import '../style/reactDivMobile.css'
import MarketOrderTable from './MarketOrderTable';

// import PageSelector from '../generic-components/PageSelector';
import PageSelector from '../generic-components/PageSelector';
// import SearchEngine from './SearchEngine';
// import SearchEngine from '../btclayerexchange-functionalities/SearchEngine';

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
      // searchTerm: '',
      number_of_pages: 1,
    }
    this.controls = this.controls.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleChange = this.handleChange.bind(this)
    this.userId = userId
    this.popup = popup

    console.log("---------->>>>>!!!", userId)
  }


  // TODO NEEDED for Search engine
  // handleSubmit(e){
  //   e.preventDefault()
  //   this.setState({
  //     crypto: this.state.searchTerm,
  //     page: 1
  //   }, () => {
  //     this.loadData()
  //   })


  //   console.log("this.state.searchTerm", this.state.searchTerm)

  //   if(this.state.searchTerm == "All"){
  //     this.setState({
  //       crypto: undefined
  //     }, () => {
  //       this.loadData()
  //     })
  //   }
  // }

  // TODO NEEDED for Search engine
  // handleChange(e){
  //   this.setState({
  //     searchTerm: e.target.value
  //   })
  // }


  // TODO ! email confirmation process to implement (real email check)
  // TODO ! implement input sanitization in all fields (<>;{})
  // TODO ! implement rate on inputs to avoid getting spammed from bots

  controls(_page) {
    this.setState({
      page: _page
    }, () => {
      this.loadData()
    })
  }

  componentDidMount() {
    //DOM is ready
    this.loadData()
  }

  async loadData() {
    // let response = await fetch(`/paginated-orders/${this.props.match.params.order_type}?page=${this.state.page}&limit=${this.state.limit}${this.state.crypto ? `&crypto=${this.state.crypto}`: "" }`)

    let response = await fetch(`/marketplace/paginated-orders/sellordersdata?page=${this.state.page}&limit=${this.state.limit}`)

    let serverOBJ = await response.json()


    console.log(response, serverOBJ)

    if (response.ok) {

      console.log("serverOBJ: ", serverOBJ)

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
    console.log("popup:", this.popup)
    console.log("Here orders!: ", this.state.orders)
    return (
      <React.Fragment>
        {/* TODO #102 Add touch event to slide search engine */}
        {/* TODO ! return the search engine, and add search engine validation on inputs */}
        {/* <SearchEngine 
        searchTerm={this.state.searchTerm} handleSubmit={this.handleSubmit} handleChange={this.handleChange}
        /> */}




        <div className='wrapper'>
          {this.popup ?
            <p>{this.popup}</p>
            : null}

          <MarketOrderTable
            selected_userID={this.userId}
            orders={this.state.orders}
            order_type="sellordersdata"
          // loadData={this.loadData}
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
}

export default MarketOrders
