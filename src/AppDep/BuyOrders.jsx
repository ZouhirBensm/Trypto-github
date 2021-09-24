import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../styles/BuyOrders.css'

let objBuyOrders = {}

function repairData(_objBuyOrders){
  let _repairedData = []
  _repairedData = _objBuyOrders.data
  return _repairedData
}

class BuyOrders extends Component {
  constructor(){
    super()
    this.state = {
      buyorders: []
    }
  }
  componentDidMount(){
    //DOM is ready
    this.loadData()
  }
  async loadData(){
    const response = await fetch('http://localhost:3000/data/buyordersdata')
    const data = await response.json()
    objBuyOrders = repairData(data)
    // .then(response => response.json())
    // .then(data => {
    //   objBuyOrders = repairData(data)
    //   //console.log(objBuyOrders.data[0].crypto)
    // });

    this.setState({
      buyorders: objBuyOrders
    })
    //console.log(typeof this.state.buyorders)
  }
  
  render() {
    return (
      
        <div className='wrapper'>
          {/* <BuyOrdersFilter/> */}
          <BuyOrderTable buyorders={this.state.buyorders}/>
        </div>
        
      
      
    );
  }
}

export default BuyOrders


class BuyOrdersFilter extends React.Component {
  
  render(){
    
    return(
      <div>
        This is a placeholder for the buy orders filter
      </div>
    )
  }
}

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
