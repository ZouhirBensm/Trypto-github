import ProfileImageUpload from '../login-register-functionalities/ProfileImageUpload'
import ImageUploadModalFunction from '../login-register-functionalities/ImageUploadModalFunction'


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
      let maincards = document.getElementsByClassName('main-card')

      if (this.state.modal) {
        for (let i = 0; i < maincards.length; i++) {
          const maincard = maincards[i];
          maincard.classList.add("disable");
        }
        const deleteButton = document.getElementById('delete-id')
        deleteButton.classList.add("disable");
        const unsubButton = document.getElementById('unsub-id')
        unsubButton.classList.add("disable");
      } else {
        for (let i = 0; i < maincards.length; i++) {
          const maincard = maincards[i];
          maincard.classList.remove("disable");
        }
        const deleteButton = document.getElementById('delete-id')
        deleteButton.classList.remove("disable");
        const unsubButton = document.getElementById('unsub-id')
        unsubButton.classList.remove("disable");
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