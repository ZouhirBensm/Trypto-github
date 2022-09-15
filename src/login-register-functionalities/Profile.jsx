// import React from 'react';
import './styles/MgtUser.css' 
import CardShell from '../generic-components/CardShell'
import billing_utils from '../../full-stack-libs/utils.billing'


class Profile extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      unsub_popup: undefined,
      errors_popup: []

    }
    console.log("usedUserID: ", this.props.usedUserID)
    console.log("selectedUser: ", this.props.selectedUser)

    this.handleProfileDeletion = this.handleProfileDeletion.bind(this)
    this.paypalUnSub = this.paypalUnSub.bind(this)
  }

  async paypalUnSub(e){
    e.preventDefault()
    console.log("paypal unsub!")
    let response
    response = await fetch(`${process.env.ROOT}/paypal/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        // userId: "WRONG",
        userId: this.props.usedUserID,
        reason: "test_reason",
      })
    })

    let json = await response.json()

    console.log("response, json for paypalUnSub", response, json)

    if(response.status === 200 || response.status === 202) {
      this.setState({
        unsub_popup: json.server.client_message
      })
    } else {
      this.setState({
        unsub_popup: json.error.message.client_message
      })
    }

  }

  

  async handleProfileDeletion(e){
    e.preventDefault()
    console.log("deletion proper uid?", this.props.usedUserID)
    const userId = this.props.usedUserID

    const response = await fetch(`${process.env.ROOT}/users/profile/delete/${userId}`, {
      method: 'DELETE',
    })
    console.log(response)
    //__________________________
    
    const srv_ = await response.json()
    console.log(srv_)

    if(response.status === 200){
      console.log("do we make it here?")
      // TODO #137 Here depending on the page if user account:
      window.location.href = `${process.env.ROOT}?popup=${srv_.srv_}`;
      // TODO #137 if /operations display pop up or go to other page with pop up
    } else {
      this.setState({
        errors_popup: srv_.error.message.admin_message
      })
    }
  }


  render() {
    let error_div = null
    if(this.state.errors_popup) {
      Array.isArray(this.state.errors_popup) ? error_div = (this.state.errors_popup.map((error_msg, i) => {
        return <div key={i} className="error-popup">{error_msg}</div>
      })) : error_div = <div className="error-popup">{this.state.errors_popup}</div>
    }

    if(this.state.unsub_popup) {
      let unsub_popup = document.getElementsByClassName('unsub-popup')[0]
      unsub_popup.innerHTML = this.state.unsub_popup
    }



    // console.log("selectedUser!!!! ", selectedUser, userId)
    // User card information
    let selectedUser = this.props.selectedUser

    let userEmail = selectedUser.email
    let registrationTimeDate = selectedUser.registrationDateTime
    // Subscription card information
    let plan = selectedUser.subscriptionID?.plan
    let subscriptionDateTime = selectedUser.subscriptionID?.subscriptionDateTime
    let [current_billing_cycle_botom_datetime, current_billing_cycle_top_datetime] = billing_utils.BillingDateTimeCalculator(selectedUser.subscriptionID?.subscriptionDateTime)

    return (
      <React.Fragment>
        <CardShell 
          colapsable={true}
          title_card={
            [
              {tag: 'span', content: 'Logged in user: '},
              {tag: 'img', content: '#'},
              {tag: 'span', content: `${userEmail}`},
            ]
          }
          section={
            [
              {prepend: 'userId:', value: `${this.props.usedUserID}`},
              {prepend: 'registrationDatetime:', value: `${registrationTimeDate}`},
            ]
          }
          section_btn={this.handleProfileDeletion}
          section_btn_name="Delete Account"
          wrapper_className="user-info"
          position={0}
        />

        { selectedUser.subscriptionID ? 
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
                ...(selectedUser.subscriptionID?.expireAt ? [{prepend: 'requested subscription termination dateTime:', value: `${selectedUser.subscriptionID.expireAt}`}] : []),
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

        <div className="unsub-popup"></div>
        {error_div}

      </React.Fragment>
    );
  }

}

export default Profile