import './styles/UploadBannerImage.css'


class UploadBannerImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  inputBufferOnChange = (e = null) => {
    if (!e) return
    // Only triggers on file change (therefor a file is always present), so this guard is not necessary
    if (!e.currentTarget.files[0]) return

    // console.log("onChange!!!", e, '\n', e.target)
    console.log(e.currentTarget.files[0].name)


    const banner_image_name = e.currentTarget.files[0].name
    const banner_image_file = e.currentTarget.files[0]
    this.props.setStateBannerImage(banner_image_name, banner_image_file)


  }

  render() {
    const displayNoFileChosen = 'No file Chosen'

    return (
      <div id='box-input'>

        <label id='upload-button' htmlFor="input-banner-img-id">Upload</label>
        <div>
          {this.props.banner_image_name ?
            this.props.banner_image_name
            :
            displayNoFileChosen
          }
        </div>

        {/* TEMPORAL */}
        {/* required */}
        <input id="input-banner-img-id" type="file" name="image" onChange={(e) => { this.inputBufferOnChange(e) }} />
      </div>
    )
  }
}

export default UploadBannerImage