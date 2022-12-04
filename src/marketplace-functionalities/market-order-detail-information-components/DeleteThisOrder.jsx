class DeleteThisOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popup: undefined
    }
    this.setpopup = this.setpopup.bind(this)
  }

  setpopup(error_message) {
    console.log(`Setting popup: ${error_message}`)
    this.setState({
      popup: error_message
    })
  }

  async deleteOrder(orderownerID, _orderID, e) {
    e.preventDefault()

    console.log("--->>>", orderownerID, _orderID)


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

    console.log(response, srv_)
    if (response.ok) {
      this.setpopup(undefined)
      if (paths_URL[0] == 'operations') {
        window.location.href = `/operations/help-for-market-orders/${orderownerID}?popup=${srv_.srv_}`
      } else {
        window.location.href = `/marketplace/${this.props.order_type}?popup=${srv_.srv_}`
      }
    } else {
      this.setpopup(srv_.error.message)
    }

  }

  render() {
    return (
      <React.Fragment>
        <button onClick={(e) => {
          this.deleteOrder(this.props.order_owner_id, this.props.orderID, e)
        }}>Delete</button>

        {this.state.popup ?
          <div id="popup-section1">{this.state.popup}</div>
          : null}
      </React.Fragment>
    )
  }
}

export default DeleteThisOrder