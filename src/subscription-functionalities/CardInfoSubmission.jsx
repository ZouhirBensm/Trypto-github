// React way
const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

class CardInfoSubmission extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
    // this.functionn=this.functionn.bind(this)
  }

  // componentDidMount(){
  //   const reference2 = document.getElementById("paypal-button-container")
  //   if(this.props.plan == "basic"){
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
  createSubscription(data, actions) {
    return actions.subscription.create({
      // TODO environment variable plan ID
      'plan_id': 'P-8K2448559P9609535MMAPYHA'
    });
  }

  onApprove(data, actions) {
    // alert('You have successfully created subscription ' + data.subscriptionID); 
    // Optional message given to subscriber
    console.log("ACTIONS: ", actions)
    this.props.nextStep()
  }

  render(){
    return (
      <div className="payment-component-wrapper">
        {/* TODO Environment variable client ID */}
  
        <h1>CardInfoSubmission</h1>

        <div id="paypal-button-container"></div>
        
        {/* React way */}
        <PayPalButton
          createSubscription={(data, actions) => this.createSubscription(data, actions)}
          onApprove={(data, actions) => this.onApprove(data, actions)}
        />

        <p>You can unsubscribe anytime by a click of a button on the your profiles page!</p>

        <button onClick={(e) => this.props.setStateStep(2)}> Previous </button>
        {/* <button onClick={(e) => this.props.setStateStep(4)}> Next </button> */}
      </div>
    )
  }
}

export default CardInfoSubmission




