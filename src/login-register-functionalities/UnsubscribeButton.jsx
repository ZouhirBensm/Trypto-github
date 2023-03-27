



class UnsubscribeButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.paypalUnSub = this.paypalUnSub.bind(this)
  }

  async paypalUnSub(e) {
    e.preventDefault()
    let response
    response = await fetch(`/paypal/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        userId: this.props.usedUserID,
        reason: "test_reason",
      })
    })

    let json
    json = await response.json()

    if (response.status === 200 || response.status === 202) {
      this.props.setpopups(json.server.client_message)
    } else {
      console.log("paypalUnSub()->json:\n\n", json.error.message.client_message)
      console.log("paypalUnSub()->typeof:\n\n", typeof json.error.message.client_message)
      
      this.props.setpopups(json.error.message.client_message)
    }
  }


  render() {
    return (
      <React.Fragment>
        <button id="onpage-unsubscirbe-button" onClick={(e) => {
          this.paypalUnSub(e)
        }}>Unsubscribe</button>
      </React.Fragment>
    )
  }
}

export default UnsubscribeButton