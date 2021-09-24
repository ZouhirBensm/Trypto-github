import React, { Component } from 'react';
import '../styles/MatcheRow.css'



class MatcheRow extends Component {




  render() {
    //const order = this.props.order;
    //console.log('here', order)
    return (
      <React.Fragment>
        <tr className="form2">
          
          <td id="id5">{'Order ID: ' + this.props.order._id}</td>
          <td id="email5">{'Email: ' + this.props.order.userid.email}</td>
          <td id="posteddate5">{'On: ' + this.props.order.postedDate}</td>
          <td id="crypto5">{this.props.order.crypto}</td>
          <td id="amount5">{this.props.order.amount ? 'Amount: ' + this.props.order.amount : ''}</td>
          <td id="amountrange5">{this.props.order.minamount ? 'Amount Range: '+this.props.order.minamount+'-' : ''}{this.props.order.maxamount ? this.props.order.maxamount : ''}</td>
          <td id="price5">{'Price: '+this.props.order.price}</td>      
          <td id="expiry5">{'Exp.: '+this.props.order.expirydate}@{this.props.order.expirytime}</td>
          <td id="payment5">{this.props.order.payment}</td>
        </tr>
        
      </React.Fragment>
    );
  }
}

export default MatcheRow