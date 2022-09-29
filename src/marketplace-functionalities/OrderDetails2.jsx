import React from 'react'
import '../style/reactDivMobile.css'

// TODO add location to the entries as a field, think of integrating google maps
// Fix to ordersapp to be bitcoin focused like the market

class OrderDetails2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order: undefined,
      rows: undefined,
      mode: true
    }
    this.setTableRows = this.setTableRows.bind(this)
    this.handleToogleEdit = this.handleToogleEdit.bind(this)
    // console.log("UID????", userId)
    // console.log("OID????", this.props.match.params.orderID)
    // console.log("what_page????", this.props.match.params.order_type)


    console.log("mode:", this.state.mode)

    console.log("props:", "order_type: ",  this.props.match.params.order_type, "orderID: ", this.props.match.params.orderID)

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
  render() {
    console.log(this.state.mode)
    return (
      <React.Fragment>
        <div>OrderDetails2...</div>
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




  setNormalRows(_order){

    let rows = []
    let myorder = (_order.userid._id == userId)

    for (const property in _order) {
      var i = Object.keys(_order).indexOf(property);
      // console.log(`${property}: ${_order[property]}: ${i}`);

      switch (property) {
        case "_id":
        case "__v":
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
          <button>Delete</button>
        </td>
      </tr>)
    }
    return rows
  }




  seEditRows(_order){
    let rows = []
    let myorder = (_order.userid._id == userId)

    for (const property in _order) {
      var i = Object.keys(_order).indexOf(property);
      // console.log(`${property}: ${_order[property]}: ${i}`);

      switch (property) {
        case "_id":
        case "__v":
          break;
        case "userid":
          rows.push(<tr key={i}>
            <td>{Object.keys(_order[property])[1]}</td>
            <td>{_order[property].email}</td>
          </tr>)
          break;
        case "title":
          rows.push(<tr key={i}>
            <td>{property}</td>
            <td>Edit title</td>
          </tr>)
          break;
        case "category":
          rows.push(<tr key={i}>
            <td>{property}</td>
            <td>Edit category</td>
          </tr>)
          break;
        case "minprice":
        case "maxprice":
        case "price":
          rows.push(<tr key={i}>
            <td>{property}</td>
            <td>Edit prices</td>
          </tr>)
          break;
        case "crypto":
          rows.push(<tr key={i}>
            <td>{property}</td>
            <td>Edit crypto</td>
          </tr>)
          break;
        case "conversion":
          rows.push(<tr key={i}>
            <td>{property}</td>
            <td>Edit conversion</td>
          </tr>)
          break;
        case "payment":
          rows.push(<tr key={i}>
            <td>{property}</td>
            <td>Edit payment</td>
          </tr>)
          break;
        case "chain":
          rows.push(<tr key={i}>
            <td>{property}</td>
            <td>Edit chain</td>
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
          <button>Save</button>
        </td>
      </tr>)
    }

    return rows

  }



}




export default OrderDetails2