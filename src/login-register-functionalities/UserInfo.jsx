import ProfileImageUpload from '../login-register-functionalities/ProfileImageUpload'
import ImageUploadModalFunction from '../login-register-functionalities/ImageUploadModalFunction'

class UserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
    this.exitUploadModal = this.exitUploadModal.bind(this)
    this.toogleProfilePicUploadModal = this.toogleProfilePicUploadModal.bind(this)

    this.handleProfileDeletion = this.handleProfileDeletion.bind(this)
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

    console.log("handleProfileDeletion: response, srv_: ", response, srv_)

    if (response.status === 200) {

      
      if (srv_.referer === "users") {
        // console.log(`/?popup=${srv_.srv_}`)
        window.location.href = `/?popup=${srv_.srv_}`;
        return
      }
      
      if (srv_.referer === "operations") {
        window.location.href = `/operations/manage-subs`;
        return
      }

      let error = new Error("Delete succeeded, but the response srv_.referer does not match the registed ones!")
      console.error(error)
      return

    } else {
      this.props.setpopups(srv_.error.message.admin_message)
      return
    }
  }


  toogleProfilePicUploadModal(e = null) {
    e?.preventDefault()
    e?.stopPropagation()
    let modal = this.state.modal


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


  exitUploadModal(e) {

    const arr_of_HTMLElements_parents = e.path || e.composedPath()
    // e.stopPropagation()


    let didFindModal = arr_of_HTMLElements_parents.filter(element => { return element.id == 'myModal' })
    // let didFindModal = e.composedPath().filter(element => { return element.id == 'myModal' })


    // console.log("exitUploadModal->didFindModal:", didFindModal)

    if (!didFindModal[0]) {
      // Exterior click
      // console.log("BAM")
      if (this.state.modal == false) return
      // Modal visible
      return this.toogleProfilePicUploadModal(e)
    }
  }

  componentDidMount() {
    let img = document.querySelector('img')
    img.onclick = (e) => {
      this.toogleProfilePicUploadModal(e)
    }

    document.addEventListener('click', (e) => {
      const modal = document.getElementById("myModal")
      // Click within modal, just return
      const contains = modal?.contains(e.target)
      if (contains) {
        return
      }
      this.exitUploadModal(e)
    })
  }



  render() {

    return (
      <React.Fragment>
        <div className="main-card user-info">
          <div className="title-card">
            <span>Logged in user: </span>
            <ImageUploadModalFunction
              profile_image_path = {this.props.profile_image_path}
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

              <button onClick={(e) => {
                try {
                  this.handleProfileDeletion(e)
                } catch (error) {
                  console.log("Error on delete button: ", error)
                }
              }}>Delete Account</button>
            </div>
          </div>
        </div>

        {this.state.modal ?
          <ProfileImageUpload
            toogleProfilePicUploadModal={this.toogleProfilePicUploadModal}
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