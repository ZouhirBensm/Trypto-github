import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import './styles/MyOrders.css'
import PageSelector from './AppDep/PageSelector';
import OrderTable from './AppDep/OrderTable';
import axios from 'axios';

class Matches extends Component {
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
    // const response = await fetch(`${process.env.ROOT}/api/matches/${_orderstype}?page=${this.state.page}&limit=${this.state.limit}`)
    // let data = await axios.get(`${process.env.ROOT}/api/matches/${_orderstype}?page=${this.state.page}&limit=${this.state.limit}`)
    let data = await axios.get(`${process.env.ROOT}/data/${_orderstype}?page=${this.state.page}&limit=${this.state.limit}`)
    .then(response => {
      return response.data
    })
    
    console.log("Data retrieved matches: ", data.data)
    this.setState({
      orders: data.data.results,
      nextPage: data.data.next,
      previousPage: data.data.previous,
      number_of_pages: data.data.number_of_pages.number
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
    }, () => {
      this.loadData(this.state.orderstype);
    })
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
        buttons='normal'
        />
      <PageSelector number_of_pages={this.state.number_of_pages} page={this.state.page} on_off_limit_previous={this.state.on_off_limit_previous} on_off_limit_next={this.state.on_off_limit_next} previousPage={this.state.previousPage} nextPage={this.state.nextPage} controls={this.controls}/>
      </div>
    )
  }
}

const element = <Matches />;

ReactDOM.render(element, document.getElementById('contents'));