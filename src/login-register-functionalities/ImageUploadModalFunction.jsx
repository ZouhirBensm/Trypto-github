class ImageUploadModalFunction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }
  
  render(){
    return (
      <React.Fragment>
        <img src={this.props.profile_image_path} alt="User's profile picture" />
      </React.Fragment>
    )
  }
}

export default ImageUploadModalFunction