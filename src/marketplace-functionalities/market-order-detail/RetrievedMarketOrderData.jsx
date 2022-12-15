import ImagesScrollDisplay from './ImagesScrollDisplay'
import InformationDetailsDisplay from './InformationDetailsDisplay'

import './style/RetrievedMarketOrderData.css'


class RetrievedMarketOrderData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  render() {
    let sellmarketorderImageID, order_infomation;
    this.props.order? ({sellmarketorderImageID, ...order_infomation} = this.props.order): null
    // console.log("order_infomation?._id", order_infomation?._id)
    
    return (
      <React.Fragment>
        <div className="wrapper">
          <ImagesScrollDisplay 
            // pass orders images related data
            orderID={this.props.order?._id}
            images_names={this.props.order?.sellmarketorderImageID.images}
          />
          <InformationDetailsDisplay 
            // pass other order related data
            order_information={order_infomation}
            loadData={this.props.loadData}
            order_type={this.props.order_type}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default RetrievedMarketOrderData