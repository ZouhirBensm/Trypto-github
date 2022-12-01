import React from 'react'
import Edits from './market-order-details-edit-inputs/MarketOrdersEditInputs'
import '../style/reactDivMobile.css'
import ROLE from '../../full-stack-libs/Types/Role'

import { validateInputs, validateExpiry } from '../../full-stack-libs/validations'


// TODO !!!! add the amounts to display SAT and BTC
// TODO !!!! display market order images on the market orders details page
// TODO !!!! when submitting a market order, add the auto scroll to botom to see the pop up
class MarketOrderDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order: undefined,
      rows: undefined,
      mode: true,
      denomination: undefined
    }
    this.setTableRows = this.setTableRows.bind(this)
    this.handleToogleEdit = this.handleToogleEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.EditOrder = this.EditOrder.bind(this)
    this.deal = this.deal.bind(this)
  }

  componentDidMount() {
    this.loadData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.denomination != this.state.denomination) {
      let element = document.getElementById("payment-select");
      element.value = "";
    }
  }

  async loadData() {
    let response = await fetch(`/marketplace/order/${userId}/${this.props.match.params.order_type}/${this.props.match.params.orderID}`)
    console.log(response)

    let order_or_error = await response.json()

    if (response.ok) {
      let rows = this.setTableRows(order_or_error)

      this.setState({
        rows: rows,
        order: order_or_error
      })
    } else {
      this.displayPopUp2(order_or_error.error.message)
    }

  }

  setTableRows(_order) {
    let rows = []
    if (this.state.mode == true) {
      rows = this.setNormalRows(_order)
    } else {
      rows = this.seEditRows(_order)
    }
    return rows
  }


  setNormalRows(_order) {
    let rows = []
    let myorder = (_order.userid._id == userId)
    let isMaster = (user.role == ROLE.MASTER)

    for (const property in _order) {
      var i = Object.keys(_order).indexOf(property);
      // console.log(`${property}: ${_order[property]}: ${i}`);

      switch (property) {
        case "_id":
        case "__v":
        case "expireAt":
        case "sellmarketorderImageID":
          break;
        case "sellmarketorderlocationID":
          // console.log("order.location: ", Object.keys(_order[property].location), _order[property].location['st'])
          for (const [index, iterator] of Object.keys(_order[property].location).entries()) {
            // console.log(iterator, index)
            if (iterator == "st") {
              continue;
            }
            rows.push(<tr key={`Location-key-${index}`}>
              <td>{iterator}</td>
              <td>{_order[property].location[iterator]}</td>
            </tr>)

          }
          break
        case "userid":
          rows.push(<tr key={i}>
            <td>{Object.keys(_order[property])[1]}</td>
            <td>{_order[property].username}</td>
          </tr>)
          break;
        default:
          rows.push(<tr key={i}>
            <td>{property}</td>
            <td>{_order[property]}</td>
          </tr>)
          break;
      }
    }

    if (myorder || isMaster) {
      rows.push(<tr key={123}>
        <td>Edit</td>
        <td>
          <button onClick={(e) => { this.handleToogleEdit(e) }}>Edit</button>
        </td>
      </tr>)
      rows.push(<tr key={456}>
        <td>Delete</td>
        <td>
          <button onClick={(e) => this.DeleteClick(_order.userid._id, _order._id, e)}>Delete</button>
        </td>
      </tr>)
    } else {
      rows.push(<tr key={789}>
        <td>Deal</td>
        <td>
          <button onClick={(e) => this.deal(_order, e)}>Deal</button>
        </td>
      </tr>)
    }
    return rows
  }


  seEditRows(_order) {
    let rows = []
    let myorder = (_order.userid._id == userId)
    let isMaster = (user.role == ROLE.MASTER)
    let options = this.setOptions(this.state.denomination || _order.chain)

    rows.push(<tr style={{ display: "none" }} key={`Edit-Market-Order:${_order._id}`}>
      <td>
        Form
      </td>
      <td>
        <form id="my_form"></form>
      </td>
    </tr>)

    for (const property in _order) {
      var i = Object.keys(_order).indexOf(property);
      switch (property) {
        case "_id":
        case "__v":
        case "expireAt":
        case "sellmarketorderImageID":
          break;
        case "sellmarketorderlocationID":
          for (const [index, iterator] of Object.keys(_order[property].location).entries()) {
            if (iterator == "st") {
              continue;
            }
            rows.push(<tr key={`Location-key-${index}`}>
              <td>{iterator}</td>
              <td>{_order[property].location[iterator]}</td>
            </tr>)
          }
          break;
        case "userid":
          rows.push(<tr key={i}>
            <td>{Object.keys(_order[property])[1]}</td>
            <td>{_order[property].username}</td>
          </tr>)
          break;
        case "title":
          rows.push(<tr key={i}>
            <td>
              <label htmlFor="title-select">{property}</label>
            </td>
            <td>
              <Edits.EditTitle
                curentValue={_order.title}
              />
            </td>
          </tr>)
          break;
        case "description":
          rows.push(<tr key={i}>
            <td>
              <label htmlFor="description-select">{property}</label>
            </td>
            <td>
              <Edits.EditDescription
                curentValue={_order.description}
              />
            </td>
          </tr>)
          break;
        case "category":
          rows.push(<tr key={i}>
            <td>
              <label htmlFor="category-select">{property}</label>
            </td>
            <td>
              <Edits.EditCategory
                curentValue={_order.category}
              />
            </td>
          </tr>)
          break;
        case "price":
          rows.push(<tr key={i}>
            <td>
              <label htmlFor="price-select">{property}</label>
            </td>
            <td>
              <Edits.EditPrice
                curentValue={_order.price}
              />
            </td>
          </tr>)



          break;
        case "conversion":
          rows.push(<tr key={i}>
            <td>
              <label htmlFor="conversion-select">{property}</label>
            </td>
            <td>
              <Edits.EditConversion
                curentValue={_order.conversion}
              />
            </td>
          </tr>)
          break;
        case "payment":
          rows.push(<tr key={i}>
            <td>
              <label htmlFor="payment-select">{property}</label>
            </td>
            <td>
              <Edits.EditPayment
                options={options}
                curentValue={_order.payment}
              />
            </td>
          </tr>)

          break;
        case "chain":
          rows.push(<tr key={i}>
            <td>
              <label htmlFor="crypto-select">{property}</label>
            </td>
            <td>
              <Edits.EditChain
                handleChange={this.handleChange}
                curentValue={_order.chain}
              />
            </td>
          </tr>)
          break;
        case "expirytime":
          // console.log(i)
          rows.push(<tr key={i}>
            <td>
              <label htmlFor="expirytime-select">{property}</label>
            </td>
            <td>
              <Edits.EditExpiryTime
                curentValue={_order.expirytime}
              />
            </td>
          </tr>)
          break;
        case "expirydate":
          rows.push(<tr key={i}>
            <td>
              <label htmlFor="expirydate-select">{property}</label>
            </td>
            <td>
              <Edits.EditExpiryDate
                curentValue={_order.expirydate}
              />
            </td>
          </tr>)
          break;
        default:
          rows.push(<tr key={i}>
            <td>{property}</td>
            <td>{_order[property]}</td>
          </tr>)
          break;
      }
    }


    if (myorder || isMaster) {
      rows.push(<tr key={123}>
        <td>Revert</td>
        <td>
          <button onClick={(e) => { this.handleToogleEdit(e) }}>Revert</button>
        </td>
      </tr>)
      rows.push(<tr key={456}>
        <td>Save</td>
        <td>
          <button onClick={async (e) => {
            let Edit_return_str = await this.EditOrder(_order, e);
            console.log("Edit_return_str", Edit_return_str);
            let ReactDiv = document.getElementById("react-div")
            this.displayPopUp2(Edit_return_str);
            ReactDiv.scrollTo(0, 0);
          }}>Save</button>
        </td>
      </tr>)
    }

    return rows

  }







  setOptions(_denomination) {
    let options
    let tag_options_arr_data = []

    if (_denomination == "Bitcoin Base Chain") {
      tag_options_arr_data = ["Wallet1", "Wallet2", "Wallet3", "Wallet4"]
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else if (_denomination == "Bitcoin Lightning") {
      tag_options_arr_data = ["Wallet5", "Wallet6", "Wallet7", "Wallet8"]
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else if (_denomination == "Bitcoin Liquid") {
      tag_options_arr_data = ["Wallet9", "Wallet10", "Wallet11", "Wallet12"]
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else { }
    return options
  }








  // ___________________________________________________________
  
  async handleChange() {
    let _denomination
    var crypto_sel = document.getElementById("my_form").elements["crypto"];
    _denomination = crypto_sel.value;

    this.setState({
      denomination: _denomination,
    }, () => {
      this.loadData()
    })

  }

  handleToogleEdit() {
    this.setState({
      mode: !this.state.mode
    }, () => {
      this.loadData()
    })
  }


  // ___________________________________________________________
  render() {
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rows}
          </tbody>
        </table>

      </React.Fragment>
    )
  }

  // ___________________________________________________________

  displayPopUp2(_Edit_return_str) {
    const reactDiv = document.getElementById("react-div")
    let div = document.getElementById("popup");
    div.style.display = "block"

    if (!(div.innerHTML)) {
      console.log("set up pop up")
      reactDiv.insertBefore(div, reactDiv.firstChild);
    }
    div.innerHTML = _Edit_return_str
  }



  async EditOrder(_order, e) {
    e.preventDefault()

    let pkobmOr_4ft2sd = {
      _id: _order._id,
      title: document.getElementById("my_form").elements["title"].value,
      description: document.getElementById("my_form").elements["description"].value,
      category: document.getElementById("my_form").elements["category"].value,
      price: document.getElementById("my_form").elements["price"].value,
      conversion: document.getElementById("my_form").elements["conversion"].value,
      payment: document.getElementById("my_form").elements["payment"].value,
      chain: document.getElementById("my_form").elements["crypto"].value,
      expirydate: document.getElementById("my_form").elements["expirydate"].value,
      expirytime: document.getElementById("my_form").elements["expirytime"].value,
    }

    const isEqual = (key) => pkobmOr_4ft2sd[key] == _order[key];
    const isNotEdited = Object.keys(pkobmOr_4ft2sd).every(isEqual)
    let first_msg_if_any = "Inputs haven't changed, therefor nothing to update!"

    if (isNotEdited) return first_msg_if_any

    let error_msg_retrieved_if_any
    error_msg_retrieved_if_any = validateInputs(pkobmOr_4ft2sd) || validateExpiry(pkobmOr_4ft2sd)

    if (error_msg_retrieved_if_any) return error_msg_retrieved_if_any

    const response = await fetch(`/marketplace/${userId}/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        pkobmOr_4ft2sd
      })
    })

    if (response.status === 200) {

      const payload = await response.json()
      console.log("payload: ", payload)

      this.handleToogleEdit()
      return payload.srv_

    } else {
      return "Server failed to edit/update for some reason!"
    }
  }

  deal(order, e) {
    e.preventDefault()
    window.location.href = `/messaging?orderId=${order._id}&userIdB=${order.userid._id}`
  }



  async DeleteClick(orderownerID, _orderID, e) {
    e.preventDefault()
    let response = await fetch(`/marketplace/${userId}/delete-this-order`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        market_orderID: _orderID
      })
    })
    let srv_ = await response.json()

    if (response.ok) {

      if (paths_URL[0] == 'operations') {
        window.location.href = `/operations/help-for-market-orders/${orderownerID}?popup=${srv_.srv_}`
      } else {
        window.location.href = `/marketplace/${this.props.match.params.order_type}?popup=${srv_.srv_}`
      }
    } else {
      this.displayPopUp2(srv_.error.message)
    }

  }


}




export default MarketOrderDetails