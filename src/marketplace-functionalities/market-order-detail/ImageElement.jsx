import './style/ImageElement.css'


class ImageElement extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){

    const isMarketOrderFromSeed = /^\*\s/.test(this.props.orderTitle) 
    const image_path = isMarketOrderFromSeed ? `../../img/marketorder-images/seed-images/${this.props.image_name}` : `../../img/marketorder-images/${this.props.orderID}/${this.props.image_name}`


    return (
      <React.Fragment>
        <img className="image-element" src={image_path} alt="test" />
      </React.Fragment>
    )
  }
}

export default ImageElement