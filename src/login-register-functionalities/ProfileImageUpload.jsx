
// TODO !!!! image format validation HERE !

class ProfileImageUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log(this.props)
  }


  componentWillUnmount() {
    // Empties input, might not be needed
    let input = document.getElementById('image-select')
    let dt = new DataTransfer()
    input.files = dt.files
  }

  async saveProfilePicture(){
    console.log("SAVE!!")
    
    let input = document.getElementById('image-select')
    let selectedFile = input.files[0]
    const formData = new FormData();
    formData.append("image", selectedFile)

    let response
    // TODO get rid of error handling in all of my fetchs
    // Best practices https://stackoverflow.com/questions/54163952/async-await-in-fetch-how-to-handle-errors
    response = await fetch(`/users/upload/userprofileimage/${this.props.selectedUserID}`, {
      method: 'POST',
      body: formData
    })

    let json
    json = await response.json()

    console.log(response, json)

    switch (response.status) {
      case 200:
        this.props.setpopups(json.message)
        this.props.changeprofileimagename(json.newprofileimagename)
        break;
      case 500:
        this.props.setpopups(json.error?.message.client_message)
        break;
      default:
        this.props.setpopups(json.error?.message.client_message)
        break;
    }

    return

  }

  render() {
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={(e) => {
            this.props.toogleImageUploadModal(e)
          }}>&times;</span>


          {/* Original */}
          {/* action={`/users/upload/userprofileimage/${this.props.selectedUserID}`} method="post" encType="multipart/form-data" */}
          <form className="form" id="form_id">
            <input id="image-select" type="file" name="image"/>

            <button type="submit" onClick={ async (e) => {
              e.preventDefault()
              // let ret_validation = this.finalSubmissionValidation()
              // if (ret_validation) {
              if (true) {
                let ret_apiMakeMarketOrder = await this.saveProfilePicture()
                return
              } else {
                return
              }

            }}>Save</button>
          </form>


        </div>
      </div>
    )
  }
}

export default ProfileImageUpload