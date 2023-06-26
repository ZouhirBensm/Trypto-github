import './styles/UploadImage.css'


class UploadImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.fileInput = React.createRef();
  }

  componentWillUnmount(){
    console.log("...unmounting")
    const input = this.fileInput.current
    let dt = new DataTransfer();
    input.files = dt.files;
  }

  componentDidMount() {
    // console.log("componentDidMount");
    if (this.props.image_file) {
      // console.log("componentDidMount", this.props.image_file);
  
      const input = this.fileInput.current
      let dt = new DataTransfer();
      dt.items.add(this.props.image_file);
      input.files = dt.files;
    }
  }




  render() {
    const displayNoFileChosen = 'No file Chosen'

    return (
      <React.Fragment>
        <div id='box-input' className='image-upload'>

          <label id='upload-button' htmlFor="input-banner-img-id">Upload</label>
          <div>
            {this.props.image_name ?
              this.props.image_name
              :
              displayNoFileChosen
            }
          </div>


          <input ref={this.fileInput} id="input-banner-img-id" type="file" name="image" 
          onChange={(e) => {
            this.props.onClickCallback(e)
          }}
          // onChange={this.props.onClickCallback} 
          required={this.props.required}
          />
        </div>

      </React.Fragment>

      
    )
  }
}

export default UploadImage