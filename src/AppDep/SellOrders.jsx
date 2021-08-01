import React, { Component } from 'react';
import ReactDOM from 'react-dom'
let objSellOrders = {}

function repairData(_objSellOrders){
  let _repairedData = []
  _repairedData = _objSellOrders.data
  return _repairedData
}

class SellOrders extends Component {
  constructor(){
    super()
    this.state = {
      sellorders: []
    }
  }
  componentDidMount(){
    //DOM is ready
    this.loadData()
  }
  async loadData(){
    const response = await fetch('http://localhost:3000/data/sellordersdata')
    const data = await response.json()
    objSellOrders = repairData(data)

    // .then(response => response.json())
    // .then(data => {
    //   objSellOrders = repairData(data)
    //   //console.log(objBuyOrders.data[0].crypto)
    // });

    this.setState({
      sellorders: objSellOrders
    })
    //console.log(typeof this.state.buyorders)
  }
  
  render() {
    return (
      <React.Fragment>
        <SellOrdersFilter/>
        <hr/>
        <SellOrderTable sellorders={this.state.sellorders}/>
        <hr/>
      </React.Fragment>
      
    );
  }
}

export default SellOrders


class SellOrdersFilter extends React.Component {
  
  render(){
    
    return(
      <div>
        <hr />
        This is a placeholder for the sell orders filter
      </div>
    )
  }
}

function SellOrderTable(props){
  //console.log(typeof props.issues)

  const sellordersRow = props.sellorders.map(
    sellorder => {
      return <SellOrderRow key={sellorder._id} sellorder={sellorder}/>
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
          <th>Min Amount</th>
          <th>Max Amount</th>
          <th>Price</th>
          <th>Expiry date</th>
          <th>Expiry time</th>
          <th>Payment</th>
        </tr>
      </thead>
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
      <td>{sellorder._id}</td>
      <td>{sellorder.userid.email}</td>
      <td>{sellorder.postedDate}</td>
      <td>{sellorder.crypto}</td>
      <td>{sellorder.minamount}</td>
      <td>{sellorder.maxamount}</td>
      <td>{sellorder.price}</td>
      <td>{sellorder.expirydate}</td>
      <td>{sellorder.expirytime}</td>
      <td>{sellorder.payment}</td>
    </tr>
  );
}
