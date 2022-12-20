// React way
const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

class CardInfoSubmission extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notification: [],
    }
    this.BASICPlanRegistrationProcess = this.BASICPlanRegistrationProcess.bind(this)
    this.handleRegistrationCall = this.handleRegistrationCall.bind(this)
  }




  async BASICPlanRegistrationProcess(paypal_subscriptionID, paypal_plan_id, paypal_product_id) {
    console.log("BASICPlanRegistrationProcess()->", { username: this.props.username, email: this.props.email, password: this.props.password, plan: this.props.plan });

    let flag, notification


    ({ flag, notification } = await this.handleRegistrationCall(this.props.username, this.props.email, this.props.password, this.props.plan, paypal_subscriptionID, paypal_plan_id, paypal_product_id));


    return {flag: flag, notification: notification}

  }


  async handleRegistrationCall(_username, _email, _password, _plan, _paypal_subscriptionID, _paypal_plan_id, _paypal_product_id) {
    console.log("Making API call!")

    const response = await fetch(`/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: _username,
        email: _email,
        password: _password,
        plan: _plan,
        paypal_subscriptionID: _paypal_subscriptionID,
        paypal_plan_id: _paypal_plan_id,
        paypal_product_id: _paypal_product_id,
      })
    })


    let data = await response.json()

    console.log("handleRegistrationCall()->response, data: ", response, data)


    switch (response.status) {
      case 200:
        return {
          flag: true,
          notification: data.server.message
        }
      case 500:
        return {
          flag: false,
          notification: typeof data.error.message === 'string' ? [data.error.message] : data.error.message
        }
      default:
        break;
    }

  }



  async createSubscription(data, actions) {
    return actions.subscription.create({
      'plan_id': process.env.PAYPAL_PLAN_ID
    });

  }

  async onApprove(data, actions) {
    let flag, notification;

    ({ flag, notification } = await this.BASICPlanRegistrationProcess(data.subscriptionID, process.env.PAYPAL_PLAN_ID, process.env.PAYPAL_PRODUCT_ID))

    if(!flag){
      this.setState({
        notification: notification
      })
    }

    this.props.nextStep()
  }



  render() {
    let notifyDisplays
    console.log("render()->notification: ", this.state.notification)

    notifyDisplays = this.state.notification?.map((notification, index) => {
      return <div key={index}>{notification}</div>
    })



    return (
      <div className="payment-component-wrapper">
        <h1>CardInfoSubmission</h1>

        {/* <div id="paypal-button-container"></div> */}
        {notifyDisplays} <br/>

        <PayPalButton
          createSubscription={async (data, actions) => {
            return this.createSubscription(data, actions)
          }}
          onApprove={(data, actions) => this.onApprove(data, actions)}
        />


        <hr />
        <p>You can unsubscribe anytime by a click of a button on the your profiles page!</p>

        <button onClick={(e) => this.props.setStateStep(3)}> Previous </button>
        {/* <button onClick={(e) => this.props.setStateStep(4)}> Next </button> */}
      </div>
    )
  }
}

export default CardInfoSubmission




