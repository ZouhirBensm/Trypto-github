
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

    UI = this.props.images.map((image_name, index) => {
      // let item_number = image_name.split("-")[1]
      return <React.Fragment key={index}>
        <span>{image_name}</span>
        <button onClick={(e) => {
          e.preventDefault()
          let reduceimage = this.reduceimage(image_name, e)
          return
        }}>X</button>
        <br />
      </React.Fragment>
    })
    return UI
  }


  addimages(e= null) {

    let input = document.getElementById('image-select')
    let selectedFile = input.files

    // input.value = ""
    const dt = new DataTransfer()

    for (const property in selectedFile) {
      if (isNaN(parseInt(property))) break
      if(parseInt(property) == 5) {
        const max_img_popup = "You have reached maximum amount of image uploads"
        console.log("popup??: ", max_img_popup);
        break;
      }

      dt.items.add(selectedFile[property])
    }
    
    input.files = dt.files
    

    
    let files_names = []

    for (const property in dt.files) {
      if (isNaN(parseInt(property))) break
      files_names.push(dt.files[property].name)
    }

    let ret_handleimages = this.props.handleimages(files_names)




    // const max_img_popup = "You have reached maximum amount of image uploads"
    // if (this.props.images.length > 4) return max_img_popup

    // var val = Math.floor(1000 + Math.random() * 9000);
    // console.log(val);

    // // State update's UI
    // this.props.handleimages([...this.props.images, `Item-${val}`])

    // return undefined

  }


  reduceimage(_image_name, e) {
    const dt = new DataTransfer()

    let input = document.getElementById('image-select')
    let selectedFile = input.files
    console.log(selectedFile)

    for (const property in selectedFile) {
      if (isNaN(parseInt(property))) break
      if(selectedFile[property].name == _image_name) continue 
      dt.items.add(selectedFile[property])
    }

    input.files = dt.files

    console.log(`Reduce this ${_image_name}`)
    let imagesArr = this.props.images.filter((imageName) => { return imageName != _image_name })


    // State update's UI
    let ret_handleimages = this.props.handleimages(imagesArr)

    return
  }



  render() {

    let UI = this.updateUI()


    return (
      <React.Fragment>

        <div>
          {UI}
        </div>

        {/* Old */}
        {/* <button onClick={(e) => {
          let ret_addimages = this.addimages()
          console.log(ret_addimages)
          return
        }}>
          Add Photo
        </button> */}


        {/* New */}
        {/* action="/upload/post" method="post" encType="multipart/form-data" */}
        <form className="form" id="form_id">
          <label htmlFor="image-select">Image(s)</label>
          {/* required value={this.props.images} onChange={(e)=>{this.props.handleimage()}} */}
          <input type="file" name="image" id="image-select" multiple onChange={(e) => {
            e.preventDefault()
            let ret_addimages = this.addimages(e)
          }} />

          <button type="submit" onClick={(e) => {
            let ret_process1 = this.process1()
            let ret_process2 = this.process2()
            let ret_process3 = this.process3()
            return
          }}>api call</button>

        </form>


        <br /><br />
        {/* Original */}
        <form action="/upload/post" method="post" encType="multipart/form-data">
          <input type="file" name="image" /> <br /><br />
          <button type="submit">Upload</button>
        </form>



        <br /><br /><br />
        <button onClick={(e) => {
          this.props.previousStep(e)
        }}>Previous</button>
      </React.Fragment>
    )
  }


  process1() {
    console.log("process1")
  }
  process2() {
    console.log("process2")
  }
  process3() {
    console.log("process3")
  }
}

export default _4_InputImagesMarketOrder
