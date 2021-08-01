import React, { Component } from 'react';
import ReactDOM from 'react-dom'
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
      <React.Fragment>
        <BuyOrdersFilter/>
        <hr/>
        <BuyOrderTable buyorders={this.state.buyorders}/>
        <hr/>
      </React.Fragment>
      
    );
  }
}

export default BuyOrders


class BuyOrdersFilter extends React.Component {
  
  render(){
    
    return(
      <div>
        <hr />
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
      <thead>
        <tr>
          <th>Order _id</th>
          <th>Posted by</th>
          <th>Date Posted</th>
          <th>Crypto</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Expiry date</th>
          <th>Expiry time</th>
          <th>Payment</th>
        </tr>
      </thead>
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
      <td>{buyorder._id}</td>
      <td>{buyorder.userid.email}</td>
      <td>{buyorder.postedDate}</td>
      <td>{buyorder.crypto}</td>
      <td>{buyorder.amount}</td>
      <td>{buyorder.price}</td>
      <td>{buyorder.expirydate}</td>
      <td>{buyorder.expirytime}</td>
      <td>{buyorder.payment}</td>
      
    </tr>
  );
}
