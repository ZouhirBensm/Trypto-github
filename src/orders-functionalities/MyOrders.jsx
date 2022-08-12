// import React from 'react';
import './styles/MyOrders.css'
import OrderTable from './OrderTable';
// import PageSelector from './PageSelector';
import PageSelector from '../generic-components/PageSelector';

class MyOrders extends React.Component {
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

    fetch(`${process.env.ROOT}/delete-this-order`, {
      method: 'DELETE',
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
    .then(OBJserv_ => {
      // console.log(OBJserv_)
      let elements_left_in_page = document.getElementsByTagName("tr")
      // console.log("Conditions", this.state.on_off_limit_next, elements_left_in_page.length === 1, this.state.number_of_pages != 1)

      //true, true, true
      if(this.state.on_off_limit_next && elements_left_in_page.length === 1 && this.state.number_of_pages != 1){
        // console.log("1")
        this.handleDelete(OBJserv_.memorized_order_type, true)
      } else {
        // console.log("2")
        this.handleDelete(OBJserv_.memorized_order_type)
      }
      // console.log("elements_left_in_page: ",  elements_left_in_page, elements_left_in_page.length)
      // console.log("bounds: ",  this.props.on_off_limit_previous, this.props.on_off_limit_next)
      // console.log(OBJserv_.memorized_order_type)
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
    // let _userID = ''
    // console.log(`${process.env.ROOT}/current-user-ID`)
    // const response1 = await fetch(`${process.env.ROOT}/current-user-ID`)    
    // const srv_ = await response1.json()
    // _userID = srv_.srv_usr_ID


    const _userID = document.getElementById("userId").innerHTML
    // console.log("did it work????", _userID, typeof _userID)

    const response2 = await fetch(`${process.env.ROOT}/paginated-orders/${_orderstype}/${_userID}?page=${this.state.page}&limit=${this.state.limit}`)
    //OR
    // .then(response2 => response2.json())
    // .then((data) => {
    //   console.log(data)
    // });
    
    const serverOBJ = await response2.json()

    this.setState({
      userId: _userID,
      orders: serverOBJ.srv_.ORDERS,
      nextPage: serverOBJ.srv_.next,
      previousPage: serverOBJ.srv_.previous,
      number_of_pages: serverOBJ.srv_.number_of_pages.number
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
    console.log("ordertype!!! ", this.state.orderstype)
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