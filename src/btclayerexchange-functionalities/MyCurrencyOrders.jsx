import './styles/MyCurrencyOrders.css'
import CurrencyOrderTable from './CurrencyOrderTable';
import PageSelector from '../generic-components/PageSelector';

class MyCurrencyOrders extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      orderstype: 'buyordersdata',
      orders: [],
      page: 1,
      limit: 3,
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
    this.loadData_andDisplayDltMsg = this.loadData_andDisplayDltMsg.bind(this)
    this.loadData = this.loadData.bind(this)

    // console.log("MyCurrencyOrders: constructor()->this.props.userID_toQueryWith", this.props.userID_toQueryWith)
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

  async loadData(_orderstype) {
    const response2 = await fetch(`/currency/paginated-orders/${_orderstype}/${this.props.userID_toQueryWith}?page=${this.state.page}&limit=${this.state.limit}`)
    
    const serverOBJ = await response2.json()

    if(response2.ok){
      this.setState({
        orders: serverOBJ.srv_.ORDERS,
        nextPage: serverOBJ.srv_.next,
        previousPage: serverOBJ.srv_.previous,
        number_of_pages: serverOBJ.srv_.number_of_pages.number
      }, () => {
        if(this.state.nextPage == undefined){
          this.setState({
            on_off_limit_next: true
          })
        } else {
          this.setState({
            on_off_limit_next: false
          })
        }
        if(this.state.previousPage == undefined){
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
    console.log("MyCurrencyOrders: render()->this.state.orderstype", this.state.orderstype)

    return (
      <div className='wrapper2'>
        <form name="toogle">
          <label><input type="radio" id="Buy" name="radio" value='buyordersdata' defaultChecked onClick={this.handleOrderTypeToogle}/>Buy</label>
          <label><input type="radio" id="Sell" name="radio" value='sellordersdata' onClick={this.handleOrderTypeToogle}/>Sell</label>  
        </form>

        <CurrencyOrderTable 
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

  displayDeleteMsg(){
    const wrapper2 = document.getElementsByClassName("wrapper2")[0]
    let div = document.getElementById("popup");
    console.log(!!(div.innerHTML))
    if (!!(div.innerHTML)) {
      div.innerHTML = "Deletion successful!"
    } else {
      div.style.display = "block"
      div.innerHTML = "Deletion successful!"
      wrapper2.insertBefore(div, wrapper2.firstChild);
    }
  }


  async handleClick(valuetype, valueid, e){
    let response = await fetch(`/currency/delete-this-order`, {
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
      console.error("Deletion failed!")
    }
  }

  async loadData_andDisplayDltMsg(){
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

  handleOrderTypeToogle(e){
    this.setState({
      orderstype: e.target.value,
      page: 1,
    }, () => {
      this.loadData(this.state.orderstype);
      let div = document.getElementById("popup");
      div.innerHTML = ''
    })
  }

}

export default MyCurrencyOrders