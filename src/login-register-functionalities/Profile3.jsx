// import React from 'react';
import './styles/MgtUser.css'
import './styles/Profile.css'
import './styles/UserInfo.css'
import '../style/reactDivMobile.css'
import UserInfo from './UserInfo'
import SubscriberInfo from './SubscriberInfo'

import billing_utils from '../../full-stack-libs/utils.billing'

class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      popups: undefined,
      profileimagename: this.props.profileimagename,
      imageHash: Date.now()
    }
    // console.log("usedUserID: ", this.props.usedUserID)
    // console.log("profileimagename: ", this.props.profileimagename)
    // console.log("selectedUser: ", this.props.selectedUser)
    this.handleProfileDeletion = this.handleProfileDeletion.bind(this)
    this.paypalUnSub = this.paypalUnSub.bind(this)
    this.setpopups = this.setpopups.bind(this)
    this.changeprofileimagename = this.changeprofileimagename.bind(this)
  }

  changeprofileimagename(newimageName){
    this.setState({
      profileimagename: newimageName,
      imageHash: Date.now()
    })
  }


  setpopups(popups) {
    this.setState({
      popups: popups
    })
  }








  render() {
    console.log("TRIGGER RERENDER!")

    let popups_div = null
    if (this.state.popups) {
      Array.isArray(this.state.popups) ? popups_div = (this.state.popups.map((popup, i) => {
        return <div key={i} className="popup">{popup}</div>
      })) : popups_div = <div className="popup">{this.state.popups}</div>
    }


    let selectedUser = this.props.selectedUser
    let userName = selectedUser.username
    let userEmail = selectedUser.email
    let registrationTimeDate = selectedUser.registrationDateTime
    // Subscription card information
    let plan = selectedUser.subscriptionID?.plan
    let subscriptionDateTime = selectedUser.subscriptionID?.subscriptionDateTime
    let paypalsubscriptionID = selectedUser.subscriptionID?.paypal_subscriptionID
    let [current_billing_cycle_botom_datetime, current_billing_cycle_top_datetime] = billing_utils.BillingDateTimeCalculator(selectedUser.subscriptionID?.subscriptionDateTime)

    return (
      <React.Fragment>
        <UserInfo
          userName={userName}
          userEmail={userEmail}
          usedUserID={this.props.usedUserID}
          profile_image_path={`/img/profile-images/${this.state.profileimagename}?${this.state.imageHash}`}
          registrationTimeDate={registrationTimeDate}

          // NOT NEEDED
          selectedUserID={selectedUser._id}

          section_btn={this.handleProfileDeletion}
          setpopups={this.setpopups}
          changeprofileimagename={this.changeprofileimagename}

        />
        {selectedUser.subscriptionID ?
          <SubscriberInfo
            plan={plan}
            username={userName}
            paypalsubscriptionID={paypalsubscriptionID}

            subscriptionDateTime={subscriptionDateTime}
            current_billing_cycle_botom_datetime={current_billing_cycle_botom_datetime.toString()}

            current_billing_cycle_top_datetime={current_billing_cycle_top_datetime.toString()}

            subscriptionExpiresAt={selectedUser.subscriptionID?.expireAt}

            registrationTimeDate={registrationTimeDate}

            section_btn={this.paypalUnSub}
          /> : null
        }

        {popups_div}

      </React.Fragment>
    );
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
      this.setState({
        popups: json.server.client_message
      })
    } else {
      this.setState({
        popups: json.error.message.client_message
      })
    }

  }



  async handleProfileDeletion(e) {
    e.preventDefault()
    const userId = this.props.usedUserID

    let response
    response = await fetch(`/users/profile/delete/${userId}`, {
      method: 'DELETE',
    })


    let srv_
    srv_ = await response.json()

    console.log(response, srv_)

    if (response.status === 200) {
      console.log("do we make it here?")
      // TODO #137 Here depending on the page if user account:
      window.location.href = `/?popup=${srv_.srv_}`;
      // TODO #137 if /operations display pop up or go to other page with pop up
    } else {
      this.setState({
        popups: srv_.error.message.admin_message
      })
    }
  }


}

export default Profile