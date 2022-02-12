import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../styles/BuyOrders.css'
import PageSelector from './PageSelector';

let objBuyOrders = {}

function repairData(_objBuyOrders){
  let _repairedData = []
  _repairedData = _objBuyOrders.data.results
  return _repairedData
}

class BuyOrders extends Component {
  constructor(){
    super()
    this.state = {
      buyorders: [],
      page: 1,
      limit: 3, //Limit per page defined here!
      nextPage: 2,
      previousPage: undefined,
      on_off_limit_next: false,
      on_off_limit_previous: true,
      crypto: '',
      searchTerm: '',
    }
    this.controls = this.controls.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  //HANDLE THE SUBMIT
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
        crypto: ''
      }, () => {
        this.loadData()
      })
    }
  }
  //HANDLE THE CHANGE IN SEARCH INPUT
  handleChange(e){
    //console.log(e.target.value)
    this.setState({
      //buyorders: this.props.buyorders,
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
    //this.controls(this.state.page)
  }


  async loadData(){

    //console.log("HERE LOAD: ", this.state.crypto)
    let response = await fetch(`${process.env.ROOT}/data/buyordersdata?page=${this.state.page}&limit=${this.state.limit}&crypto=${this.state.crypto}`)
    let data = await response.json()
    //console.log(data)
    //console.log("Next: ", data.data.next)
    //console.log("Previous: ", data.data.previous)
    objBuyOrders = repairData(data)
    // .then(response => response.json())
    // .then(data => {
    //   objBuyOrders = repairData(data)
    //   //console.log(objBuyOrders.data[0].crypto)
    // });
    this.setState({
      buyorders: objBuyOrders,
      nextPage: data.data.next,
      previousPage: data.data.previous,
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
    //console.log("HERE RENDER: ", this.state.crypto)
    return (
      <div className='wrapper'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Select a crypto you want to filter for
            <select value={this.state.searchTerm} onChange={this.handleChange}>
              <option value="All">All</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Litecoin">Litecoin</option>
              <option value="Zcash">Zcash</option>
              <option value="Bitcoin Cash">Bitcoin Cash</option>
              <option value="Monero">Monero</option>
            </select>
          </label>
          <input type="submit" value="Submit"/>
        </form>
        {/* <BuyOrdersFilter/> */}
        <BuyOrderTable buyorders={this.state.buyorders}/>
        <PageSelector page={this.state.page} on_off_limit_previous={this.state.on_off_limit_previous} on_off_limit_next={this.state.on_off_limit_next} previousPage={this.state.previousPage} nextPage={this.state.nextPage} controls={this.controls}/>
      </div>
    );
  }
}

export default BuyOrders



function BuyOrderTable(props){
  //console.log(typeof props.issues)
  const buyordersRow = props.buyorders.map(
    buyorder => {
      return <BuyOrderRow key={buyorder._id} buyorder={buyorder}/>
    }
  )
  return(
    <table className="bordered-table">
      {/* <thead>
        <tr>
          <th>Order _id</th>
          <th>Posted by</th>
          <th>Date Posted</th>
          <th>Crypto</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Expiry</th>
          <th>Payment</th>
          <th>Deal</th>
        </tr>
      </thead> */}
      <tbody>
        {buyordersRow}
      </tbody>
    </table>
  );
}

function BuyOrderRow(props) {
  const buyorder = props.buyorder;
  return(
    <tr>
      <td id="id1">{buyorder._id}</td>
      <td id="email1">{buyorder.userid.email} wants to buy</td>
      <td id="posteddate1">{'On: ' + buyorder.postedDate}</td>
      <td id="crypto1">{buyorder.crypto}</td>
      <td id="amount1">{'Amount: ' + buyorder.amount}</td>
      <td id="price1">{'Price: ' + buyorder.price}</td>
      <td id="expiry1">{'Exp.: ' + buyorder.expirydate}@{buyorder.expirytime}</td>
      <td id="payment1">{buyorder.payment}</td>
      <td id="deal1"><button>Sell to Him/Her</button></td>
      
    </tr>
  );
}
