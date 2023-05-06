import './styles/AboutToSaveImageForProfileRenderer.css'


class AboutToSaveImageForProfileRenderer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount(prevProps, prevState) {
    if (!this.props.file_about_to_save) return
    // There is no file on mount so init is not ran on mount to avoid error. This is thanks to the guard
    this.init()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.file_about_to_save) return
    // Browser does not trigger a onchange if the same file is loaded into the input, therefor this code is not required but kept in case other browsers do trigger an onchange
    if (prevProps?.file_about_to_save === this.props.file_about_to_save) return
    this.init()
  }

  init() {

    var reader = new FileReader();

    // console.log("\n\ninit()->AboutToSaveImageForProfileRenderer: ", this.props)
    let div = document.getElementById(`about-to-save-profile-image-id`)


    // console.log(div)

    div.innerHTML = ""


    reader.onload = function (e) {
      var image = document.createElement("img");
      image.src = e.target.result;
      div.appendChild(image);
      return
    }

    reader.readAsDataURL(this.props.file_about_to_save);


  }


  render() {
    console.log(this.props)

    return (
      <React.Fragment>
        <div id="about-to-save-profile-image-id">
          <img src={this.props.profile_image_path} alt="" />
        </div>
      </React.Fragment>
    )
  }
}

export default AboutToSaveImageForProfileRenderer