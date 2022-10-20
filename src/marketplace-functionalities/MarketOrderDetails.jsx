import React from 'react'
import '../style/reactDivMobile.css'
import ROLE from '../../full-stack-libs/Types/Role'

import { validateInputs, validateExpiry } from '../../full-stack-libs/validations'


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

    console.log("UID????----->>>>>", userId)
    // console.log("OID????", this.props.match.params.orderID)
    // console.log("what_page????", this.props.match.params.order_type)


    // console.log("mode:", this.state.mode)

    // console.log("props:", "order_type: ", this.props.match.params.order_type, "orderID: ", this.props.match.params.orderID)

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

    // console.log(pkobmOr_4ft2sd)


    const isEqual = (key) => pkobmOr_4ft2sd[key] == _order[key];
    const isNotEdited = Object.keys(pkobmOr_4ft2sd).every(isEqual)
    let first_msg_if_any = "Inputs haven't changed, therefor nothing to update!"

    // console.log(isNotEdited)

    if (isNotEdited) return first_msg_if_any



    console.log("pkobmOr_4ft2sd inputs=====> ", pkobmOr_4ft2sd)


    let error_msg_retrieved_if_any
    error_msg_retrieved_if_any = validateInputs(pkobmOr_4ft2sd) || validateExpiry(pkobmOr_4ft2sd)

    
    console.log("error_msg_retrieved_if_any======>>>>>>> ", error_msg_retrieved_if_any)

    if (error_msg_retrieved_if_any) return error_msg_retrieved_if_any

    console.log("Edit request!!!!")



    // console.log(
    //   pkobmOr_4ft2sd, "VS", _order
    // )



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

    console.log("api ress: ", response);



    if (response.status === 200) {

      const payload = await response.json()
      console.log("payload: ", payload)

      this.handleToogleEdit()
      // window.location.href = `/?popup=${payload.srv_}`;
      return payload.srv_

    } else {
      return "Server failed to edit/update for some reason!"
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.denomination != this.state.denomination) {
      let element = document.getElementById("payment-select");
      element.value = "N/A";
    }
  }

  setOptions(_denomination) {
    // console.log(_denomination)
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

    // console.log("SELECT:", document.getElementById('payment-select')?.options[0].selected)

    // console.log("----------======>>>>", options)
    return options
  }

  async handleChange() {
    // console.log("changing....")

    let _denomination

    // _conversionRate = document.getElementById("form_id").elements["conversion"].value


    var crypto_sel = document.getElementById("my_form").elements["crypto"];
    // console.log(crypto_sel)

    _denomination = crypto_sel.value;
    // console.log(_denomination)
    // // _crypto = crypto_sel.value


    // // _price = document.getElementById("form_id").elements["price"].value
    // // amountsToRaw = _price / _conversionRate

    // // amountsToBTC = amountsToRaw.toFixed(9)
    // // amountsToSAT = Math.trunc(amountsToRaw * 1000000000)


    // // console.log(_price, _conversionRate, _crypto, _denomination)

    this.setState({
      denomination: _denomination,
    }, () => {
      // this.setOptions()
      this.loadData()
    })

  }

  handleToogleEdit() {
    //e.preventDefault()
    //console.log(e.target.value);
    this.setState({
      mode: !this.state.mode
    }, () => {
      this.loadData()
    })
  }




  // componentDidUpdate(){
  //   let rows = this.setTableRows(this.state.order)

  //   this.setState({
  //     rows: rows
  //   })

  // }

  setTableRows(_order) {
    // console.log("setTable")


    // console.log(_order.userid._id, userId)

    // console.log(myorder)


    let rows = []

    if (this.state.mode == true) {

      rows = this.setNormalRows(_order)

    } else {

      rows = this.seEditRows(_order)

    }

    return rows



  }

  componentDidMount() {
    this.loadData()
    // console.log("end component did mount")
  }


  async loadData() {

    // console.log("this.props.match.params.order_type", this.props.match.params.order_type)

    // console.log(`/marketplace/order/${userId}/${this.props.match.params.order_type}/${this.props.match.params.orderID}`)

    let response = await fetch(`/marketplace/order/${userId}/${this.props.match.params.order_type}/${this.props.match.params.orderID}`)



    console.log(response)

    let order_or_error = await response.json()

    console.log("order detailes: ", order_or_error)

    if (response.ok) {

      let rows = this.setTableRows(order_or_error)

      this.setState({
        rows: rows,
        order: order_or_error
      })

      // this.setState({
      //   order: order_or_error,
      // })



    } else {
      console.error("Error: ", order_or_error)
      this.displayPopUp2(order_or_error.error.message)
    }

    // console.log("end load data")

  }


  async DeleteClick(orderownerID, _orderID, e) {
    e.preventDefault()

    console.log("------------------->>>>>>", userId)
    console.log(`/operations/help-for-market-orders/${orderownerID}`)
    console.log(paths_URL[0])
    

    
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

    // console.log(response)
    let srv_ = await response.json()
    // console.log(srv_)

    if (response.ok) {

      if(paths_URL[0] == 'operations'){
        window.location.href = `/operations/help-for-market-orders/${orderownerID}?popup=${srv_.srv_}`
      } else {
        window.location.href = `/marketplace/${this.props.match.params.order_type}?popup=${srv_.srv_}`
      }



    } else {

      this.displayPopUp2(srv_.error.message)
      // console.error("deletion failed!")
    }

  }




  // ___________________________________________________________
  render() {
    // console.log(this.state.mode)
    return (
      <React.Fragment>
        {/* <div>MarketOrderDetails...</div> */}
        {/* <div>{JSON.stringify(this.state.order)}</div> */}

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







  setNormalRows(_order) {

    console.log("Fn, USER????", user)
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
          break;
        case "sellmarketorderlocationID":
          // console.log("order.location: ", Object.keys(_order[property].location), _order[property].location['st'])
          for (const [index, iterator] of Object.keys(_order[property].location).entries()) {
            // console.log(iterator, index)
            rows.push(<tr key={`Location-key-${index}`}>
              <td>{iterator}</td>
              <td>{_order[property].location[iterator]}</td>
            </tr>)
          }

          // rows.push(<tr key={99}>
          //   <td>{Object.keys(_order[property])[0]}</td>
          //   <td>{_order[property].st}</td>
          // </tr>,
          //   <tr key={98}>
          //     <td>{Object.keys(_order[property])[1]}</td>
          //     <td>{_order[property].neigh}</td>
          //   </tr>,
          //   <tr key={97}>
          //     <td>{Object.keys(_order[property])[2]}</td>
          //     <td>{_order[property].province_state}</td>
          //   </tr>,
          //   <tr key={96}>
          //     <td>{Object.keys(_order[property])[3]}</td>
          //     <td>{_order[property].city}</td>
          //   </tr>,
          //   <tr key={95}>
          //     <td>{Object.keys(_order[property])[4]}</td>
          //     <td>{_order[property].country}</td>
          //   </tr>
          // )
          break
        case "userid":
          // console.log(i)
          rows.push(<tr key={i}>
            <td>{Object.keys(_order[property])[1]}</td>
            <td>{_order[property].email}</td>
          </tr>)
          break;
        default:
          // console.log(i)
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

  deal(order, e) {
    e.preventDefault()

    // console.log(order)

    // console.log(`/messaging?orderId=${order._id}&userIdB=${order.userid._id}`)

    window.location.href = `/messaging?orderId=${order._id}&userIdB=${order.userid._id}`
  }




  seEditRows(_order) {
    let rows = []
    let myorder = (_order.userid._id == userId)
    let isMaster = (user.role == ROLE.MASTER)
    // console.log("this.state.denomination || _order.chain", this.state.denomination || _order.chain)

    let options = this.setOptions(this.state.denomination || _order.chain)
    // console.log("-------->>>!!!!", this.state.denomination, _order.chain)



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
      // console.log(`${property}: ${_order[property]}: ${i}`);

      switch (property) {
        case "_id":
        case "__v":
        case "expireAt":
          break;
        case "sellmarketorderlocationID":
          // console.log("order.location: ", Object.keys(_order[property].location), _order[property].location['st'])

          for (const [index, iterator] of Object.keys(_order[property].location).entries()) {
            // console.log(iterator, index)
            rows.push(<tr key={`Location-key-${index}`}>
              <td>{iterator}</td>
              <td>{_order[property].location[iterator]}</td>
            </tr>)
          }
          break;
        case "userid":
          // console.log(i)
          rows.push(<tr key={i}>
            <td>{Object.keys(_order[property])[1]}</td>
            <td>{_order[property].email}</td>
          </tr>)
          break;
        case "title":
          // console.log(i)
          rows.push(<tr key={i}>
            <td>
              <label htmlFor="title-select">{property}</label>
            </td>
            <td>
              <EditTitle
                curentValue={_order.title}
              />
            </td>
          </tr>)
          break;
        case "description":
          // console.log(i)
          rows.push(<tr key={i}>
            <td>
              <label htmlFor="description-select">{property}</label>
            </td>
            <td>
              <EditDescription
                curentValue={_order.description}
              />
            </td>
          </tr>)
          break;
        case "category":
          // console.log(i)
          rows.push(<tr key={i}>
            <td>
              <label htmlFor="category-select">{property}</label>
            </td>
            <td>
              <EditCategory
                curentValue={_order.category}
              />
            </td>
          </tr>)
          break;
        case "price":
          // console.log(i)
          rows.push(<tr key={i}>
            <td>
              <label htmlFor="price-select">{property}</label>
            </td>
            <td>
              <EditPrice
                curentValue={_order.price}
              />
            </td>
          </tr>)



          break;


        case "conversion":
          // console.log(i)
          rows.push(<tr key={i}>
            <td>
              <label htmlFor="conversion-select">{property}</label>
            </td>
            <td>
              <EditConversion
                curentValue={_order.conversion}
              />
            </td>
          </tr>)
          break;
        case "payment":
          // console.log(i)
          rows.push(<tr key={i}>
            <td>
              <label htmlFor="payment-select">{property}</label>
            </td>
            <td>
              <EditPayment
                options={options}
                curentValue={_order.payment}
              />
            </td>
          </tr>)

          break;
        case "chain":
          // console.log(i)
          // <label htmlFor="crypto-select">Chain Network</label>
          rows.push(<tr key={i}>
            <td>
              <label htmlFor="crypto-select">{property}</label>
            </td>
            <td>
              <EditChain
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
              <EditExpiryTime
                curentValue={_order.expirytime}
              />
            </td>
          </tr>)
          break;
        case "expirydate":
          // console.log(i)
          rows.push(<tr key={i}>
            <td>
              <label htmlFor="expirydate-select">{property}</label>
            </td>
            <td>
              <EditExpiryDate
                curentValue={_order.expirydate}
              />
            </td>
          </tr>)
          break;

        default:
          // console.log(i)
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
            // console.log("wrapper", ReactDiv)
            this.displayPopUp2(Edit_return_str);
            ReactDiv.scrollTo(0, 0);
          }}>Save</button>
        </td>
      </tr>)
    }

    return rows

  }

  // displayPopUp(_Edit_return_str) {
  //   // console.log("ARE WE GOOD!")

  //   const wrapper = document.getElementsByClassName("wrapper")[0]

  //   console.log("wrapper-------------->", wrapper)

  //   let div = document.getElementById("popup");


  //   div.style.display = "block"

  //   // console.log(!(div.innerHTML))

  //   if (!(div.innerHTML)) {
  //     // console.log("set up pop up")
  //     wrapper.insertBefore(div, wrapper.firstChild);
  //   }

  //   div.innerHTML = _Edit_return_str

  // }

  displayPopUp2(_Edit_return_str) {
    // console.log("ARE WE GOOD!")

    const reactDiv = document.getElementById("react-div")

    console.log("reactDiv-------------->", reactDiv)

    let div = document.getElementById("popup");


    div.style.display = "block"

    // console.log(!(div.innerHTML))

    if (!(div.innerHTML)) {
      console.log("set up pop up")
      reactDiv.insertBefore(div, reactDiv.firstChild);
      // eElement.insertBefore(newFirstElement, eElement.firstChild);
    }

    div.innerHTML = _Edit_return_str

  }




}




export default MarketOrderDetails





function EditTitle(props) {
  let currentValue = props.curentValue;
  // console.log(currentValue)
  return (
    <input form="my_form" type="text" id="title-select" defaultValue={currentValue} name="title" required />
  )
}


function EditCategory(props) {
  let currentValue = props.curentValue;
  // console.log(currentValue)
  return (
    <select form="my_form" name="category" id="category-select" required defaultValue={currentValue}>
      <option value="Other">Other</option>
      <option value="Kitchen">Kitchen</option>
      <option value="Clothes">Clothes</option>
      <option value="Electronics">Electronics</option>
      <option value="Automobile">Automobile</option>
      <option value="Camping">Camping</option>
      <option value="Furniture">Furniture</option>
    </select>
  )
}



function EditPrice(props) {
  let currentValue = props.curentValue;
  // console.log(currentValue)
  return (
    // onChange={(e) => this.handleChange(e)}
    <input form="my_form" type="number" id="price-select" name="price" step="0.01" required defaultValue={currentValue} />
  )
}





function EditConversion(props) {
  let currentValue = props.curentValue;
  // console.log(currentValue)
  return (
    <React.Fragment>
      {/* onChange={(e) => this.handleChange(e)} */}
      <input form="my_form" type="number" id="conversion-select" name="conversion" step="0.01" required defaultValue={currentValue} />
      {/* <button onClick={(e) => { this.clickGetCryptoPrice(e) }}>Market</button> */}
    </React.Fragment>

  )
}






function EditPayment(props) {
  let currentValue = props.curentValue;

  let options = props.options
  // console.log(options)
  // console.log("--------->>>>", currentValue)
  return (
    // onChange={this.change}
    <select form="my_form" name="payment" id="payment-select" required defaultValue={currentValue}>
      <option value="N/A">N/A</option>
      {options}
    </select>
  )
}




function EditChain(props) {
  let currentValue = props.curentValue;
  // console.log("--------->>>>", currentValue)

  return (
    // onChange={(e) => this.handleChange(e)}
    <select onChange={(e) => props.handleChange(e)} form="my_form" name="crypto" id="crypto-select" defaultValue={currentValue} required >
      <option value="Bitcoin Base Chain">Bitcoin Base Chain</option>
      <option value="Bitcoin Lightning">Bitcoin Lightning</option>
      <option value="Bitcoin Liquid">Bitcoin Liquid</option>
    </select>
  )
}


function EditExpiryTime(props) {
  let currentValue = props.curentValue;
  // console.log("--------->>>>", currentValue)

  return (
    <React.Fragment>
      <input form="my_form" id="expirytime-select" type="time" name="expirytime" required defaultValue={currentValue} />
    </React.Fragment>
  )
}




function EditExpiryDate(props) {
  let currentValue = props.curentValue;
  // console.log("--------->>>>", currentValue)

  return (
    <React.Fragment>
      <input form="my_form" id="expirydate-select" type="date" name="expirydate" required defaultValue={currentValue} />
    </React.Fragment>
  )
}




function EditDescription(props) {
  let currentValue = props.curentValue;
  // console.log(currentValue)
  return (
    <textarea form="my_form" name="description" id="description-select" defaultValue={currentValue} cols="30" rows="3" required></textarea>
  )
}

