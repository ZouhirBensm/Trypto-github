import './style/ImagesScrollDisplay.css'

import ImageElement from './ImageElement'
import MarketImageNavButtons from './MarketImageNavButtons'

class ImagesScrollDisplay extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      scroll_number: 1
    }
    this.scrollImage = this.scrollImage.bind(this)
  }

  scrollImage(e){
    const last_scroll_number = this.props.images_names?.length
    const iteration = e.target.value
    // console.log(iteration, last_scroll_number)

    if(this.state.scroll_number == last_scroll_number && iteration == 1) return
    if(this.state.scroll_number == 1 && iteration == -1) return

    this.setState((prevState) => ({
      scroll_number: prevState.scroll_number + parseInt(iteration)
    }))
  }


  componentDidUpdate(){
    console.log("--->>", this.state.scroll_number)

    const imageScroll = document.getElementById("image-scroll")

    const imagess = document.getElementsByClassName("image-element")
    // console.log("--->>", imagess[this.state.scroll_number-1])
    const image_to_display = imagess[this.state.scroll_number-1]

    for (let i = 0; i < imagess.length; i++) {
      const image = imagess[i];
      if(i == this.state.scroll_number-1) {
        // set particular style
        image.style.height = "70px"
        continue
      }
      image.style.height = "50px"
      // set default styles
    }
    // JS to display the correct image in the window

  }
  
  render(){

    // console.log("--->", this.state.scroll_number)
    console.log("\n\nTABARNAK!!!")
    console.log(this.props.orderTitle)
    console.log(this.props.images_names)

    const ImageScroll = this.props.images_names?.map((image_name, index)=> {
      return <ImageElement
        key={index}
        image_name={image_name.name}
        orderTitle={this.props.orderTitle}
        orderID={this.props.orderID}
      />
    })


    return (
      <React.Fragment>
        <div id='image-scroll'>
          {/* ImagesScrollDisplay... */}
          {ImageScroll}
        </div>

        <MarketImageNavButtons
          scroll_number={this.state.scroll_number}
          last_scroll_number={this.props.images_names?.length}
          scrollImage={this.scrollImage}
        />
      </React.Fragment>
    )
  }
}

export default ImagesScrollDisplay