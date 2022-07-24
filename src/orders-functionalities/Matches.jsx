// import React from 'react';
// import ReactDOM from 'react-dom'
import './styles/MyOrders.css'
import OrderTable from './OrderTable';
import PageSelector from './PageSelector';
// import axios from 'axios';

class Matches extends React.Component {
  constructor(){
    super()
    this.state = {
      orders: [],
      orderstype: 'sellordersdata',
      page: 1,
      limit: 2, //Limit per page defined here!
      nextPage: 2,
      previousPage: undefined,
      on_off_limit_next: false,
      on_off_limit_previous: true,
      number_of_pages: 1,
    }
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
    let serverOBJ = await fetch(`${process.env.ROOT}/paginated-orders/${_orderstype}?page=${this.state.page}&limit=${this.state.limit}`, {
      method: 'GET'
    })
    .then(response => {
      // console.log("response: ", response, "\n\n")
      return response.json()
    })
    .then(response => {
      console.log("response: ", response, "\n\n")
      return response
    })
    .catch((err)=>console.log(err))

    // let serverOBJ = await axios.get(`${process.env.ROOT}/paginated-orders/${_orderstype}?page=${this.state.page}&limit=${this.state.limit}`)
    // .then(response => {
    //   console.log("response: ", response, "\n\n")
    //   return response.data
    // })
    // .catch((err)=>console.log(err))
    
    console.log("Data retrieved matches: ", serverOBJ.srv_)
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

    
  }
  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.state.orderstype !== prevState.orderstype) {
      this.loadData(this.state.orderstype);
    }
  }

  handleToogleFound(e){
    this.setState({
      orderstype: e.target.value,
      page: 1,
    }
    )
  }

  render() {
    console.log("operating under: ", this.state.orderstype)


    return (
      <div className="wrapper2">
        <form name="toogle">
          <label><input type="radio" id="matchesbuy" name="radio" value='sellordersdata' defaultChecked onClick={this.handleToogleFound}/>Sell orders that match my buys</label>
          <label><input type="radio" id="matchessell" name="radio" value='buyordersdata' onClick={this.handleToogleFound}/>Buy orders that match my sells</label> 
        </form>

        <OrderTable 
        order_type={this.state.orderstype} 
        orders={this.state.orders}
        buttons='normal'/>

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

export default Matches