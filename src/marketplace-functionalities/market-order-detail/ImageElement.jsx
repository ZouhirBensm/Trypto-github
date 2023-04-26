import './style/ImageElement.css'


class ImageElement extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){

    let path
    
    if (/^\*\s/.test(this.props.orderTitle)) {
      path = 'seed-images'
    } else {
      path = this.props.orderID
    }


    return (
      <React.Fragment>
        <img className="image-element" src={`/img/marketorder-images/${path}/${this.props.image_name}`} alt="test" />
      </React.Fragment>
    )
  }
}

export default ImageElement