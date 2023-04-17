import './style/market-main-component.css'
import './style/MarketOrders.css'

import NavigationNew from './NavigationNew'

import PageSelector from '../generic-components/PageSelector';
import MarketOrderTable from './market-order-list-components/MarketOrderTable';
import OnPageFooter from '../generic-components/OnPageFooter'

class MyMarketOrders extends React.Component {
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
      number_of_pages: 1,
    }
    this.controls = this.controls.bind(this);
    this.popup = popup
    console.log("this.props.userID_toQueryWith", this.props.userID_toQueryWith)
  }

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
    // console.log("loadData: _orderstype: ", _orderstype)

    console.log(`/marketplace/paginated-orders/sellordersdata/${this.props.userID_toQueryWith}?page=${this.state.page}&limit=${this.state.limit}`)

    const response2 = await fetch(`/marketplace/paginated-orders/sellordersdata/${this.props.userID_toQueryWith}?page=${this.state.page}&limit=${this.state.limit}`)


    console.log(response2)
    const serverOBJ = await response2.json()

    console.log("serverOBJ: ", serverOBJ)

    if (response2.ok) {
      this.setState({
        // userId: this.props.userID_toQueryWith,
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
    console.log("popup:", this.popup, paths_URL)
    return (
      <React.Fragment>

        <hr/>

        {paths_URL[0] == "operations"? null: paths_URL[0] == "marketplace" ? <NavigationNew
          order_type="allmyorders"
        /> : null}
        
        <div className='market-main-component'>

          <h1>My Posts</h1>

          {this.popup ?
            <p>{this.popup}</p>
            : null}

          <MarketOrderTable
            selected_userID={this.props.userID_toQueryWith}
            order_type="allmyorders"
            orders={this.state.orders}
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


          <OnPageFooter/>
        </div>
      </React.Fragment>


    );
  }
}

export default MyMarketOrders