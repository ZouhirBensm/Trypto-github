import './style/InformationDetailsDisplay.css'
import BaseOrderInformation from './market-order-detail-information-components/BaseOrderInformation'
import OrderNumbersInformation from './market-order-detail-information-components/OrderNumbersInformation'
import ChainWalletInformation from './market-order-detail-information-components/ChainWalletInformation'
import LocationInformation from './market-order-detail-information-components/LocationInformation'
import OrderUserInfomation from './market-order-detail-information-components/OrderUserInfomation'

class InformationDetailsDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log("fucking order information!!!", this.props.order_information)
    return (
      <React.Fragment>
        <div id='order-information-wrapper'>
          <BaseOrderInformation
            title={this.props.order_information?.title}
            description={this.props.order_information?.description}
            category={this.props.order_information?.category}
            expirationAt={this.props.order_information?.expireAt}
            expirationDate={this.props.order_information?.expirydate}
            expirationTime={this.props.order_information?.expirytime}
            postedDate={this.props.order_information?.postedDate}
          /><br />
          <OrderNumbersInformation
            conversion={this.props.order_information?.conversion}
            price={this.props.order_information?.price}
          /><br />

          <ChainWalletInformation
            chain={this.props.order_information?.chain}
            payment={this.props.order_information?.payment}
          /><br />
          <LocationInformation
            st={this.props.order_information?.sellmarketorderlocationID.location.st}
            neigh={this.props.order_information?.sellmarketorderlocationID.location.neigh}
            city={this.props.order_information?.sellmarketorderlocationID.location.city}
            province_state={this.props.order_information?.sellmarketorderlocationID.location.province_state}
            country={this.props.order_information?.sellmarketorderlocationID.location.country}
          /><br />


          <OrderUserInfomation
            user_id={this.props.order_information?.userid._id}
            username={this.props.order_information?.userid.username}
            email={this.props.order_information?.userid.email}
          /><br />


        </div>
      </React.Fragment>
    )
  }
}

export default InformationDetailsDisplay