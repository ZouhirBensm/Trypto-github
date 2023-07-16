import './styles/ImageUploadModalFunction.css'

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
    // let img = document.querySelector('img')
    let profileImgContainer = document.getElementById('profile-image-container')
    profileImgContainer.onclick = (e) => {
      // this.toogleProfilePicUploadModal(e)
      this.props.toogleModal(e)
      this.props.setpopups(undefined)
    }

    document.addEventListener('click', (e) => {
      const modal = document.getElementById("image-upload-id")
      // Click within modal, just return
      const contains = modal?.contains(e.target)
      if (contains) {
        return
      }
      this.exitUploadModal(e)
    })
  }


  exitUploadModal(e) {
    const arr_of_HTMLElements_parents = e.path || e.composedPath()
    // e.stopPropagation()


    let didFindModal = arr_of_HTMLElements_parents.filter(element => { return element.id == 'image-upload-id' })
    // let didFindModal = e.composedPath().filter(element => { return element.id == 'image-upload-id' })


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

  render() {
    return (
      <React.Fragment>
        <div id="profile-image-container">
          <img src={this.props.profile_image_path} alt="User's profile picture" />
          <span>{this.props.userName}</span>
          <div>Change image <img src="/img/SVG/profile/user-info/upload.svg" alt=""/></div>
        </div>
      </React.Fragment>
    )
  }
}

export default ImageUploadModalFunction