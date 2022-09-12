// import React from 'react';
import './styles/MyOrders.css'
import OrderTable from './OrderTable';
// import PageSelector from './PageSelector';
import PageSelector from '../generic-components/PageSelector';

class MyOrders extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      // userId: '',
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
    this.controls = this.controls.bind(this);
    this.handleOrderTypeToogle = this.handleOrderTypeToogle.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleClick = this.handleClick.bind(this)

    // this.displayDeleteMsg = this.handleClick.bind(this)
    this.loadData_andDisplayDltMsg = this.loadData_andDisplayDltMsg.bind(this)
    this.loadData = this.loadData.bind(this)
    console.log("boom chakalaka", this.props.userID_toQueryWith)
  }

  displayDeleteMsg(){
    console.log("ARE WE GOOD!")
    const wrapper2 = document.getElementsByClassName("wrapper2")[0]
    console.log(wrapper2)

    let div = document.getElementById("popup");
    
    console.log(!!(div.innerHTML))
    if (!!(div.innerHTML)) {
      console.log("div is filled")
      div.innerHTML = "Deletion successful!"
    } else {
      console.log("div is empty")
      div.style.display = "block"
      div.innerHTML = "Deletion successful!"
      wrapper2.insertBefore(div, wrapper2.firstChild);
    }

  }

  async handleClick(valuetype, valueid, e){
    // console.log(e)
    let response = await fetch(`${process.env.ROOT}/delete-this-order`, {
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

    if(response.ok){
      let OBJserv_ = await response.json()
      let elements_left_in_page = document.getElementsByTagName("tr")
  
      if(this.state.on_off_limit_next && elements_left_in_page.length === 1 && this.state.number_of_pages != 1){
        this.handleDelete(OBJserv_.memorized_order_type, true)
      } else {
        this.handleDelete(OBJserv_.memorized_order_type)
      }
    } else {
      console.error("deletion failed!")
    }

  }

  async loadData_andDisplayDltMsg(){
    console.log("add the delete successful message!")
    this.displayDeleteMsg()
    this.loadData(this.state.orderstype);
  }

  handleDelete(value, _signal = false){
    console.log(_signal);

    let number
    (!_signal)? number = 0: number = 1

    this.setState({
      orderstype: value,
      page: this.state.page-number,
    }, this.loadData_andDisplayDltMsg)
  }

  controls(_page) {
    this.setState({
      page: _page
    }, () => {
      this.loadData(this.state.orderstype)
    })
  }

  componentDidMount(){
    //DOM is ready
    this.loadData(this.state.orderstype)
  }

  async loadData(_orderstype) {
    console.log("FUUCKK")
    // One way of getting userId
    // const _userID = document.getElementById("userId").innerHTML

    
    console.log(`${process.env.ROOT}/paginated-orders/${_orderstype}/${this.props.userID_toQueryWith}?page=${this.state.page}&limit=${this.state.limit}`)

    const response2 = await fetch(`${process.env.ROOT}/paginated-orders/${_orderstype}/${this.props.userID_toQueryWith}?page=${this.state.page}&limit=${this.state.limit}`)
    
    const serverOBJ = await response2.json()

    console.log("Do we get what is required from the backend??", serverOBJ)

    if(response2.ok){
      // TODO figure out if required to keep track of the userId as state on this component
      this.setState({
        // userId: this.props.userID_toQueryWith,
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

  handleOrderTypeToogle(e){
    //e.preventDefault()
    this.setState({
      orderstype: e.target.value,
      page: 1,
    }, () => {
      this.loadData(this.state.orderstype);
    })
  }
  
  render() {
    // console.log("ordertype!!! ", this.state.orderstype)
    return (
      <div className='wrapper2'>
        <form name="toogle">
          <label><input type="radio" id="Buy" name="radio" value='buyordersdata' defaultChecked onClick={this.handleOrderTypeToogle}/>Buy</label>
          <label><input type="radio" id="Sell" name="radio" value='sellordersdata' onClick={this.handleOrderTypeToogle}/>Sell</label>  
        </form>

        <OrderTable 
        selected_userID = {this.props.userID_toQueryWith}
        order_type={this.state.orderstype} 
        orders={this.state.orders}
        buttons='my'
        handleClick={this.handleClick}
        loadData={this.loadData}
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