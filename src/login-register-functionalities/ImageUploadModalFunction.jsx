// import ProfileImageUpload from '../login-register-functionalities/ProfileImageUpload'

class ImageUploadModalFunction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // modal: false
    }
    this.exitUploadModal = this.exitUploadModal.bind(this)
    // this.toogleProfilePicUploadModal = this.toogleProfilePicUploadModal.bind(this)

  }


  componentDidMount() {
    let img = document.querySelector('img')
    img.onclick = (e) => {
      // this.toogleProfilePicUploadModal(e)
      this.props.toogleModal(e)
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



  // toogleProfilePicUploadModal(e = null) {
  //   e?.preventDefault()
  //   e?.stopPropagation()


  //   const toogleWorked = this.props.toogleModal()

  // }


  exitUploadModal(e) {

    const arr_of_HTMLElements_parents = e.path || e.composedPath()
    // e.stopPropagation()


    let didFindModal = arr_of_HTMLElements_parents.filter(element => { return element.id == 'myModal' })
    // let didFindModal = e.composedPath().filter(element => { return element.id == 'myModal' })


    // console.log("exitUploadModal->didFindModal:", didFindModal)

    if (!didFindModal[0]) {
      // Exterior click
      // console.log("BAM")
      if (this.props.modal == false) return
      // Modal visible
      // return this.toogleProfilePicUploadModal(e)
      return this.props.toogleModal()
    }
  }



  render(){
    return (
      <React.Fragment>
        <img src={this.props.profile_image_path} alt="User's profile picture" />

        {/* {this.state.modal ?
          <ProfileImageUpload
            toogleProfilePicUploadModal={this.toogleProfilePicUploadModal}
            selectedUserID={this.props.usedUserID}
            setpopups={this.props.setpopups}
            changeprofileimagename={this.props.changeprofileimagename}
          />
          :
          null
        } */}

      </React.Fragment>
    )
  }
}

export default ImageUploadModalFunction