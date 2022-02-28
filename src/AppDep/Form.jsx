import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import '../styles/Form.css'



class Form extends Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(valuetype, valueid, e){
    // console.log("!!!!!", valuetype, valueid)
    // console.log("okkk type", typeof valuetype, typeof valueid)



    fetch(`${process.env.ROOT}/deleteThisOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        OrderType: valuetype,
        OrderID: valueid
      })
    })
    .then(response => response.json())
    .then(result => {
      let elements_left_in_page = document.getElementsByTagName("tr")

      if(this.props.on_off_limit_next && elements_left_in_page.length === 1 && this.props.number_of_pages != 1){
        this.props.handleDelete(result.memorized_order_type, true)
      } else {
        this.props.handleDelete(result.memorized_order_type)
      }
      // console.log("elements_left_in_page: ",  elements_left_in_page, elements_left_in_page.length)
      // console.log("bounds: ",  this.props.on_off_limit_previous, this.props.on_off_limit_next)


      // console.log(result.memorized_order_type)

      
    })
    
    
  }
  
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
          {/* <form action="/deleteThisOrder" method="post">
            <input type='hidden' name='OrderType' value={this.props.valuetype}/> 
            <input type='hidden' name='OrderID' value={this.props.valueid}/> 
            <input type="submit" value='Delete this order'/>
          </form> */}
          <button onClick={(e) => this.handleClick(this.props.valuetype, this.props.valueid, e)}>Delete this order</button>
          
        </td>
        <td id="edit">   
         <button onClick={this.props.handleclick}>Update</button>
        </td>
      </tr>

     
    );
  }
}


export default Form
