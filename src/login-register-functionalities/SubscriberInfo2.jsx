
class SubscriberInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    // console.log(this.props)
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
        <div className="main-card subscription-info">
          <div className="title-card">
            <span>Subscriber plan: </span>
            <span>{this.props.plan}</span>
          </div>

          <div className="section">
            <div className="section-wrapper">
              <ul className="section-ul">
                <li>On BidBlock, {this.props.userName}'s plan: {this.props.plan}</li>
                <li>On Paypal, Subscription ID: {this.props.paypalsubscriptionID}</li>
                <li>Subscription date time: {this.props.subscriptionDateTime}</li>
                <li>Next billing dateTime: {this.props.current_billing_cycle_top_datetime}</li>
                <li>Paid for current billing cycle: FROM: {this.props.current_billing_cycle_botom_datetime} TO: {this.props.current_billing_cycle_top_datetime}</li>
                {this.props.subscriptionExpiresAt? 
                <li>Requested subscription termination dateTime: {this.props.subscriptionExpiresAt}</li>
                : null}
              </ul>

              <button id="onpage-unsubscirbe-button" onClick={(e) => {
                this.paypalUnSub(e)
              }}>Unsubscribe</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default SubscriberInfo