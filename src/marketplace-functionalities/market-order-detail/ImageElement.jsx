import './style/ImageElement.css'


class ImageElement extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return (
      <React.Fragment>
        {/* <div>ImageElement...</div> */}
        <img className="image-element" src={`../../img/marketorder-images/${this.props.orderID}/${this.props.image_name}`} alt="test" />
      </React.Fragment>
    )
  }
}

export default ImageElement