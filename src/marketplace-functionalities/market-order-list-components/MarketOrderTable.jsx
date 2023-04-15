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


    const order_first_image_name = order.sellmarketorderImageID.images[0].name
    
    const isMarketOrderFromSeed = /^\*\s/.test(this.props.order.title) 

    const image_path = isMarketOrderFromSeed ? `/img/marketorder-images/seed-images/empty.jpeg` : `/img/marketorder-images/${order._id}/${order_first_image_name}`
    
    return (


      <React.Fragment>

        <Link className='link' to={{
          pathname: `/marketplace/${this.props.order_type}/${order._id}`, 
          // search: `?order=${JSON.stringify(order)}`,
        }}
        >
        <div>
          <img src={image_path}></img>
          <div>Title: {order.title}</div>
          <div>Price: {order.price}</div>
          {/* TODO Add location and condition */}
        </div>
        </Link>
      </React.Fragment>

    );
  }
}


export default MarketOrderTable