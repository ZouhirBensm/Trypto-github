import SameDisplays from "./SameDisplays"

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


        <SameDisplays
          disableDelete={this.props.disableDelete}
          button_display={this.props.button_display}
          selectedReason={this.props.selectedReason}
          customReason={this.props.customReason}
          hasUserInput={this.props.hasUserInput}
          setPopupModal={this.props.setPopupModal}
          // TODO !!!! beter name
          function={this.paypalUnSub}
        />
      </React.Fragment>
    )
  }
}

export default UnsubFunction