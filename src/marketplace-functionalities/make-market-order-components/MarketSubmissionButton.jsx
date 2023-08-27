import '../style/MarketSubmissionButton.css'


// TODO Have to rewrite entire error handling, not able to catch error when nginx memory limit exceeded. I have to normalize when from json errors to normal error accross the app of figure out a way to handle both

class MarketSubmissionButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log("userId-->", userId)
  }

  componentDidMount(){
    var marketSubmitButton = document.getElementById("market-submit")
    marketSubmitButton.disabled = true
    const rand_delta = Number((Math.random() * 100).toFixed(2))
    const fake_delay = 1000 + rand_delta

    setTimeout(()=>{
      marketSubmitButton.disabled = false
    }, fake_delay)
  }

  // TODO put this as a utils and have every call reference it!
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
      const reactDiv = document.getElementById("react-div")
      reactDiv.scrollTo(0, reactDiv.scrollHeight);
      return false
    } else { return true }
  }


  render() {

    return (
      <button type="submit" id="market-submit" onClick={async (e) => {
        e.preventDefault()
        let ret_validation = this.finalSubmissionValidation()

        if (ret_validation) {

          let ret_apiMakeMarketOrder
          try {
            ret_apiMakeMarketOrder = await this.apiMakeMarketOrder()
          } catch (error) {
            console.error('CAUGHT: ', error)
            const err_message = 'Server error. Try again later.'
            this.props.setpopup(err_message)
            const reactDiv = document.getElementById("react-div")
            reactDiv.scrollTo(0, reactDiv.scrollHeight);
          }

          return
        } else {
          return
        }
      }}>Add Article</button>
    )
  }


  async apiMakeMarketOrder() {
    const hny_spm = document.getElementById("form_id").elements["hny_spm"].value
    if (hny_spm != ""){
      const rand_delta = Number((Math.random() * 100).toFixed(2))
      const fake_api_delay = 900 + rand_delta
      setTimeout(()=>{
        this.props.setpopup("Done, success.")
        const reactDiv = document.getElementById("react-div")
        reactDiv.scrollTo(0, reactDiv.scrollHeight);
        return
      },
      fake_api_delay)
      return
    }

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
            if (value === undefined) break;
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
      response = await fetch(`/marketplace/sellorders/save/${userId}`, {
        method: 'POST',
        body: formData
      })
    } catch (error) {
      return error
    }

    json = await response.json()

    console.log("Server reponse object json:", json)

    switch (response.status) {
      case 200:
        // this.props.setpopup(json.server?.message)
        // this.props.setStateStep(1, json.server?.message)
        window.location.href = `/marketplace/sellordersdata?popup=${json.server?.message}`
        break;
      case 500:
        this.props.setpopup(json.error?.message?.client_message)
        break;
      default:
        this.props.setpopup(json.error?.message?.client_message)
        break;
    }

    const reactDiv = document.getElementById("react-div")
    reactDiv.scrollTo(0, reactDiv.scrollHeight);

  }
}

export default MarketSubmissionButton