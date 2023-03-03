import './styles/MgtUser.css'
import './styles/Profile.css'
import './styles/UserInfo.css'
import '../style/reactDivMobile.css'
import UserInfo from './UserInfo'
import SubscriberInfo from './SubscriberInfo2'

import billing_utils from '../../full-stack-libs/utils.billing'

// HERE TODO !!!!! need to test delete and unsub from operations, then commit changes (commit message: prepared code to add upgrade component), create new branch, work on upgrade functionality!
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

    let popups_div = null
    if (this.state.popups) {
      Array.isArray(this.state.popups) ? popups_div = (this.state.popups.map((popup, i) => {
        return <div key={i} className="popup">{popup}</div>
      })) : popups_div = <div className="popup">{this.state.popups}</div>
    }

    // TODO ! going to need something similar to render the a tag
    // const notifyDisplays = <div dangerouslySetInnerHTML={{ __html:  this.state.notification}}></div>


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
          // selectedUserID={selectedUser._id}

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

            usedUserID={this.props.usedUserID}
            setpopups={this.setpopups}
          /> : null
        }

        

        {popups_div}

      </React.Fragment>
    );
  }




}

export default Profile