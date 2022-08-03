// import React from 'react';
import './styles/Orders.css'
import OrderTable from './OrderTable';
import PageSelector from './PageSelector';
import SearchEngine from './SearchEngine';
// TODO Think of a way to merge Orders, with MyOrders instead of having 2 files

class Orders extends React.Component {
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
      searchTerm: '',
      number_of_pages: 1,
    }
    this.controls = this.controls.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.repairData = this.repairData.bind(this)
    
    console.log("constructor url param: ", this.props.match.params.order_type)
  }
  
  repairData(_objOrders){
    let _repairedData = []
    _repairedData = _objOrders.srv_.results
    return _repairedData
  }
  
  handleSubmit(e){
    e.preventDefault()
    this.setState({
      crypto: this.state.searchTerm,
      page: 1
    }, () => {
      this.loadData()
    })
    if(this.state.searchTerm == "All"){
      this.setState({
        crypto: undefined
      }, () => {
        this.loadData()
      })
    }
  }

  handleChange(e){
    //console.log(e.target.value)
    this.setState({
      //orders: this.props.orders,
      searchTerm: e.target.value
    })
  }

  controls(_page) {
    this.setState({
      page: _page
    }, () => {
      //console.log("callback: ", this.state.page)
      this.loadData()
    })
  }

  componentDidMount(){
    //DOM is ready
    this.loadData()
  }

  async loadData(){
    // let objOrders = {}
    // console.log("LOAD: ", this.props.match.params.order_type)
    // console.log("LOAD: ", this.props.orders)
    let response = await fetch(`${process.env.ROOT}/paginated-orders/${this.props.match.params.order_type}?page=${this.state.page}&limit=${this.state.limit}${this.state.crypto ? `&crypto=${this.state.crypto}`: "" }`)
    let serverOBJ = await response.json()
    console.log("serverOBJ: ", serverOBJ)
    //console.log("Next: ", data.data.next)
    //console.log("Previous: ", data.data.previous)

    // .then(response => response.json())
    // .then(data => {
    //   objOrders = repairData(data)
    //   //console.log(objOrders.data[0].crypto)
    // });
    // console.log(data.data.number_of_pages.number)
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
  
  render() {
    // console.log(this.props)
    console.log("Here orders!: ", this.state.orders)
    // console.log("here@@@", this.props.match.params.order_type)
    return (
      <React.Fragment>
        <SearchEngine 
        searchTerm={this.state.searchTerm} handleSubmit={this.handleSubmit} handleChange={this.handleChange}
        />
        <div className='wrapper'>
        <OrderTable 
        buttons='normal' 
        order_type={this.props.match.params.order_type} 
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
      </div>
      </React.Fragment>
    );
  }
}

export default Orders
