// import React from 'react';
class CurrencyOrderTable extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      orderID_toToggle: undefined,
      buttons: this.props.buttons
    }
    this.handleToogleEdit = this.handleToogleEdit.bind(this)
  }

  handleToogleEdit(buttons, valueid, e){
    //e.preventDefault()
    //console.log(e.target.value);
    this.setState(prevState => ({
      orderID_toToggle: valueid,
      buttons: buttons
    }))
  }

  render(){
    // console.log("Parent toogled id ", this.state.orderID_toToggle )
    // console.log("buttons ", this.state.buttons )

    let ordersRow
    
    if(this.props.orders){
      ordersRow = this.props.orders.map((order, i) => {
        return <OrderRow 
        selected_userID = {this.props.selected_userID}
        handleClick={this.props.handleClick} 
        loadData={this.props.loadData}
        buttons={order._id === this.state.orderID_toToggle? this.state.buttons: this.props.buttons} 
        order_type={this.props.order_type} 
        key={order._id} 
        keyy={i}
        order={order}
        handleToogleEdit={this.handleToogleEdit}
        />
      })
    } else {
      console.error(`this.props.orders resolved to a false for some reason`)
    }
    // console.log("Does Not Require Keys: ", ordersRow)

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
          {ordersRow}
        </tbody>
      </table>
    );
  }
}

class OrderRow extends React.Component {
  constructor(props){
    super(props)
    // this.state = {
    // }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deal = this.deal.bind(this)
    this.selected_userID = this.props.selected_userID
  }

  deal(order, e){
    e.preventDefault()
    // console.log(`/messaging?orderId=${order._id}&userIdB=${order.userid._id}`)
    window.location.href = `/messaging?orderId=${order._id}&userIdB=${order.userid._id}`
  }

  displayEditPopUp(){
    console.log("ARE WE GOOD!")
    
    const wrapper2 = document.getElementsByClassName("wrapper2")[0]
    console.log(wrapper2)

    let div = document.getElementById("popup");

    console.log(!!(div.innerHTML))
    if (!!(div.innerHTML)) {
      console.log("div is filled")
      div.innerHTML = "Edit successful!"
    } else {
      console.log("div is empty")
      div.style.display = "block"
      div.innerHTML = "Edit successful!"
      wrapper2.insertBefore(div, wrapper2.firstChild);
    }
  }

  async handleSubmit(e){
    e.preventDefault()
    console.log("Testing handle submit")
    const orderType = document.getElementById("my_form").elements["OrderType"].value
    let amount, minamount, maxamount
    if (orderType === "buyordersdata") {
      amount = document.getElementById("my_form").elements["amount"].value
      minamount, maxamount = undefined
    } else if (orderType === "sellordersdata") {
      minamount = document.getElementById("my_form").elements["minamount"].value
      maxamount = document.getElementById("my_form").elements["maxamount"].value
      amount = undefined
    }
    console.log(amount, minamount, maxamount)
    const response = await fetch(`/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        OrderType: document.getElementById("my_form").elements["OrderType"].value,
        OrderID: document.getElementById("my_form").elements["OrderID"].value,
        crypto: document.getElementById("my_form").elements["crypto"].value,
        [orderType === "buyordersdata" ? "amount": null]: amount,
        [orderType === "sellordersdata" ? "minamount": null]: minamount,
        [orderType === "sellordersdata" ? "maxamount": null]: maxamount,
        price: document.getElementById("my_form").elements["price"].value,
        expirydate: document.getElementById("my_form").elements["expirydate"].value,
        expirytime: document.getElementById("my_form").elements["expirytime"].value,
        payment: document.getElementById("my_form").elements["payment"].value,
      })
    })

    console.log("api ress: ", response);
    const payload = await response.json()
    console.log("payload: ", payload)

    if (response.status === 200) {
      // window.location.href = `/?popup=${payload.srv_}`;
      this.displayEditPopUp()

      // Reset page display after the edit
      this.props.loadData(this.props.order_type)
      const orderIDjust_clicked = document.getElementById("my_form").elements["OrderID"].value
      this.props.handleToogleEdit("my", orderIDjust_clicked, e)
    }

  }

  render(){
    // console.log("state buttons child", this.props.buttons)
    const order = this.props.order;


    // console.log(`row ${this.props.keyy} executing: `, order)


    let display_normal = [];
    let display_editing = [];
    // console.log(this.props.buttons)
    
    let amount_normal;
    let amount_editing;
    let wantsTO;
    // console.log("WTF ", this.props.order_type)
    // console.log(order)
    if (this.props.order_type == "buyordersdata") {
      wantsTO = "wants to buy"
      amount_normal = <td id="amount1" key={`td-amount-key-order:${order._id}`}>{'Amount: ' + order.amount}</td>
      amount_editing =      
      <td id="amount1" key={`td-edit-amount-key-order:${order._id}`}>
        <BuyAmount amount = {order.amount} />
      </td>   
    }

    if (this.props.order_type == "sellordersdata") {
      wantsTO = "wants to sell"
      amount_normal = <td id="amount1" key={`td-amount-key-order:${order._id}`}>{'Amount Range: ' +  order.minamount}-{order.maxamount}</td>
      amount_editing =
      <td id="amount1" key={`td-edit-amount-key-order:${order._id}`}>
        <SellAmount minamount = {order.minamount} maxamount = {order.maxamount}/>
      </td>   
    }

    display_normal.push(
      <td id="crypto1" key={`td-crypto-key-order:${order._id}`}>{order.crypto}</td>,
      <td id="price1" key={`td-price-key-order:${order._id}`}>{'Price: ' + order.price}</td>,
      <td id="expiry1" key={`td-expiry-key-order:${order._id}`}>{'Exp.: ' + order.expirydate}@{order.expirytime}</td>,
      <td id="payment1" key={`td-payment-key-order:${order._id}`}>{order.payment}</td>,
      amount_normal,
    )

    if (this.props.buttons == "normal") {
      // console.log("\nloggedIn User:\n", this.userId, "\nuser id of the order\n", order.userid._id, "\nequality:\n", this.userId === order.userid._id)

      display_normal.push(<td id="deal1" key={`td-deal-key-order:${order._id}`}>
        <button disabled={this.selected_userID === order.userid._id} onClick={(e) => this.deal(order, e)}>Deal</button>
        {/* <a href={`/messaging?orderId=${order._id}&userIdB=${order.userid._id}`}>Deal</a> */}
      </td>)
    }
  
    if (this.props.buttons == "my") {
      display_normal.push(<td id="button1" key={`td-button1-key-order:${order._id}`}><button onClick={(e) => this.props.handleClick(this.props.order_type, order._id, e)}>Delete</button></td>, <td id="button2" key={`td-button2-key-order:${order._id}`}><button onClick={(e) => this.props.handleToogleEdit("edit", order._id, e)}>Edit</button></td>)
    }

    if (this.props.buttons == "edit") {
      display_editing.push(
        <td id="form4" key={`td-edit-form4-key-order:${order._id}`}><form className="update-form" id="my_form"></form></td>,
        <td id="ordertype4" key={`td-edit-ordertype4-key-order:${order._id}`}><input form="my_form" type='hidden' name='OrderType' value={this.props.order_type}/></td>,
        <td id="orderid4" key={`td-edit-orderid4-key-order:${order._id}`}><input form="my_form" type='hidden' name='OrderID' value={order._id}/> </td>,
        <td id="crypto1" key={`td-edit-crypto-key-order:${order._id}`}>
          <label htmlFor="crypto-select">Crypto</label>
          <TheSelectCrypto 
            curentValue = {order.crypto}
          />
        </td> ,
        amount_editing,
        <td id="price1" key={`td-edit-price-key-order:${order._id}`}>
          <label htmlFor="price-select">Price</label>
          <input form="my_form" type="number" id="price-select" name="price" min="0" required defaultValue={order.price}/> 
        </td>,
        <td id="expiry1" key={`td-edit-expiry-key-order:${order._id}`}>
          <label htmlFor="expirydate-select">Order Expiry Date</label>
          <input form="my_form" id="expirydate-select" type="date" name="expirydate" required defaultValue={order.expirydate}/>
          <label htmlFor="expirytime-select">Order Expiry Time</label>
          <input form="my_form" id="expirytime-select" type="time" name="expirytime" required defaultValue={order.expirytime}/>
        </td> ,
        <td id="payment1" key={`td-edit-payment-key-order:${order._id}`}>
          <label htmlFor="payment-select">Payment</label>
          <TheSelectPayment 
            curentValue = {order.payment}
          />
        </td>,
        <td id="button1" key={`td-edit-button2-key-order:${order._id}`}><button onClick={(e) => this.props.handleToogleEdit("my", order._id, e)}>Done</button></td>,
        <td id="button2" key={`td-edit-button1-key-order:${order._id}`}><button type="submit" onClick={(e) => this.handleSubmit(e)}>Save</button></td>
      )
    }

    // console.log("Require Keys: ", display_editing)
    return(
      <tr>
        <td id="id1">{order._id}</td>
        <td id="email1">{order.userid.email} {wantsTO}</td>
        <td id="posteddate1">{'On: ' + order.postedDate}</td>
        {this.props.buttons == "normal" || this.props.buttons == "my" ? display_normal: null}
        {this.props.buttons == "edit" ? display_editing: null}
      </tr>
    );
  }
}














function TheSelectCrypto(props){
  let currentValue = props.curentValue;
  return(
  <select form="my_form" name="crypto" id="crypto-select" required defaultValue={currentValue}>
    <option value="Bitcoin">Bitcoin</option>
    <option value="Ethereum">Ethereum</option>
    <option value="Litecoin">Litecoin</option>
    <option value="Bitcoin Cash">Bitcoin Cash</option>
    <option value="Zcash">Zcash</option>
    <option value="Monero">Monero</option>
  </select>
 )
}

function BuyAmount(props) {
  return(
  <div>
    <label htmlFor="amount-select">Amount</label>
    <input form="my_form" type="number" id="amount-select" name="amount" min="10" max="10000" required defaultValue={props.amount}/>  
  </div>
  )
}

function SellAmount(props) {
  return (
  <div>
      <label htmlFor="min-amount-select">Min Amount</label>
      <input form="my_form" type="number" id="min-amount-select" name="minamount" required defaultValue={props.minamount}/> 
      <label htmlFor="max-amount-select">Max Amount</label>
      <input form="my_form" type="number" id="max-amount-select" name="maxamount" required defaultValue={props.maxamount}/> 
  </div>
  )
}

function TheSelectPayment(props){
  let currentValue = props.curentValue;
  return(
  <select form="my_form" name="payment" id="payment-select" required defaultValue={currentValue}>
    <option value="Paypal">Paypal</option>
    <option value="Interac">Interac</option>
    <option value="Cash">Cash</option>
  </select>
 )
}

export default CurrencyOrderTable