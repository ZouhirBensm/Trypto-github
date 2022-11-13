
import React from 'react'
import '../style/reactDivMobile.css'


// Image sources: https://unsplash.com/

class _4_InputImagesMarketOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // images: []
    }
    // console.log("--->>>>", this.props.image_uploaded)
  }

  // componentDidMount() {
  //   this.amountsToCalculatorChange()
  // }
  // componentDidMount() {

  //   let autocomplete = window.autocomplete
  //   autocomplete.addListener('place_changed', this.onPlacedChanged)
  // }

  // componentDidMount() {
  //   let marker = window.marker

  //   marker.addListener("dragend", () => {
  //     this.props.changeStateLocationParent({
  //       lat: marker.getPosition().lat(),
  //       lng: marker.getPosition().lng(),
  //     })
  //   });
  // }




  // componentDidUpdate(prevProp, prevState) {
  //   if (prevProp.price !== this.props.price ||
  //     prevProp.onBTCvaluation !== this.props.onBTCvaluation) {
  //     this.amountsToCalculatorChange()
  //   }
  // }

  // componentDidUpdate(prevProp) {
  //   if (this.props.newLocation.lat === prevProp.newLocation.lat && this.props.newLocation.lng === prevProp.newLocation.lng) {
  //   } else {
  //     this.updateInputField()
  //   }
  // }


  // componentDidUpdate(prevProp) {

  //   if (this.props.newLocation.lat === prevProp.newLocation.lat && this.props.newLocation.lng === prevProp.newLocation.lng) {
  //   } else {
  //     this.setMarker()
  //   }
  // }


  // componentDidUpdate(prevProp) {
  //   if (this.props.newLocation.lat === prevProp.newLocation.lat && this.props.newLocation.lng === prevProp.newLocation.lng) {
  //   } else {
  //     this.reCenterMap()
  //   }
  // }



  componentDidUpdate(prevProp, prevState) {
    if (prevProp.images !== this.props.images) {
      console.log("UPDATE!!")
    }
  }


  // updateUI() {
  //   let UI

  //   UI = this.state.images.map((image, index) => {
  //     let item_number = image.split("-")[1]
  //     return <React.Fragment key={index}>
  //       <span>{image}</span>
  //       <button onClick={(e) => { this.reduceimage(item_number) }}>X</button><br />
  //     </React.Fragment>
  //   })
  //   return UI
  // }

  updateUI() {
    let UI

    console.log("--->", this.props.images)
    UI = this.props.images.map((image, index) => {
      let item_number = image.split("-")[1]
      return <React.Fragment key={index}>
        <span>{image}</span>
        <button onClick={(e) => {
          let reduceimage = this.reduceimage(item_number)
          console.log(reduceimage)
          return
        }}>X</button>
        <br />
      </React.Fragment>
    })
    return UI
  }


  addimage(e) {

    const max_img_popup = "You have reached maximum amount of image uploads"
    if (this.props.images.length > 4) return max_img_popup

    var val = Math.floor(1000 + Math.random() * 9000);
    console.log(val);

    // State update's UI
    this.props.handleimages([...this.props.images, `Item-${val}`])

    return undefined

  }


  reduceimage(item_number_to_reduce) {
    console.log(`Reduce this ${item_number_to_reduce}`)

    let imagesArr = this.props.images.filter((image) => { return image.split("-")[1] != item_number_to_reduce })

    // State update's UI
    this.props.handleimages(imagesArr)
    return undefined
  }



  render() {

    let UI = this.updateUI()


    return (
      <React.Fragment>

        <div>
          {UI}
        </div>

        <button onClick={(e) => {
          let ret_addimage = this.addimage()
          console.log(ret_addimage)
          return
        }}>Add Image</button>



        <br /><br /><br />
        <button onClick={(e) => {
          this.props.previousStep(e)
        }}>Previous</button>
      </React.Fragment>
    )
  }
}

export default _4_InputImagesMarketOrder
