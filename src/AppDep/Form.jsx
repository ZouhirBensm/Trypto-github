import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import '../styles/Form.css'



class Form extends Component {
 

  render() {

    return (
      <tr className="form">
        <td id="id3">{this.props.orderid}</td>
        <td id="email3">{this.props.email}</td>
        <td id="posteddate3">{'On: ' + this.props.postedDate}</td>
        <td id="crypto3">{this.props.crypto}</td>
 
        <td id="amount3">{this.props.amount ? 'Amount: ' + this.props.amount : ''}</td>

        <td id="amountrange3">{this.props.minamount ? 'Amount Range: '+this.props.minamount+'-' : ''}{this.props.maxamount ? this.props.maxamount : ''}</td>
 

 
        <td id="price3">{'Price: '+this.props.price}</td>
        <td id="expiry3">{'Exp.: '+this.props.expirydate}@{this.props.expirytime}</td>
        <td id="payment3">{this.props.payment}</td>
      
        <td id="delete" >
          <form action="/deleteThisOrder" method="post">
            <input type='hidden' name='OrderType' value={this.props.valuetype}/> 
            <input type='hidden' name='OrderID' value={this.props.valueid}/> 
            <input type="submit" value='Delete this order'/>
          </form>
        </td>
        <td id="edit">   
         <button onClick={this.props.handleclick}>Update</button>
        </td>
      </tr>

     
    );
  }
}


export default Form
