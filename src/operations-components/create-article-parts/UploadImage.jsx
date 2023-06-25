import './styles/UploadImage.css'


class UploadImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    console.log("componentDidMount");
    if (this.props.image_file) {
      console.log("componentDidMount", this.props.image_file);
  
      const input = document.getElementById('input-banner-img-id');
      let dt = new DataTransfer();
      dt.items.add(this.props.image_file);
      input.files = dt.files;
    }
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