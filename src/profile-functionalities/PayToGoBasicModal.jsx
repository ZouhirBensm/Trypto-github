
const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });
const buttonStyle = {
  color: "blue",
  // shape: "rect",
  // label: "paypal",
  // tagline: false
};


class PayToGoBasicModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    console.log("process.env.PAYPAL_PLAN_ID: ", process.env.PAYPAL_PLAN_ID)
    this.upgradeToBASICPlan = this.upgradeToBASICPlan.bind(this)
  }

  async createSubscription(data, actions) {
    return actions.subscription.create({
      'plan_id': process.env.PAYPAL_PLAN_ID
    });
  }

  async onApprove(data, actions) {
    console.log(data.subscriptionID, process.env.PAYPAL_PLAN_ID, process.env.PAYPAL_PRODUCT_ID)

    const didUpgradeToBASICHappen = await this.upgradeToBASICPlan(data.subscriptionID, process.env.PAYPAL_PLAN_ID, process.env.PAYPAL_PRODUCT_ID)

    console.log("\n\nonApprove()->didUpgradeToBASICHappen: ", didUpgradeToBASICHappen)
  }


  async upgradeToBASICPlan(_paypal_subscriptionID, _paypal_plan_id, _paypal_product_id) {

    const response = await fetch(`/paypal/upgrade-plan-to-basic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        userId: this.props.usedUserID,
        paypal_subscriptionID: _paypal_subscriptionID,
        paypal_plan_id: _paypal_plan_id,
        paypal_product_id: _paypal_product_id,
      })
    })


    // const json = await response.json()

    console.log("\n\nupgradeToBASICPlan()->response: ", response)
    // console.log("\n\nupgradeToBASICPlan()->json: ", json)

    if(response.status == 200){
      window.location.reload()
    } else {
      const message = "The upgrade has not been establised on bidblock.ca. Please contact customer service to set you up."
      this.props.handleOutsideClick() // Close modal
      this.props.setpopups(message)
    }

    return
 
  }

  render() {
    return (
      <React.Fragment>
        <PayPalButton
          createSubscription={async (data, actions) => {
            return this.createSubscription(data, actions)
          }}
          onApprove={(data, actions) => this.onApprove(data, actions)}
          style={buttonStyle}
        />
      </React.Fragment>
      // <div id="image-upload-id" className="modal">
      // </div>
    )
  }
}

export default PayToGoBasicModal