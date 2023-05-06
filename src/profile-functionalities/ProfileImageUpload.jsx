import AboutToSaveImageForProfileRenderer from './AboutToSaveImageForProfileRenderer'

import './styles/ProfileImageUpload.css'


class ProfileImageUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image_name_about_to_save: undefined,
      file_about_to_save: undefined,
      popup: undefined
    }
    // console.log(this.props)
  }

  setPopup(popup){
    // TODO !!!! need to add scroll to proper place when this happens
    this.setState({
      popup: popup
    })
  }

  profilePicSaveValidation() {
    let input = document.getElementById('image-select')
    let selectedFile = input.files[0]
    const isThereAFile = !!selectedFile
    return isThereAFile
  }


  componentWillUnmount() {
    let input = document.getElementById('image-select')
    let dt = new DataTransfer()
    input.files = dt.files
  }

  async saveProfilePicture(e) {
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


    let popup;
    switch (response.status) {
      case 200:
        this.props.setpopups(json.message)
        this.props.changeprofileimagename(json.newprofileimagename)
        this.props.toogleModal()
        break;
      case 500:
        // this.props.setpopups(json.error?.message.client_message)
        popup = json.error?.message.client_message

        // TODO !!!! make this into a utils function and use accross all components
        // This is an example of how to determine if array or string, then if array, assign into a string that concatenates the str elements
        // Kept as reference

        // Array.isArray(json.error?.message.client_message) ? 
        // (json.error?.message.client_message.forEach((element_str, i) => {
        //   return popup += element_str + '. '
        // })) : popup = json.error?.message.client_message

        this.setPopup(popup)

        break;
      default:
        // this.props.setpopups(json.error?.message.client_message)
        popup = 'Unexpected Status code.'
        this.setPopup(popup)
        break;
    }

    return

  }


  inputBufferOnChange(e = null) {
    if (!e) return
    // Only triggers on file change (therefor a file is always present), so this guard is not necessary
    if (!e.currentTarget.files[0]) return

    // console.log("onChange!!!", e, '\n', e.target)
    console.log(e.currentTarget.files[0].name)

    this.setState({
      image_name_about_to_save: e.currentTarget.files[0].name,
      file_about_to_save: e.currentTarget.files[0],
      popup: undefined
    })
  }



  render() {

    // TODO !!!! HERE finish styling all the rest of this modal


    const displayNoFileChosen = 'No file Chosen'

    return (
      // if something breaks I might need to add 'modal' as a class name to this  div
      <div id="image-upload-id" className="modal-top-container">

        <div className="modal-content">

          {/* <span className="close" onClick={(e) => {
            this.props.toogleModal(e)
          }}>&times;</span> */}

          <img src="/img/SVG/profile/image-upload-modal/x.svg" alt="" className="close" onClick={(e) => {
            this.props.toogleModal(e)
          }} />

          <h1>Change Image</h1>



          {/* Original */}
          {/* action={`/users/upload/userprofileimage/${this.props.selectedUserID}`} method="post" encType="multipart/form-data" */}
          <form className="form" id="form_id">


            <AboutToSaveImageForProfileRenderer
              file_about_to_save={this.state.file_about_to_save}
              profile_image_path={this.props.profile_image_path}
            />

            <br /><br /><br />

            {/* LABEL: MIGHT USE INSTEAD OF INPUT, if so, set input to display: none */}
            <label id='upload-button2' htmlFor="image-select">Choose File</label>
            <div>
              {this.state.image_name_about_to_save ?
                this.state.image_name_about_to_save
                :
                displayNoFileChosen
              }
            </div>
            



            <br /><br /><br />

            <input id="image-select" type="file" name="image" onChange={(e) => { this.inputBufferOnChange(e) }} />

            <button type="submit" onClick={async (e) => {
              e.preventDefault()
              let ret_validation = this.profilePicSaveValidation()
              if (ret_validation) {
                let ret_apiMakeMarketOrder = await this.saveProfilePicture(e)
                return
              } else {
                const error_msg = `No file was loaded. Please load a file before saving.`
                // this.props.setpopups(error_msg)
                this.setPopup(error_msg)
                return
              }

            }}>Save</button>

          </form>

          <span>
            {this.state.popup? this.state.popup: null}
          </span>


        </div>

      </div>
    )
  }
}

export default ProfileImageUpload