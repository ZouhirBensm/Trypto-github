import React from 'react'
import '../style/reactDivMobile.css'

import {validateInputs_pkobmOr_basicData} from '../../full-stack-libs/validations'

// TODO add location to the entries as a field, think of integrating google maps
// Fix to ordersapp to be bitcoin focused like the market

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
    // console.log("UID????", userId)
    // console.log("OID????", this.props.match.params.orderID)
    // console.log("what_page????", this.props.match.params.order_type)


    console.log("mode:", this.state.mode)

    console.log("props:", "order_type: ", this.props.match.params.order_type, "orderID: ", this.props.match.params.orderID)

  }

  async EditOrder(_order, e) {
    e.preventDefault()

    let pkobmOr_4ft2sd = {
      _id: _order._id,
      title: document.getElementById("my_form").elements["title"].value,
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

    console.log(isNotEdited)

    if (isNotEdited) return first_msg_if_any

    


    
    let error_msg_retrieved_if_any
    error_msg_retrieved_if_any = validateInputs_pkobmOr_basicData(pkobmOr_4ft2sd, error_msg_retrieved_if_any)
    
    console.log("error_msg_retrieved_if_any", error_msg_retrieved_if_any)
    
    if (error_msg_retrieved_if_any) return error_msg_retrieved_if_any
    
    console.log("Edit request!!!!")
    


    console.log(
      pkobmOr_4ft2sd, "VS", _order
    )



    const response = await fetch(`/marketplace/update`, {
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
    console.log(_denomination)
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

    console.log("----------======>>>>", options)
    return options
  }

  async handleChange() {
    console.log("changing....")

    let _denomination

    // _conversionRate = document.getElementById("form_id").elements["conversion"].value


    var crypto_sel = document.getElementById("my_form").elements["crypto"];
    // console.log(crypto_sel)

    _denomination = crypto_sel.value;
    console.log(_denomination)
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
    console.log("setTable")


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
    console.log("end component did mount")
  }


  async loadData() {

    // console.log("this.props.match.params.order_type", this.props.match.params.order_type)

    console.log(`/marketplace/order/${userId}/${this.props.match.params.order_type}/${this.props.match.params.orderID}`)

    let response = await fetch(`/marketplace/order/${userId}/${this.props.match.params.order_type}/${this.props.match.params.orderID}`)



    console.log(response)

    if (response.ok) {
      let order = await response.json()
      // console.log("order detailes: ", order)

      let rows = this.setTableRows(order)

      this.setState({
        rows: rows,
        order: order
      })

      // this.setState({
      //   order: order,
      // })



    } else {
      console.error("Error: ", order)
    }

    console.log("end load data")

  }


  async DeleteClick(_orderID, e){
    e.preventDefault()

    let response = await fetch(`/marketplace/delete-this-order`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        market_orderID: _orderID
      })
    })

    console.log(response)
    let srv_ = await response.json()
    console.log(srv_)

    if(response.ok){

      window.location.href = `/marketplace/databases/${this.props.match.params.order_type}?popup=${srv_.srv_}`

    } else {

      // TODO make a generic name out of this function
      this.displayPopUp(srv_.error.message)
      // console.error("deletion failed!")
    }

  }




  // ___________________________________________________________
  render() {
    console.log(this.state.mode)
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

    let rows = []
    let myorder = (_order.userid._id == userId)

    for (const property in _order) {
      var i = Object.keys(_order).indexOf(property);
      console.log(`${property}: ${_order[property]}: ${i}`);

      switch (property) {
        case "_id":
        case "__v":
        case "sellmarketorderlocationID":
        case "expireAt":
          break;
        case "userid":
          rows.push(<tr key={i}>
            <td>{Object.keys(_order[property])[1]}</td>
            <td>{_order[property].email}</td>
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

    if (myorder) {
      rows.push(<tr key={123}>
        <td>Edit</td>
        <td>
          <button onClick={(e) => { this.handleToogleEdit(e) }}>Edit</button>
        </td>
      </tr>)
      rows.push(<tr key={456}>
        <td>Delete</td>
        <td>
          <button onClick={(e) => this.DeleteClick(_order._id, e)}>Delete</button>
        </td>
      </tr>)
    }
    return rows
  }




  seEditRows(_order) {
    let rows = []
    let myorder = (_order.userid._id == userId)
    console.log("this.state.denomination || _order.chain", this.state.denomination || _order.chain)

    let options = this.setOptions(this.state.denomination || _order.chain)
    console.log("-------->>>!!!!", this.state.denomination, _order.chain)



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
        case "sellmarketorderlocationID":
        case "expireAt":
          break;
        case "userid":
          rows.push(<tr key={i}>
            <td>{Object.keys(_order[property])[1]}</td>
            <td>{_order[property].email}</td>
          </tr>)
          break;
        case "title":
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
        case "category":
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
          <label htmlFor="crypto-select">Chain Network</label>
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
          rows.push(<tr key={i}>
            <td>{property}</td>
            <td>{_order[property]}</td>
          </tr>)
          break;
      }


    }

    if (myorder) {
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
            this.displayPopUp(Edit_return_str)
            }}>Save</button>
        </td>
      </tr>)
    }

    return rows

  }

  displayPopUp(_Edit_return_str){
    console.log("ARE WE GOOD!")

    const wrapper = document.getElementsByClassName("wrapper")[0]

    console.log(wrapper)

    let div = document.getElementById("popup");

    
    div.style.display = "block"
    
    console.log(!(div.innerHTML))

    if (!(div.innerHTML)) {
      console.log("set up pop up")
      wrapper.insertBefore(div, wrapper.firstChild);
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
  console.log(options)
  console.log("--------->>>>", currentValue)
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
  console.log("--------->>>>", currentValue)

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
  console.log("--------->>>>", currentValue)

  return (
    <React.Fragment>
      <input form="my_form" id="expirytime-select" type="time" name="expirytime" required defaultValue={currentValue} />
    </React.Fragment>
  )
}




function EditExpiryDate(props) {
  let currentValue = props.curentValue;
  console.log("--------->>>>", currentValue)

  return (
    <React.Fragment>
      <input form="my_form" id="expirydate-select" type="date" name="expirydate" required defaultValue={currentValue} />
    </React.Fragment>
  )
}