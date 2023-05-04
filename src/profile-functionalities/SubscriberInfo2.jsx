import './styles/SubscriberInfo.css'


class SubscriberInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    // console.log(this.props)
  }


  render() {

    const date = new Date(this.props.subscriptionDateTime);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate_subscriptionDateTime = date.toLocaleDateString('en-US', options);


    

    const date1 = new Date(this.props.current_billing_cycle_top_datetime);
    const formattedDate_current_billing_cycle_top_datetime = date1.toLocaleDateString('en-US', options);

    const date2 = new Date(this.props.current_billing_cycle_botom_datetime);
    const formattedDate_current_billing_cycle_botom_datetime = date2.toLocaleDateString('en-US', options);

    
    let formattedDate_subscriptionExpiresAt
    if(this.props.subscriptionExpiresAt){
      const date3 = new Date(this.props.subscriptionExpiresAt);
      formattedDate_subscriptionExpiresAt = date3.toLocaleDateString('en-US', options);
    }



    return (
      <React.Fragment>
        <div className="main-card subscription-info">
          <div id="subscription-title-container">
            <span>Subscription</span>
            <hr />
          </div>

          <div id="subscription-info-container">
            
            <h2>Plan</h2>
            {/* this.props.userName */}
            <div>{this.props.plan}</div> <br />

            <h2>PayPal Subscription ID</h2>
            <div>{this.props.paypalsubscriptionID}</div> <br />

            <h2>Subscription date</h2>
            <div>{formattedDate_subscriptionDateTime}</div> <br />

            <h2>Next billing date</h2>
            <div>{formattedDate_current_billing_cycle_top_datetime}</div> <br />

            <h2>Paid/Covered billing cycle</h2>
            <div>{formattedDate_current_billing_cycle_botom_datetime} - {formattedDate_current_billing_cycle_top_datetime}</div> <br />

            {this.props.subscriptionExpiresAt?
            <React.Fragment>
              <h2>Termination date</h2>
              <div>{formattedDate_subscriptionExpiresAt}</div> <br />
            </React.Fragment>
            : null}


          </div>
          
        </div>
      </React.Fragment>
    )
  }
}

export default SubscriberInfo