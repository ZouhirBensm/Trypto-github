
class SubscriberInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    console.log(this.props)
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

              <button onClick={(e) => {
                this.props.section_btn(e)
              }}>Unsubscribe</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default SubscriberInfo