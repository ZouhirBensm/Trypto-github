import ProfileImageUpload from '../login-register-functionalities/ProfileImageUpload'

class UserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
    this.exitUploadModal = this.exitUploadModal.bind(this)
    this.toogleProfilePicUploadModal = this.toogleProfilePicUploadModal.bind(this)
  }


  toogleProfilePicUploadModal(e) {
    e.preventDefault()
    e.stopPropagation()
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
    let didFindModal = e.path.filter(element => { return element.id == 'myModal' })

    console.log(didFindModal)

    if (!didFindModal[0]) {
      // Exterior click
      console.log("BAM")
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

    document.addEventListener('click', (e) => this.exitUploadModal(e))

    let Section = document.getElementsByClassName('section')[0]
    Section.style.display = "none";
  }



  render() {

    return (
      <React.Fragment>
        <div className="main-card user-info">
          <div className="title-card" onClick={(e) => {

            let Section = document.getElementsByClassName("section")[0]
            if (Section.style.display === "none") {
              Section.style.display = "block";
            } else {
              Section.style.display = "none";
            }
          }}>
            <span>Logged in user: </span>
            <img src={this.props.profile_image_path} alt="User's profile picture"/>
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
                this.props.section_btn(e)
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