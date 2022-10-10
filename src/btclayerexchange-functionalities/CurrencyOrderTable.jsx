import {validateOrderInputs} from '../../full-stack-libs/validations'
// import React from 'react';
class CurrencyOrderTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      orderID_toToggle: undefined,
      buttons: this.props.buttons
    }
    this.handleToogleEdit = this.handleToogleEdit.bind(this)
  }
  
  componentDidUpdate(prevProps){
    if(prevProps.order_type != this.props.order_type){
      // console.log("------------>THE ORDER TYPE CHANGED!!!!<-------------")
      this.setState({
        orderID_toToggle: undefined,
      })
    }
  }
  handleToogleEdit(buttons, valueid, e) {
    //e.preventDefault()
    //console.log(e.target.value);
    this.setState(prevState => ({
      orderID_toToggle: valueid,
      buttons: buttons
    }))
  }

  render() {
    // console.log("Parent toogled id ", this.state.orderID_toToggle )
    // console.log("buttons ", this.state.buttons )

    let ordersRow

    if (this.props.orders) {
      ordersRow = this.props.orders.map((order, i) => {
        return <OrderRow
          selected_userID={this.props.selected_userID}
          handleClick={this.props.handleClick}
          loadData={this.props.loadData}
          buttons={order._id === this.state.orderID_toToggle ? this.state.buttons : this.props.buttons}
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

    return (
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
  constructor(props) {
    super(props)
    // this.state = {
    // }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deal = this.deal.bind(this)
    this.selected_userID = this.props.selected_userID
  }

  deal(order, e) {
    e.preventDefault()
    // console.log(`/messaging?orderId=${order._id}&userIdB=${order.userid._id}`)
    window.location.href = `/messaging?orderId=${order._id}&userIdB=${order.userid._id}`
  }

  setupPopUpDiv(){
    const wrapper2 = document.getElementsByClassName("wrapper2")[0]
    console.log(wrapper2)
    let div = document.getElementById("popup");
    console.log(!!(div.innerHTML))

    if(!!(div.innerHTML)) return
    div.style.display = "block"
    wrapper2.insertBefore(div, wrapper2.firstChild);


  }

  displayEditPopUp(error = undefined) {

    let div = document.getElementById("popup");

    this.setupPopUpDiv()


    if (!error) {
      div.innerHTML = "Successful update!"
      return undefined
    } else {
      div.innerHTML = error
      return error
    }
  }

  async handleSubmit(e) {
    e.preventDefault()
    console.log("Testing handle submit")

    const orderType = document.getElementById("my_form").elements["OrderType"].value


    let amount_s = []
    orderType === "buyordersdata"? amount_s = ["amount"]: null
    orderType === "sellordersdata"? amount_s = ["minamount", "maxamount"]:
    null

    let amount_fields_obj = {}

    for (const field of amount_s) {
      console.log("field", field)

      amount_fields_obj[field] = document.getElementById("my_form").elements[field].value
    }

    console.log(amount_fields_obj)


    // TODO add the userID 
    // TODO add validation
    let objectToPatchWith = {
      OrderType: document.getElementById("my_form").elements["OrderType"].value,
      OrderID: document.getElementById("my_form").elements["OrderID"].value,
      // crypto: document.getElementById("my_form").elements["crypto"].value,
      chain: document.getElementById("my_form").elements["chain"].value,
      ...amount_fields_obj,
      rate: document.getElementById("my_form").elements["rate"].value,
      expirydate: document.getElementById("my_form").elements["expirydate"].value,
      expirytime: document.getElementById("my_form").elements["expirytime"].value,
      payment: document.getElementById("my_form").elements["payment"].value,
    }


    console.log("working with object to patch with:", objectToPatchWith)



    let error = validateOrderInputs(objectToPatchWith)
    // console.log("error", error)
    error = parseInt(objectToPatchWith.minamount)>parseInt(objectToPatchWith.maxamount) && !error ? "Min Amount Cannot be superior than Max Amount, please edit, and resubmit.": error

    if (error) return this.displayEditPopUp(error)



    const response = await fetch(`/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(objectToPatchWith)
    })

    console.log("api ress: ", response);
    const payload = await response.json()
    console.log("payload: ", payload)

    if (response.status === 200) {
      // window.location.href = `/?popup=${payload.srv_}`;
      this.displayEditPopUp()

      // Reset page display after the edit
      // Reload data from server
      this.props.loadData(this.props.order_type)

      const orderIDjust_clicked = document.getElementById("my_form").elements["OrderID"].value

      console.log(orderIDjust_clicked)
      // Toogle back to default table
      this.props.handleToogleEdit("my", orderIDjust_clicked, e)
    }

  }

  render() {
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
          <BuyAmount amount={order.amount} />
        </td>
    }

    if (this.props.order_type == "sellordersdata") {
      wantsTO = "wants to sell"
      amount_normal = <td id="amount1" key={`td-amount-key-order:${order._id}`}>{'Amount Range: ' + order.minamount}-{order.maxamount}</td>
      amount_editing =
        <td id="amount1" key={`td-edit-amount-key-order:${order._id}`}>
          <SellAmount minamount={order.minamount} maxamount={order.maxamount} />
        </td>
    }

    display_normal.push(
      <td id="crypto1" key={`td-crypto-key-order:${order._id}`}>{order.crypto}</td>,
      <td id="chain1" key={`td-chain-key-order:${order._id}`}>{order.chain}</td>,
      <td id="rate1" key={`td-rate-key-order:${order._id}`}>{'Rate: ' + order.rate}</td>,
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
      display_normal.push(
        <td id="button1" key={`td-button1-key-order:${order._id}`}>
          <button onClick={(e) => this.props.handleClick(this.props.order_type, order._id, e)}>Delete</button>
        </td>,
        <td id="button2" key={`td-button2-key-order:${order._id}`}>
          <button onClick={(e) => this.props.handleToogleEdit("edit", order._id, e)}>Edit</button>
        </td>
      )
    }

    if (this.props.buttons == "edit") {
      display_editing.push(
        <td id="form4" key={`td-edit-form4-key-order:${order._id}`}>
          <form className="update-form" id="my_form"></form>
        </td>,
        <td id="ordertype4" key={`td-edit-ordertype4-key-order:${order._id}`}>
          <input form="my_form" type='hidden' name='OrderType' value={this.props.order_type} />
        </td>,
        <td id="orderid4" key={`td-edit-orderid4-key-order:${order._id}`}>
          <input form="my_form" type='hidden' name='OrderID' value={order._id} />
        </td>,
        <td id="crypto1" key={`td-edit-crypto-key-order:${order._id}`}>{order.crypto}</td>,
        <td id="chain1" key={`td-edit-chain-key-order:${order._id}`}>
          <label htmlFor="chain-select">Chain</label>
          <TheSelectChain
            curentValue={order.chain}
          />
        </td>,
        amount_editing,
        <td id="rate1" key={`td-edit-rate-key-order:${order._id}`}>
          <label htmlFor="rate-select">Rate</label>
          <input form="my_form" type="number" id="rate-select" name="rate" min="0" required defaultValue={order.rate} />
        </td>,
        <td id="expiry1" key={`td-edit-expiry-key-order:${order._id}`}>
          <label htmlFor="expirydate-select">Order Expiry Date</label>
          <input form="my_form" id="expirydate-select" type="date" name="expirydate" required defaultValue={order.expirydate} />
          <label htmlFor="expirytime-select">Order Expiry Time</label>
          <input form="my_form" id="expirytime-select" type="time" name="expirytime" required defaultValue={order.expirytime} />
        </td>,
        <td id="payment1" key={`td-edit-payment-key-order:${order._id}`}>
          <label htmlFor="payment-select">Payment</label>
          <TheSelectPayment
            curentValue={order.payment}
          />
        </td>,
        <td id="button1" key={`td-edit-button2-key-order:${order._id}`}>
          <button onClick={(e) => this.props.handleToogleEdit("my", order._id, e)}>Done</button>
        </td>,
        <td id="button2" key={`td-edit-button1-key-order:${order._id}`}>
          <button type="submit" onClick={(e) => this.handleSubmit(e)}>Save</button>
        </td>
      )
    }

    // console.log("Require Keys: ", display_editing)
    return (
      <tr>
        <td id="id1">{order._id}</td>
        <td id="email1">{order.userid.email} {wantsTO}</td>
        <td id="posteddate1">{'On: ' + order.postedDate}</td>
        {this.props.buttons == "normal" || this.props.buttons == "my" ? display_normal : null}
        {this.props.buttons == "edit" ? display_editing : null}
      </tr>
    );
  }
}












function BuyAmount(props) {
  return (
    <div>
      <label htmlFor="amount-select">Amount</label>
      <input form="my_form" type="number" id="amount-select" name="amount" min="10" max="10000" required defaultValue={props.amount} />
    </div>
  )
}

function SellAmount(props) {
  return (
    <div>
      <label htmlFor="min-amount-select">Min Amount</label>
      <input form="my_form" type="number" id="min-amount-select" name="minamount" required defaultValue={props.minamount} />
      <label htmlFor="max-amount-select">Max Amount</label>
      <input form="my_form" type="number" id="max-amount-select" name="maxamount" required defaultValue={props.maxamount} />
    </div>
  )
}

function TheSelectPayment(props) {
  let currentValue = props.curentValue;
  return (
    <select form="my_form" name="payment" id="payment-select" required defaultValue={currentValue}>
      <option value="Paypal">Paypal</option>
      <option value="Interac">Interac</option>
      <option value="Cash">Cash</option>
    </select>
  )
}




function TheSelectChain(props) {
  let currentValue = props.curentValue;
  return (
    <select form="my_form" name="chain" id="chain-select" required defaultValue={currentValue}>
      <option value="Bitcoin Base Chain">Bitcoin Base Chain</option>
      <option value="Bitcoin Lightning">Bitcoin Lightning</option>
      <option value="Bitcoin Liquid">Bitcoin Liquid</option>
    </select>
  )
}
export default CurrencyOrderTable