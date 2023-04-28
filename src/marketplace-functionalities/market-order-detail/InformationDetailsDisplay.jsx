import ROLE from '../../../full-stack-libs/Types/Role'
import './style/InformationDetailsDisplay.css'

import BaseOrderInformation from '../market-order-detail-information-components/BaseOrderInformation'
import OrderNumbersInformation from '../market-order-detail-information-components/OrderNumbersInformation'
import ChainWalletInformation from '../market-order-detail-information-components/ChainWalletInformation'
import LocationInformation from '../market-order-detail-information-components/LocationInformation'
import OrderUserInfomation from '../market-order-detail-information-components/OrderUserInfomation'
import EditBaseOrderInformation from '../market-order-detail-edit-components/EditBaseOrderInformation'
import EditOrderNumbersInformation from '../market-order-detail-edit-components/EditOrderNumbersInformation'
import EditChainWalletInformation from '../market-order-detail-edit-components/EditChainWalletInformation'
import DeleteThisOrder from '../market-order-detail-information-components/DeleteThisOrder'
import Deal from '../market-order-detail-information-components/Deal'

class InformationDetailsDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      section_to_edit: undefined,
      // popup: undefined
    }
    this.handleToogleEdit = this.handleToogleEdit.bind(this)
    // this.setpopup = this.setpopup.bind(this)

    // const reactDiv = document.getElementById("react-div")
    // let popupdiv = document.getElementById("popup")
    // reactDiv.appendChild(popupdiv);
  }

  // setpopup(message){
  //   this.setState({
  //     popup: message
  //   })
  // }

  handleToogleEdit(section, e) {
    this.setState({
      section_to_edit: section,
    })
  }


  render() {
    // let popupdiv = document.getElementById("popup")
    // popupdiv.style.display = "none"
    // popupdiv.innerHTML = ''

    // if (this.state.popup) {
    //   popupdiv.style.display = "block"
    //   popupdiv.innerHTML = this.state.popup      
    // }

    let myorder = (this.props.order_information?.userid._id == userId)
    let isMaster = (user.role == ROLE.MASTER)
    let isSuperUser = myorder || isMaster


    return (
      <React.Fragment>
        <div id='order-information-wrapper'>

          {isSuperUser ?
            <DeleteThisOrder
              order_type={this.props.order_type}
              order_owner_id={this.props.order_information?.userid._id}
              orderID={this.props.order_information?._id}
            // setpopup={this.setpopup}
            />
            :
            null
          }

          <div id="market-order-part1">
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
          </div>


          <br /><br />


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

          <br /><br />


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

          <br /><br />


          <LocationInformation
            st={this.props.order_information?.sellmarketorderlocationID.location.st}
            neigh={this.props.order_information?.sellmarketorderlocationID.location.neigh}
            city={this.props.order_information?.sellmarketorderlocationID.location.city}
            province_state={this.props.order_information?.sellmarketorderlocationID.location.province_state}
            country={this.props.order_information?.sellmarketorderlocationID.location.country}
          />

          <br /><br />


          <OrderUserInfomation
            username={this.props.order_information?.userid.username}
          // user_id={this.props.order_information?.userid._id}
          // email={this.props.order_information?.userid.email}
          />

          <br /><br />


          {isSuperUser ?
            null
            :
            <React.Fragment>
              <Deal
                orderID={this.props.order_information?._id}
                order_owner_id={this.props.order_information?.userid._id}
              />
            </React.Fragment>
          }

        </div>


      </React.Fragment>
    )
  }
}

export default InformationDetailsDisplay