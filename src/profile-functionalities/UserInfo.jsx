import ProfileImageUpload from './ProfileImageUpload'
import ImageUploadModalFunction from './ImageUploadModalFunction'
import './styles/UserInfo.css'

import { disable_class_adder_remover_maincards, disable_class_adder_remover_button } from '../front-end-lib/dom-manips-utils/enable-disable-buttons'


class UserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
    this.toogleModal = this.toogleModal.bind(this)
  }

  toogleModal(e = null) {
    e?.preventDefault()
    e?.stopPropagation()

    console.log("toogle")
    const modal = this.state.modal
    this.setState({
      modal: !modal
    }, () => {

      if (this.state.modal) {
        disable_class_adder_remover_maincards('add')
        disable_class_adder_remover_button('add', 'delete-id')
        disable_class_adder_remover_button('add', 'unsub-id')
        disable_class_adder_remover_button('add', 'upgrade-id')
      } else {
        disable_class_adder_remover_maincards('remove')
        disable_class_adder_remover_button('remove', 'delete-id')
        disable_class_adder_remover_button('remove', 'unsub-id')
        disable_class_adder_remover_button('remove', 'upgrade-id')
      }
    })
  }


  render() {

    const date = new Date(this.props.registrationTimeDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return (
      <React.Fragment>
        <div className="main-card user-info">



          <ImageUploadModalFunction
            profile_image_path={this.props.profile_image_path}
            toogleModal={this.toogleModal}
            modal={this.state.modal}
            userName={this.props.userName}
            setpopups={this.props.setpopups}
          />
          {/* <span> {this.props.userName}</span> */}




          <div id="profile-info-container">

            <h2>Email</h2>
            <div>{this.props.userEmail}</div> <br />

            {/* <h2>User ID</h2>
            <div>{this.props.usedUserID}</div> <br /> */}
            
            <h2>Sign up date</h2>
            <div>{formattedDate}</div> <br />

          </div>

        </div>




        {this.state.modal ?
          <ProfileImageUpload
            profile_image_path={this.props.profile_image_path}
            toogleModal={this.toogleModal}
            selectedUserID={this.props.usedUserID}
            setpopups={this.props.setpopups}
            // popups={this.props.popups}
            changeprofileimagename={this.props.changeprofileimagename}
          />
          :
          null
        }


      </React.Fragment>
    )
  }
}

export default UserInfo