import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../styles/SellOrders.css'
import PageSelector from './PageSelector';
import SearchEngine from './SearchEngine';

let objSellOrders = {}

function repairData(_objSellOrders){
  let _repairedData = []
  _repairedData = _objSellOrders.data.results
  return _repairedData
}

class SellOrders extends Component {
  constructor(){
    super()
    this.state = {
      sellorders: [],
      page: 1,
      limit: 3, //Limit per page defined here!
      nextPage: 2,
      previousPage: undefined,
      on_off_limit_next: false,
      on_off_limit_previous: true,
      crypto: '',
      searchTerm: '',
      number_of_pages: 1,
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
      this.loadData(this.state.page)
    })
  }

  componentDidMount(){
    //DOM is ready
    this.loadData()
  }
  async loadData(){
    let response = await fetch(`${process.env.ROOT}/data/sellordersdata?page=${this.state.page}&limit=${this.state.limit}&crypto=${this.state.crypto}`)
    let data = await response.json()
    objSellOrders = repairData(data)

    // .then(response => response.json())
    // .then(data => {
    //   objSellOrders = repairData(data)
    //   //console.log(objBuyOrders.data[0].crypto)
    // });

    this.setState({
      sellorders: objSellOrders,
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
    //console.log(typeof this.state.buyorders)
  }
  
  render() {
    return (
      <div className="wrapper">
        <SearchEngine searchTerm={this.state.searchTerm} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>

        {/* <form onSubmit={this.handleSubmit}>
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
        </form> */}

        {/* <SellOrdersFilter/> */}
        <SellOrderTable sellorders={this.state.sellorders}/>
        <PageSelector number_of_pages={this.state.number_of_pages} page={this.state.page} on_off_limit_previous={this.state.on_off_limit_previous} on_off_limit_next={this.state.on_off_limit_next} previousPage={this.state.previousPage} nextPage={this.state.nextPage} controls={this.controls}/>
      </div>
      
    );
  }
}

export default SellOrders


function SellOrderTable(props){
  //console.log(typeof props.issues)

  const sellordersRow = props.sellorders.map(
    sellorder => {
      return <SellOrderRow key={sellorder._id} sellorder={sellorder}/>
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
        {sellordersRow}
      </tbody>
    </table>
  );
}

function SellOrderRow(props) {
  const sellorder = props.sellorder;
  return(
    <tr>
      <td id="id2">{sellorder._id}</td>
      <td id="email2">{sellorder.userid.email} wants to sell</td>
      <td id="posteddate2">{'On: ' + sellorder.postedDate}</td>
      <td id="crypto2">{sellorder.crypto}</td>
      <td id="amountrange2">{'Amount Range: ' +  sellorder.minamount}-{sellorder.maxamount}</td>
      <td id="price2">{'Price: ' + sellorder.price}</td>
      <td id="expiry2">{'Exp.: ' + sellorder.expirydate}@{sellorder.expirytime}</td>
      <td id="payment2">{sellorder.payment}</td>
      <td id="deal2"><button>Buy from Him/Her</button></td>
    </tr>
  );
}


