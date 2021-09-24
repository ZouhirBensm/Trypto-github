import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../styles/SellOrders.css'

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
      <div className="wrapper">
        {/* <SellOrdersFilter/> */}
        <SellOrderTable sellorders={this.state.sellorders}/>
      </div>
      
    );
  }
}

export default SellOrders


class SellOrdersFilter extends React.Component {
  
  render(){
    
    return(
      <div>
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


