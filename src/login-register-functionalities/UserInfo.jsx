import ProfileImageUpload from '../login-register-functionalities/ProfileImageUpload'
import ImageUploadModalFunction from '../login-register-functionalities/ImageUploadModalFunction'
import DeleteAccount from '../login-register-functionalities/DeleteAccount'

class UserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
    this.toogleModal = this.toogleModal.bind(this)
    // this.handleProfileDeletion = this.handleProfileDeletion.bind(this)
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
      } else {
        for (let i = 0; i < maincards.length; i++) {
          const maincard = maincards[i];
          maincard.classList.remove("disable");
        }
      }
    })
  }

  // async handleProfileDeletion(e) {
  //   e.preventDefault()
  //   const userId = this.props.usedUserID

  //   let response
  //   response = await fetch(`/users/profile/delete/${userId}`, {
  //     method: 'DELETE',
  //   })


  //   let srv_
  //   srv_ = await response.json()

  //   console.log("handleProfileDeletion: response, srv_: ", response, srv_)

  //   if (response.status === 200) {


  //     if (srv_.referer === "users") {
  //       // console.log(`/?popup=${srv_.srv_}`)
  //       window.location.href = `/?popup=${srv_.srv_}`;
  //       return
  //     }

  //     if (srv_.referer === "operations") {
  //       window.location.href = `/operations/manage-subs`;
  //       return
  //     }

  //     let error = new Error("Delete succeeded, but the response srv_.referer does not match the registed ones!")
  //     console.error(error)
  //     return

  //   } else {
  //     this.props.setpopups(srv_.error.message.admin_message)
  //     return
  //   }
  // }

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

              <DeleteAccount
                usedUserID={this.props.usedUserID}
                setpopups={this.props.setpopups}
              />
              {/* <button onClick={(e) => {
                try {
                  this.handleProfileDeletion(e)
                } catch (error) {
                  console.log("Error on delete button: ", error)
                }
              }}>Delete Account</button> */}
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