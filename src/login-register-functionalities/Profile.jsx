// import React from 'react';
import './styles/MgtUser.css' 
import CardShell from './CardShell'
import billing_utils from '../../full-stack-libs/utils.billing'


class Profile extends React.Component {

  constructor(){
    super()
    this.state = {
    }
    this.handleProfileDeletion = this.handleProfileDeletion.bind(this)
    this.paypalUnSub = this.paypalUnSub.bind(this)
  }

  async paypalUnSub(e){
    console.log("paypal unsub!")
    let response = await fetch(`${process.env.ROOT}/paypal/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        reason: "test_reason",
      })
    })
    console.log("response for paypalUnSub", response)
  }

  

  async handleProfileDeletion(e){
    e.preventDefault()
    const userId = document.getElementById("userId").innerHTML
    console.log("in handleProfileDeletion(), userId?", userId)

    const response = await fetch(`${process.env.ROOT}/users/profile/delete/${userId}`, {
      method: 'DELETE',
    })
    console.log(response)
    
    const srv_ = await response.json()
    console.log(srv_)

    if(response.status === 200){
      console.log("do we make it here?")
      window.location.href = `${process.env.ROOT}?popup=${srv_.srv_}`;
    } else {
      throw new Error("Server was unable to delete the account.")
    }
  }


  render() {
    console.log("sessionUser!!!! ", sessionUser, userId)
    // User card information
    let userEmail = sessionUser.email
    let registrationTimeDate = sessionUser.registrationDateTime
    // Subscription card information
    let plan = sessionUser.subscriptionID?.plan
    let subscriptionDateTime = sessionUser.subscriptionID?.subscriptionDateTime
    let [current_billing_cycle_botom_datetime, current_billing_cycle_top_datetime] = billing_utils.BillingDateTimeCalculator(sessionUser.subscriptionID?.subscriptionDateTime)

    return (
      <React.Fragment>
        <CardShell 
          colapsable={true}
          title_card={
            [
              {tag: 'span', content: 'Logged in user: '},
              {tag: 'img', content: 'SRC_LINK'},
              {tag: 'span', content: `${userEmail}`},
            ]
          }
          section={
            [
              {prepend: 'userId:', value: `${userId}`},
              {prepend: 'registrationDatetime:', value: `${registrationTimeDate}`},
            ]
          }
          section_btn={this.handleProfileDeletion}
          section_btn_name="Delete Account"
          wrapper_className="user-info"
          position={0}
        />

        { sessionUser.subscriptionID ? 
          <CardShell 
            colapsable={false}
            title_card={
              [
                {tag: 'span', content: 'Subscriber plan: '},
                {tag: 'span', content: `${plan}`},
              ]
            }
            section={
              [
                {prepend: 'plan:', value: `${plan}`},
                {prepend: 'subscription date time:', value: `${subscriptionDateTime}`},
                {prepend: 'next billing dateTime:', value: `${current_billing_cycle_top_datetime}`},
                {prepend: 'paid for current billing cycle:', value: `FROM: ${current_billing_cycle_botom_datetime} TO: ${current_billing_cycle_top_datetime}`},
                ...(sessionUser.subscriptionID?.expireAt ? [{prepend: 'requested subscription termination dateTime:', value: `${sessionUser.subscriptionID.expireAt}`}] : []),
              ]
            }
            section_btn={this.paypalUnSub}
            section_btn_name="Unsubscribe"
            wrapper_className="subscription-info"
            position={1}
          />
          :
          null
        }

      </React.Fragment>
    );
  }

}

export default Profile