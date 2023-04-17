import { Link } from "react-router-dom";
import PriceToogler from './PriceToogler'

import './style/MarketOrderTable.css'

class MarketOrderTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.constructOrderRows = this.constructOrderRows.bind(this)
  }

  constructOrderRows(){
    let ordersRow 
    if (this.props.orders) {
      ordersRow = this.props.orders.map((order, i) => {
        return <OrderRow
          selected_userID={this.props.selected_userID}
          order_type={this.props.order_type}
          key={order._id}
          order={order}
        />
      })
      return ordersRow
    } else {
      console.error(`this.props.orders resolved to a false for some reason`)
      return
    }
  }



  render() {
    let ordersRow = this.constructOrderRows()

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
    this.state = {}

    this.selected_userID = this.props.selected_userID
  }

  render() {
    let order = this.props.order;

    console.log('Re-render', order.title)

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

            <div id="item-title">
              <span>{order.title}</span>
            </div>


            <PriceToogler
              price={order.price}
              conversion={order.conversion}
              order_id={this.props.order._id}
            />

            {/* <div id="toogler2">
              <input type="checkbox" id={`id-${this.props.keyy}`} className="checkbox"/>  
              <label htmlFor={`id-${this.props.keyy}`} className="switch">{order.price} CAD</label>
            </div> */}



          </div>


          {/* Grid */}

          <div id="item-data">
            <span>{order.description}</span>
            <span id="item-published">{formattedDate}</span>
            <img src={chain_logo_img_src}></img>
            <span>{order.chain}</span>
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