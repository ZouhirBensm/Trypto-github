
import axios from "axios"

class MarketSubmissionButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  makeArrayOutOf(selectedFiles) {
    let selectedFilesArray = []
    for (const FileKey in selectedFiles) {
      if (isNaN(parseInt(FileKey))) continue
      selectedFilesArray.push(selectedFiles[FileKey])
    }
    return selectedFilesArray
  }


  finalSubmissionValidation() {
    let input = document.getElementById('image-select')
    let selectedFiles = input.files
    let selectedFilesArr = this.makeArrayOutOf(selectedFiles)

    let error_msg_retrieved_if_any

    if (selectedFilesArr.length == 0) {
      let error_msg = "No images have been uploaded, submission requires at least one image."
      error_msg_retrieved_if_any = error_msg
    }

    if (error_msg_retrieved_if_any) {
      this.props.setpopup(error_msg_retrieved_if_any)
      return false
    } else { return true }
  }




  render() {

    return (
      <button type="submit" onClick={async (e) => {
        e.preventDefault()
        let ret_validation = this.finalSubmissionValidation()

        if (ret_validation) {
          let ret_apiMakeMarketOrder = await this.apiMakeMarketOrder()
          return
        } else {
          return
        }

      }}>SUBMIT THE MARKET ORDER</button>
    )
  }


  async apiMakeMarketOrder() {

    let input = document.getElementById('image-select')
    let selectedFiles = input.files

    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("image", selectedFiles[i])
    }

    console.log(this.props.formData)

    for (const name in this.props.formData) {
      if (Object.hasOwnProperty.call(this.props.formData, name)) {
        const value = this.props.formData[name];
        switch (name) {
          case 'filelist':
          case 'images':
          case 'popup_state':
          case 'step':
            break;
          case 'lat':
          case 'lng':
            formData.append(name, parseFloat(value));
            break;
          default:
            formData.append(name, value);
            break;
        }
        
      }
    }


    let uuid = self.crypto.randomUUID();
    formData.append("req_uuid", uuid);






    let response
    let json

    try {
      response = await fetch(`/marketplace/sellorders/save`, {
        method: 'POST',
        body: formData
      })
    } catch (error) {
      console.error(error)
    }

    let text = await response.text()
    console.log(response, text)

  }
}

export default MarketSubmissionButton