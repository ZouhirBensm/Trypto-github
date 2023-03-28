class UnsubFunction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.paypalUnSub = this.paypalUnSub.bind(this)
  }

  async paypalUnSub(reason, e = null) {
    e?.preventDefault()

    if(!reason) return

    const userId = this.props.usedUserID
    console.log(userId, reason)


    let response
    response = await fetch(`/paypal/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        reason: reason,
      })
    })

    let json
    json = await response.json()

    if (response.status === 200 || response.status === 202) {
      this.props.handleOutsideClick() // Close modal
      this.props.setpopups(json.server.client_message)

    } else {
      // console.log("paypalUnSub()->json:\n\n", json.error.message.client_message)
      // console.log("paypalUnSub()->typeof:\n\n", typeof json.error.message.client_message)
      
      this.props.handleOutsideClick() // Close modal
      this.props.setpopups(json.error.message.client_message)
    }


  }

  render() {
    return (
      <React.Fragment>
        <button disabled={this.props.disableDelete} id="onpage-unsubscirbe-button" onClick={(e) => {

          try {
            const reason = this.reasonDeterminator(e)
            this.paypalUnSub(reason, e)
          } catch (error) {
            console.log("Error on delete button: ", error)
          }
          
        }}>Unsubscribe</button>
      </React.Fragment>
    )
  }

  reasonDeterminator(e) {
    // console.log(this.props.selectedReason)
    // console.log(this.props.customReason)
    // console.log(this.props.hasUserInput)

    const option5 = 'Other'

    let reason
    if(this.props.selectedReason != option5) {
      reason = this.props.selectedReason
      return reason
    }

    if(!this.props.hasUserInput) {
      const popup = "Please submit reason"
      return this.props.setPopupModal(popup)
    }

    reason = this.props.customReason
    return reason
  }


}

export default UnsubFunction