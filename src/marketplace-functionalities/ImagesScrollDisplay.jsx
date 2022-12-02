import './style/ImagesScrollDisplay.css'

class ImagesScrollDisplay extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  
  render(){
    console.log("Fuckin images names!!! ", this.props.images_names, ", orderID: ", this.props.orderID)
    return (
      <React.Fragment>
        <div id='image-scroll'>ImagesScrollDisplay...
        </div>
      </React.Fragment>
    )
  }
}

export default ImagesScrollDisplay