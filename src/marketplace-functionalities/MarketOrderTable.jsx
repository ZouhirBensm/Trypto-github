import './style/MarketOrderTable.css'
import { Link } from "react-router-dom";

class MarketOrderTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let ordersRow

    if (this.props.orders) {
      ordersRow = this.props.orders.map((order, i) => {
        return <OrderRow
          selected_userID={this.props.selected_userID}
          order_type={this.props.order_type}
          key={i}
          order={order}
        />
      })
    } else {
      console.error(`this.props.orders resolved to a false for some reason`)
    }

    return (

      <div>
        {ordersRow}
      </div>
    );
  }
}




class OrderRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.selected_userID = this.props.selected_userID
  }

  render() {
    let order = this.props.order;
    console.log(order)
    // console.log(order.price)
    let display_normal = [];
    let display_editing = [];
    // console.log(this.props.buttons)

    let amount_normal;
    let amount_editing;
    let wantsTO;


    const order_first_image_name = order.sellmarketorderImageID.images[0].name

    
    return (


      <React.Fragment>

        <Link className='link' to={{
          pathname: `/marketplace/${this.props.order_type}/${order._id}`, 
          // search: `?order=${JSON.stringify(order)}`,
        }}
        >
        <div>
          <img src={`/img/marketorder-images/${order._id}/${order_first_image_name}`}></img>
          <div>Title: {order.title}</div>
          <div>Price: {order.price}</div>
          {/* TODO !!! Add location and condition */}
        </div>
        </Link>
      </React.Fragment>

    );
  }
}














function TheSelectCrypto(props) {
  let currentValue = props.curentValue;
  return (
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

export default MarketOrderTable