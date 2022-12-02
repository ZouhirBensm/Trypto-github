import ImagesScrollDisplay from './ImagesScrollDisplay'
import InformationDetailsDisplay from './InformationDetailsDisplay'


class RetrievedMarketOrderData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  render() {
    let sellmarketorderImageID, order_infomation;
    this.props.order? ({sellmarketorderImageID, ...order_infomation} = this.props.order): null

    return (
      <React.Fragment>
        <ImagesScrollDisplay 
          // pass orders images related data
          orderID={this.props.order?._id}
          images_names={this.props.order?.sellmarketorderImageID.images}
        />
        <InformationDetailsDisplay 
          // pass other order related data
          order_information={order_infomation}
        />
      </React.Fragment>
    )
  }
}

export default RetrievedMarketOrderData