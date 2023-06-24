import './styles/UploadImage.css'


class UploadImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }




  render() {
    const displayNoFileChosen = 'No file Chosen'

    return (
      <div id='box-input'>

        <label id='upload-button' htmlFor="input-banner-img-id">Upload</label>
        <div>
          {this.props.image_name ?
            this.props.image_name
            :
            displayNoFileChosen
          }
        </div>


        <input id="input-banner-img-id" type="file" name="image" 
        onChange={(e) => {
          this.props.onClickCallback(e)
        }}
        // onChange={this.props.onClickCallback} 
        required />
      </div>
    )
  }
}

export default UploadImage