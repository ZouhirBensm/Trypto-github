import { Link } from "react-router-dom";
import PriceToogler from '../marketplace-functionalities/market-order-list-components/PriceToogler'


import { countWords, takeUntilWordNumber } from '../../full-stack-libs/utils'



class ItemRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    let order = this.props.order;

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


    const description_word_count = countWords(order.description)
    const description_max_number_of_words = 4
    let description = description_word_count > description_max_number_of_words ? takeUntilWordNumber(order.description, description_max_number_of_words) + ' ...' : order.description



    return (


      <React.Fragment>

        {/* ITEM CARD */}
        <div className="item-card">

          <div className="item-preview">
            <img src={image_path} />

            <div id="item-title">
              <span>{order.title}</span>
            </div>


            <PriceToogler
              price={order.price}
              conversion={order.conversion}
              order_id={order._id}
            />

          </div>




          <div id="item-data">

            <span>{description}</span>
            <span id="item-published">{formattedDate}</span>
            <img src={chain_logo_img_src} />
            <span>{order.chain}</span>
          </div>


          {this.props.order_type ?
            <Link className='link' to={{
              pathname: `/marketplace/${this.props.order_type}/${order._id}`,
              // search: `?order=${JSON.stringify(order)}`,
            }}
            >Discover</Link>
            :
            <a className='link' href={userId ? `/marketplace/sellordersdata/${order._id}` : `/subscription`}>Discover</a>
          }



        </div>
        {/* ITEM CARD */}

      </React.Fragment>

    );
  }
}


export default ItemRow