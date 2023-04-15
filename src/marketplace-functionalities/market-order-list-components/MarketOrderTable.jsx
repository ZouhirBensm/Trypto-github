import { Link } from "react-router-dom";

import './style/MarketOrderTable.css'

class MarketOrderTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
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

    let price_raw = order.price / order.conversion
    let price_btc = price_raw.toFixed(9)
    let price_sat = Math.trunc(price_raw * 1000000000)


    const date = new Date(order.postedDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    let chain_logo_img_src
    switch (order.chain) {
      case "Bitcoin Lightning":
        chain_logo_img_src = '/img/PNG/chain-logo/lightning.png'
        break;
      case "Bitcoin Liquid":
        chain_logo_img_src = '/img/PNG/chain-logo/liquid.png'
        break;
      case "Bitcoin Base Chain":
        chain_logo_img_src = '/img/PNG/chain-logo/bitcoin.png'
        break;
    
      default:
        break;
    }

    const order_first_image_name = order.sellmarketorderImageID.images[0].name
    
    const isMarketOrderFromSeed = /^\*\s/.test(this.props.order.title) 

    const image_path = isMarketOrderFromSeed ? `/img/marketorder-images/seed-images/empty.jpeg` : `/img/marketorder-images/${order._id}/${order_first_image_name}`
    
    return (


      <React.Fragment>

      <div className='item-card'>

        <div className='item-preview'>
          <img src={image_path}></img>
          <span>{formattedDate}</span>

          <span>{order.title}</span>

          <div>
            <span>{order.price}</span>
            <span>{price_sat}</span>
          </div>

          {/* Grid */}
          <div>
            <span>{order.description}</span>
            <img src={chain_logo_img_src}></img>
            <span>{order.chain}</span>
          </div>

          {/* TODO Add location and condition */}
        </div>

        <Link className='link' to={{
          pathname: `/marketplace/${this.props.order_type}/${order._id}`, 
          // search: `?order=${JSON.stringify(order)}`,
        }}
        >Discover</Link>
      </div>
      </React.Fragment>

    );
  }
}


export default MarketOrderTable