
import ImageElement from './ImageElement'
import MarketImageNavButtons from './MarketImageNavButtons'

import './style/ImagesScrollDisplay.css'

class ImagesScrollDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scroll_number: 1
    }
    this.scrollImage = this.scrollImage.bind(this)
  }

  scrollImage(e) {
    const last_scroll_number = this.props.images_names?.length
    const iteration = e.target.value
    // console.log(iteration, last_scroll_number)

    if (this.state.scroll_number == last_scroll_number && iteration == 1) return
    if (this.state.scroll_number == 1 && iteration == -1) return


    this.setState((prevState) => ({
      scroll_number: prevState.scroll_number + parseInt(iteration)
    }))
  }


  componentDidUpdate() {
    console.log("componentDidUpdate--->>", this.state.scroll_number)

    const imageScroll = document.getElementById("image-scroll")

    const divImages = document.getElementsByClassName("image-element")
    // console.log("--->>", divImages[this.state.scroll_number-1])
    const image_to_display = divImages[this.state.scroll_number - 1]

    let buttonPrevious = document.querySelector('button#previous')
    let buttonNext = document.querySelector('button#next')

    for (let i = 0; i < divImages.length; i++) {
      const divImage = divImages[i];
      let image = divImage.firstChild

      if (i == this.state.scroll_number - 1) {

        divImage.appendChild(buttonPrevious)
        divImage.appendChild(buttonNext)

        
        image.style.width = "100%"
        image.style.height = "auto"


        divImage.style.position = "relative"
        divImage.style.order = "-1"
        divImage.style.width = "100%"
        divImage.style.overflow = 'unset'



        buttonPrevious.style.top = '50%'
        buttonNext.style.top = '50%'

        buttonPrevious.style.left = 0
        buttonNext.style.right = 0

        continue
      }
      
      // Leave comment
      // image.style.backgroundSize = "cover"
      
      // image.style.width = "100px"
      image.style.height = "100px"
      
      divImage.style.position = "unset"
      divImage.style.order = `${i}`
      divImage.style.width = "100px"
      divImage.style.overflow = 'hidden'



    }

  }

  render() {

    // console.log("--->", this.state.scroll_number)

    // console.log(this.props.orderTitle)
    // console.log(this.props.images_names)


    return (
      <React.Fragment>
        <div id='image-scroll'>
          {/* ImagesScrollDisplay... */}

          {/* {ImageScroll} */}

          {this.props.images_names?.map((image_name, index) => {
            return <ImageElement
              key={index}
              image_name={image_name.name}
              orderTitle={this.props.orderTitle}
              orderID={this.props.orderID}
            />
          })}

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