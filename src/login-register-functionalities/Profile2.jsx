// import React from 'react';
import './styles/MgtUser.css'
import './styles/Profile.css'
import './styles/CardShell.css'
import CardShell from '../generic-components/CardShell'
import billing_utils from '../../full-stack-libs/utils.billing'


class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      popups: undefined,
      modal: false
    }
    // console.log("usedUserID: ", this.props.usedUserID)
    // console.log("selectedUser: ", this.props.selectedUser)
    this.handleProfileDeletion = this.handleProfileDeletion.bind(this)
    this.paypalUnSub = this.paypalUnSub.bind(this)
    this.toogleImageUploadModal = this.toogleImageUploadModal.bind(this)
    this.somefunc = this.somefunc.bind(this)
  }



  somefunc(e) {
    console.log("interface clicked!!!", e)
    // let clicked = e.path.includes(element.id == 'myModal')
    let didFindModal = e.path.filter(element => { return element.id == 'myModal' })
    if (!didFindModal[0]) {
      if (this.state.modal == false) return
      return this.toogleImageUploadModal(e)
    }
  }

  componentDidMount() {
    document.addEventListener('click', (e) => this.somefunc(e))
  }

  toogleImageUploadModal(e) {
    e.preventDefault()
    e.stopPropagation()
    let modal = this.state.modal
    console.log(e.srcElement)
    if (e.currentTarget.localName == 'img' && modal == true) return
    return this.setState({
      modal: !modal
    }, () => {
      let maincards = document.getElementsByClassName('main-card')

      if (this.state.modal) {
        maincards[0].classList.add("disable2");
        maincards[1].classList.add("disable2");
      } else {
        maincards[0].classList.remove("disable2");
        maincards[1].classList.remove("disable2");
      }
    })
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


  render() {
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
        <CardShell
          colapsable={true}
          title_card={
            [
              { tag: 'span', content: 'Logged in user: ' },
              { tag: 'img', content: '/img/profile-images/square.jpg' },
              { tag: 'span', content: `${userName}` },
            ]
          }
          section={
            [
              { prepend: 'email:', value: `${userEmail}` },
              { prepend: 'userId:', value: `${this.props.usedUserID}` },
              { prepend: 'registrationDatetime:', value: `${registrationTimeDate}` },
            ]
          }
          section_btn={this.handleProfileDeletion}
          section_btn_name="Delete Account"
          wrapper_className="user-info"
          position={0}
          toogleImageUploadModal={this.toogleImageUploadModal}
          modal={this.state.modal}
        />

        {selectedUser.subscriptionID ?
          <CardShell
            colapsable={false}
            title_card={
              [
                { tag: 'span', content: 'Subscriber plan: ' },
                { tag: 'span', content: `${plan}` },
              ]
            }
            section={
              [
                { prepend: `On BidBlock, ${userName}'s plan:`, value: `${plan}` },
                { prepend: "On Paypal, Subscription ID:", value: `${paypalsubscriptionID}` },
                { prepend: 'Subscription date time:', value: `${subscriptionDateTime}` },
                { prepend: 'Next billing dateTime:', value: `${current_billing_cycle_top_datetime}` },
                { prepend: 'Paid for current billing cycle:', value: `FROM: ${current_billing_cycle_botom_datetime} TO: ${current_billing_cycle_top_datetime}` },
                ...(selectedUser.subscriptionID?.expireAt ? [{ prepend: 'requested subscription termination dateTime:', value: `${selectedUser.subscriptionID.expireAt}` }] : []),
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

        {popups_div}

      </React.Fragment>
    );
  }

}

export default Profile