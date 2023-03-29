import ProfileImageUpload from '../login-register-functionalities/ProfileImageUpload'
import ImageUploadModalFunction from '../login-register-functionalities/ImageUploadModalFunction'
import {disable_class_adder_remover_maincards, disable_class_adder_remover_button} from '../front-end-lib/dom-manips-utils/enable-disable-buttons'


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
      } else {
        disable_class_adder_remover_maincards('remove')
        disable_class_adder_remover_button('remove', 'delete-id')
        disable_class_adder_remover_button('remove', 'unsub-id')
      }
    })
  }


  render() {

    return (
      <React.Fragment>
        <div className="main-card user-info">
          <div className="title-card">
            <span>Logged in user: </span>
            <ImageUploadModalFunction
              profile_image_path={this.props.profile_image_path}
              toogleModal={this.toogleModal}
              modal={this.state.modal}
            />
            <span> {this.props.userName}</span>
          </div>
          <div className="section">
            <div className="section-wrapper">
              <ul className="section-ul">
                <li>email: {this.props.userEmail}</li>
                <li>userId: {this.props.usedUserID}</li>
                <li>registrationDatetime: {this.props.registrationTimeDate}</li>
              </ul>

            </div>
          </div>
        </div>


        {this.state.modal ?
          <ProfileImageUpload
            toogleModal={this.toogleModal}
            selectedUserID={this.props.usedUserID}
            setpopups={this.props.setpopups}
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