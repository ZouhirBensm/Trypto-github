// React way
const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

class CardInfoSubmission extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      notification: [],
    }
    this.BASICPlanRegistrationProcess=this.BASICPlanRegistrationProcess.bind(this)
    this.handleRegistrationCall=this.handleRegistrationCall.bind(this)
  }

  async BASICPlanRegistrationProcess(paypal_subscriptionID, paypal_plan_id, paypal_product_id){
    console.log("BASIC registration")
    let flag, notification
    console.log("actuallly register the user", this.props.email, this.props.password, this.props.plan);
    console.log("paypal_subscriptionID: ", paypal_subscriptionID)
    console.log("paypal_plan_id: ", paypal_plan_id)
    console.log("paypal_product_id: ", paypal_product_id);

    
    ({flag, notification} =  await this.handleRegistrationCall(this.props.email, this.props.password, this.props.plan, paypal_subscriptionID, paypal_plan_id, paypal_product_id));

    if (flag){
      // this.setState({notification: notification})
      this.props.nextStep()
    } else {
      this.setState({notification: notification})
    }
    console.log(flag, notification)

  }


  async handleRegistrationCall (_email, _password, _plan, _paypal_subscriptionID, _paypal_plan_id, _paypal_product_id){
    console.log("Making API call!")
    
    const response = await fetch(`/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: _email,
        password: _password,
        plan: _plan,
        paypal_subscriptionID: _paypal_subscriptionID,
        paypal_plan_id: _paypal_plan_id,
        paypal_product_id: _paypal_product_id,
      })
    })
   
    console.log(response)
    let data = await response.json()
    console.log(data)


    switch (response.status) {
      case 200:
        return {
          flag: true,
          notification: data.server.message
        }
        // update page notification
      case 500:
        return {
          flag: false,
          notification: typeof data.error.message === 'string'? [data.error.message]: data.error.message
        }
      default:
        break;
    }

  }

  // componentDidMount(){
  //   const reference2 = document.getElementById("paypal-button-container")
  //   if(this.props.plan == "BASIC"){
  //     const reference = document.getElementsByClassName("payment-component-wrapper")[0]
  
  //     const script1 = document.createElement("script");
  //     const script2 = document.createElement("script");
  
  //     script1.src = "https://www.paypal.com/sdk/js?client-id=ATXJhXxcZNV30C3S1vll7GE8VfNhZLnRfkz1dfS7ic1PTRQI8k7e8FwQWIOwoFBJs6nMM49JIVnESF_f&vault=true&intent=subscription"
  //     script2.src = "../js/paypalSubscription.js";
  
  //     script1.async = false;
  //     script2.async = false; 
  
      
  //     // document.body.appendChild(script1);
  //     // document.body.appendChild(script2);
  
  //     insertAfter(reference, script1)
  //     insertAfter(reference2, script2)
  
  //     function insertAfter(referenceNode, newNode ) {
  //       console.log(referenceNode.parentNode)
  //       referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  //     }
  //   } else {
  //     reference2.innerHTML = "No payment gateway needed"
  //   }
  // }

  // React way
  async createSubscription(data, actions) {
    // check server is up
    let response = await fetch(`${domain}/isup`)
    let srv_data = await response.json()
    console.log("RESPONSE", response)
    console.log("DATA", srv_data)
    
    // check database is up
    if(response.status === 200){
      return actions.subscription.create({
        'plan_id': process.env.paypal_plan_id
      });
    } else {
      this.setState({notification: srv_data.error.message})
    }
  }

  onApprove(data, actions) {
    // alert('You have successfully created subscription ' + data.subscriptionID); 
    // Optional message given to subscriber
    console.log("ACTIONS: ", actions, "SUBSCRIPTION ID", data.subscriptionID)
    this.BASICPlanRegistrationProcess(data.subscriptionID, process.env.paypal_plan_id, process.env.paypal_product_id)
  }

  render(){

    console.log(typeof this.state.notification)
    let notifyDisplays
    notifyDisplays = this.state.notification?.map((notification, index) => {
      return <div key={index}>{notification}</div>
    })

    console.log(notifyDisplays)

    return (
      <div className="payment-component-wrapper">
        <h1>CardInfoSubmission</h1>

        {/* <div id="paypal-button-container"></div> */}
        { notifyDisplays }
        
        <PayPalButton
          createSubscription={(data, actions) => this.createSubscription(data, actions)}
          onApprove={(data, actions) => this.onApprove(data, actions)}
        />


        <hr/>
        <p>You can unsubscribe anytime by a click of a button on the your profiles page!</p>

        <button onClick={(e) => this.props.setStateStep(2)}> Previous </button>
        {/* <button onClick={(e) => this.props.setStateStep(4)}> Next </button> */}
      </div>
    )
  }
}

export default CardInfoSubmission




