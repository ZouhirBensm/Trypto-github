// import './styles/MyOrders.css'
import '../orders-functionalities/styles/MyOrders.css'

// import OrderTable from './OrderTable';
// import OrderTable from '../orders-functionalities/OrderTable';
import OrderTable2 from './OrderTable2';

// import PageSelector from './PageSelector';
import PageSelector from '../generic-components/PageSelector';
// import axios from 'axios';

class Matches2 extends React.Component {
  constructor(){
    super()
    this.state = {
      orders: [],
      orderstype: 'sellordersdata',
      page: 1,
      limit: 1, //Limit per page defined here!
      nextPage: 2,
      previousPage: undefined,
      on_off_limit_next: false,
      on_off_limit_previous: true,
      number_of_pages: 1,
    }
    this.userId = userId
    console.log("--------->>>>:::::", userId)

    this.controls = this.controls.bind(this);
    this.handleToogleFound = this.handleToogleFound.bind(this)
  }

  controls(_page) {
    this.setState({
      page: _page
    }, () => {
      this.loadData(this.state.orderstype)
    })
  }
  
  componentDidMount(){
    this.loadData(this.state.orderstype)
  }

  
  async loadData(_orderstype){
    
    console.log(`/marketplace/paginated-orders/${_orderstype}/${this.userId}?page=${this.state.page}&limit=${this.state.limit}`)

    
    let response = await fetch(`/marketplace/paginated-orders/${_orderstype}/${this.userId}?page=${this.state.page}&limit=${this.state.limit}`)
    

    let serverOBJ = await response.json()
    console.log(response, serverOBJ)

    if(response.ok){
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


  // TODO not sure this is required or not
  // componentDidUpdate(prevProps, prevState) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.state.orderstype !== prevState.orderstype) {
  //     this.loadData(this.state.orderstype);
  //   }
  // }



  handleToogleFound(e){
    this.setState({
      orderstype: e.target.value,
      page: 1,
    }, () => {
      this.loadData(this.state.orderstype);
    })
  }

  render() {
    console.log("orders====> ", this.state.orders)
    return (
      <div className="wrapper2">

        <form name="toogle">
          <label><input type="radio" id="matchesbuy" name="radio" value='sellordersdata' defaultChecked onClick={this.handleToogleFound}/>Sell orders that match my buys</label>
          <label><input type="radio" id="matchessell" name="radio" value='buyordersdata' onClick={this.handleToogleFound}/>Buy orders that match my sells</label> 
        </form>


        <OrderTable2
        selected_userID = {this.userId}
        orders={this.state.orders}
        order_type={this.state.orderstype} 
        // buttons='normal'
        // loadData={this.loadData}
        /> 

        <PageSelector 
        number_of_pages={this.state.number_of_pages} 
        page={this.state.page} 
        on_off_limit_previous={this.state.on_off_limit_previous} 
        on_off_limit_next={this.state.on_off_limit_next} 
        previousPage={this.state.previousPage} 
        nextPage={this.state.nextPage} 
        controls={this.controls}/> 

      </div>
    )
  }
}

// const element = <Matches />;

// ReactDOM.render(element, document.getElementById('react-div'));

export default Matches2