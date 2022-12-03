import ROLE from '../../full-stack-libs/Types/Role'
import './style/InformationDetailsDisplay.css'
import BaseOrderInformation from './market-order-detail-information-components/BaseOrderInformation'
import OrderNumbersInformation from './market-order-detail-information-components/OrderNumbersInformation'
import ChainWalletInformation from './market-order-detail-information-components/ChainWalletInformation'
import LocationInformation from './market-order-detail-information-components/LocationInformation'
import OrderUserInfomation from './market-order-detail-information-components/OrderUserInfomation'

import EditBaseOrderInformation from './market-order-detail-edit-components/EditBaseOrderInformation'
import EditOrderNumbersInformation from './market-order-detail-edit-components/EditOrderNumbersInformation'
import EditChainWalletInformation from './market-order-detail-edit-components/EditChainWalletInformation'
import EditLocationInformation from './market-order-detail-edit-components/EditLocationInformation'
import EditOrderUserInfomation from './market-order-detail-edit-components/EditOrderUserInfomation'
import React from 'react'

class InformationDetailsDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      section_to_edit: undefined,
    }
    this.handleToogleEdit = this.handleToogleEdit.bind(this)
  }

  handleToogleEdit(section, e) {
    this.setState({
      section_to_edit: section,
    })
  }

  render() {

    let myorder = (this.props.order_information?.userid._id == userId)
    let isMaster = (user.role == ROLE.MASTER)
    let isSuperUser = myorder || isMaster


    // console.log("InformationDetailsDisplay->this.props.order_information: ", this.props.order_information)
    // console.log("InformationDetailsDisplay->user: ", user)
    // console.log("InformationDetailsDisplay->userId: ", userId)


    return (
      <React.Fragment>
        <div id='order-information-wrapper'>

          {this.state.section_to_edit == "BaseOrderInformation" && isSuperUser ?
            <EditBaseOrderInformation
              orderID={this.props.order_information?._id}
              title={this.props.order_information?.title}
              description={this.props.order_information?.description}
              category={this.props.order_information?.category}
              condition={this.props.order_information?.condition}
              postedDate={this.props.order_information?.postedDate}
              expirationDate={this.props.order_information?.expirydate}
              expirationTime={this.props.order_information?.expirytime}
              handleToogleEdit={this.handleToogleEdit}
              loadData={this.props.loadData}
            />
            :
            <BaseOrderInformation
              title={this.props.order_information?.title}
              description={this.props.order_information?.description}
              category={this.props.order_information?.category}
              condition={this.props.order_information?.condition}
              expirationAt={this.props.order_information?.expireAt}
              expirationDate={this.props.order_information?.expirydate}
              expirationTime={this.props.order_information?.expirytime}
              postedDate={this.props.order_information?.postedDate}
              handleToogleEdit={this.handleToogleEdit}
              isSuperUser={isSuperUser}
            />
          }
          <br />


          {this.state.section_to_edit == "OrderNumbersInformation" && isSuperUser ?
            <EditOrderNumbersInformation
              orderID={this.props.order_information?._id}
              conversion={this.props.order_information?.conversion}
              price={this.props.order_information?.price}
              handleToogleEdit={this.handleToogleEdit}
              loadData={this.props.loadData}
            />
            :
            <OrderNumbersInformation
              conversion={this.props.order_information?.conversion}
              price={this.props.order_information?.price}
              handleToogleEdit={this.handleToogleEdit}
              isSuperUser={isSuperUser}
            />
          }
          <br />


          {this.state.section_to_edit == "ChainWalletInformation" && isSuperUser ?
            <EditChainWalletInformation
              orderID={this.props.order_information?._id}
              chain={this.props.order_information?.chain}
              payment={this.props.order_information?.payment}
              handleToogleEdit={this.handleToogleEdit}
              loadData={this.props.loadData}
            />
            :
            <ChainWalletInformation
              chain={this.props.order_information?.chain}
              payment={this.props.order_information?.payment}
              handleToogleEdit={this.handleToogleEdit}
              isSuperUser={isSuperUser}
            />
          }
          <br />


          {this.state.section_to_edit == "LocationInformation" && isSuperUser ?
            <EditLocationInformation
              handleToogleEdit={this.handleToogleEdit}
            />
            :
            <LocationInformation
              st={this.props.order_information?.sellmarketorderlocationID.location.st}
              neigh={this.props.order_information?.sellmarketorderlocationID.location.neigh}
              city={this.props.order_information?.sellmarketorderlocationID.location.city}
              province_state={this.props.order_information?.sellmarketorderlocationID.location.province_state}
              country={this.props.order_information?.sellmarketorderlocationID.location.country}
              handleToogleEdit={this.handleToogleEdit}
              isSuperUser={isSuperUser}
            />
          }
          <br />


          {this.state.section_to_edit == "OrderUserInfomation" && isSuperUser ?
            <EditOrderUserInfomation
              handleToogleEdit={this.handleToogleEdit}
            />
            :
            <OrderUserInfomation
              user_id={this.props.order_information?.userid._id}
              username={this.props.order_information?.userid.username}
              email={this.props.order_information?.userid.email}
              handleToogleEdit={this.handleToogleEdit}
              isSuperUser={isSuperUser}
            />
          }
          <br />


          {isSuperUser ?
            <React.Fragment>
              <button>Delete</button>
            </React.Fragment>
            :
            <button>Deal</button>
          }
        </div>
      </React.Fragment>
    )
  }
}

export default InformationDetailsDisplay