import React, { Component } from 'react';
import './styles/MyOrders.css'
import PageSelector from './PageSelector';
import OrderTable from './OrderTable';

class MyOrders extends Component {
  constructor(){
    super()
    this.state = {
      userId: '',
      orderstype: 'buyordersdata',
      orders: [],
      page: 1,
      limit: 3, //Limit per page defined here!
      nextPage: 2,
      previousPage: undefined,
      on_off_limit_next: false,
      on_off_limit_previous: true,
      number_of_pages: 1,
      orderID_toToggle: undefined,
    }
    this.handleOrderTypeToogle = this.handleOrderTypeToogle.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.controls = this.controls.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(valuetype, valueid, e){
    // console.log("handleClick: ", valuetype, valueid)

    fetch(`${process.env.ROOT}/deleteThisOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        OrderType: valuetype,
        OrderID: valueid
      })
    })
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      let elements_left_in_page = document.getElementsByTagName("tr")
      // console.log("Conditions", this.state.on_off_limit_next, elements_left_in_page.length === 1, this.state.number_of_pages != 1)

      //true, true, true
      if(this.state.on_off_limit_next && elements_left_in_page.length === 1 && this.state.number_of_pages != 1){
        // console.log("1")
        this.handleDelete(result.memorized_order_type, true)
      } else {
        // console.log("2")
        this.handleDelete(result.memorized_order_type)
      }
      // console.log("elements_left_in_page: ",  elements_left_in_page, elements_left_in_page.length)
      // console.log("bounds: ",  this.props.on_off_limit_previous, this.props.on_off_limit_next)
      // console.log(result.memorized_order_type)
    })
  }

  handleDelete(value, _signal = false){
    //e.preventDefault()
    //console.log(e.target.value);
    console.log(_signal);

    if(!_signal){
      console.log("HERRRE1!!!")
      this.setState({
        orderstype: value,
        page: this.state.page,
      }, () => {
        this.loadData(this.state.orderstype);
      })
    } else {
      console.log("HERRRE2!!!")
      this.setState({
        orderstype: value,
        page: this.state.page-1,
      }, () => {
        this.loadData(this.state.orderstype);
      })
    }
  }

  controls(_page) {
    this.setState({
      page: _page
    }, () => {
      //console.log("callback: ", this.state.page)
      this.loadData(this.state.orderstype)
    })
  }

  componentDidMount(){
    //DOM is ready
    this.loadData(this.state.orderstype)
  }

  async loadData(_orderstype) {
    // console.log(_orderstype)
    let _userID = ''
    // console.log(`${process.env.ROOT}/databases/CurrentUserID`)
    const response1 = await fetch(`${process.env.ROOT}/databases/CurrentUserID`)    
    const data = await response1.json()
    //OR
    // .then(response1 => response1.json())
    // .then(data => {
    //   _userID = data.data
    // });

    _userID = data.data
    //console.log('This',_userID)

    const response2 = await fetch(`${process.env.ROOT}/data/${_orderstype}/${_userID}?page=${this.state.page}&limit=${this.state.limit}`)
    //OR
    // .then(response2 => response2.json())
    // .then((data) => {
    //   console.log(data)
    // });
    
    const data2 = await response2.json()

    this.setState({
      userId: _userID,
      orders: data2.data.results,
      nextPage: data2.data.next,
      previousPage: data2.data.previous,
      number_of_pages: data2.data.number_of_pages.number
    }, () => {
      // console.log("page: ", this.state.previousPage, this.state.nextPage)
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
      // let remainder = this.state.orders.length%this.state.limit
      // console.log("remainder",remainder)
    })
  }

  handleOrderTypeToogle(e){
    //e.preventDefault()
    //console.log(e.target.value);
    this.setState({
      orderstype: e.target.value,
      page: 1,
    }, () => {
      this.loadData(this.state.orderstype);
      // console.log("Ordertype on: ", this.state.orderstype)
    })
  }
  
  render() {
    return (
      <div className='wrapper2'>
        <form name="toogle">
          <label><input type="radio" id="Buy" name="radio" value='buyordersdata' defaultChecked onClick={this.handleOrderTypeToogle}/>Buy</label>
          <label><input type="radio" id="Sell" name="radio" value='sellordersdata' onClick={this.handleOrderTypeToogle}/>Sell</label>  
        </form>

        <OrderTable 
        order_type={this.state.orderstype} 
        orders={this.state.orders}
        buttons='my'
        handleClick={this.handleClick}
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
    );
  }
}

export default MyOrders