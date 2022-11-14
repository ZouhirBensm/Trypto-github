
import React from 'react'
import '../style/reactDivMobile.css'
import './style/market-images.css'
import ImagesWDeletionLoop from './ImagesWDeletionLoop'

// import fillsDragsFunctions from './drag-drop-event-functions/fills-functions'
// import emptiesDragsFunctions from './drag-drop-event-functions/empties-functions'


// Image sources: https://unsplash.com/

class _4_InputImagesMarketOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.addimages = this.addimages.bind(this)
    this.reduceimage = this.reduceimage.bind(this)
  }



  makeArrayOutOf(selectedFiles) {
    let selectedFilesArray = []
    for (const FileKey in selectedFiles) {
      if (isNaN(parseInt(FileKey))) continue
      selectedFilesArray.push(selectedFiles[FileKey])
    }
    return selectedFilesArray
  }

  addimages(e = null) {

    let input = document.getElementById('image-select')
    let selectedFiles = input.files
    let selectedFilesArr = this.makeArrayOutOf(selectedFiles)

    let Old_Files_arr = this.props.filelist // Past state before reseting to new at the end of this function
    let Total_trying = Old_Files_arr.length + selectedFiles.length

    let dt = new DataTransfer()
    let Files_arr_names_build = []
    let Files_build = []
    let number_we_can_add = selectedFiles.length // all new addable


    // Old ones present
    if (Old_Files_arr.length != 0) {

      Files_arr_names_build = Old_Files_arr.map((old_file) => { return old_file.name })
      Files_build = Old_Files_arr

      // reput the old files
      for (let i = 0; i < Files_build.length; i++) {
        const File = Files_build[i];
        dt.items.add(File)
      }

    }



    if (Total_trying >= 5) {
      number_we_can_add = Math.abs(5 - Old_Files_arr.length);
    }


    let countToSkipAlreadyPresentUploads = 0
    for (let i = 0; i < number_we_can_add; i++) {
      const Fileadd = selectedFilesArr[i];
      if (Files_arr_names_build.includes(Fileadd.name)) {
        countToSkipAlreadyPresentUploads++
      }
    }

    for (let i = 0; i < number_we_can_add + countToSkipAlreadyPresentUploads; i++) {
      const Fileadd = selectedFilesArr[i];
      if (Files_arr_names_build.includes(Fileadd.name)) continue
      Files_arr_names_build.push(Fileadd.name)
      Files_build.push(Fileadd)
      dt.items.add(Fileadd)
    }


    input.files = dt.files

    let ret_handleimages = this.props.handleimages(Files_arr_names_build, Files_build)

  }


  reduceimage(_image_name, e) {
    console.log(_image_name)

    let input = document.getElementById('image-select')
    let selectedFilesArr = this.props.filelist

    let dt = new DataTransfer()
    let Files_build = []

    let files_names = []

    for (let i = 0; i < selectedFilesArr.length; i++) {
      const File = selectedFilesArr[i];
      if (File.name == _image_name) continue
      dt.items.add(File)
      Files_build.push(File)
      files_names.push(File.name)
    }

    input.files = dt.files

    // State update's UI, because prop changes and rerenders. See remarque at the bottom
    let ret_handleimages = this.props.handleimages(files_names, Files_build)

    return
  }





  render() {
    console.log("\n\n\n\n\nSTART\n\n\n\n")
    console.log("render()->_4_InputImagesMarketOrder")

    let filelist = this.props.filelist


    return (
      <React.Fragment>

        <div id='images-container'>
          <ImagesWDeletionLoop
            filelist={filelist}
            reduceimage={this.reduceimage}
          />
        </div>



        {/* New */}
        {/* action="/upload/post" method="post" encType="multipart/form-data" */}
        <form className="form" id="form_id">
          <label htmlFor="image-select">Image(s)</label>
          {/* required value={this.props.images} */}
          <input type="file" name="image" id="image-select" multiple onChange={(e) => {
            e.preventDefault()
            let ret_addimages = this.addimages(e)
          }} />


          <button type="submit" onClick={(e) => {
            return
          }}>api call</button>

        </form>



        {/* Original */}
        <form action="/upload/post" method="post" encType="multipart/form-data">
          <input type="file" name="image" /> <br /><br />
          <button type="submit">Upload</button>
        </form>




        <button onClick={(e) => {
          this.props.previousStep(e)
        }}>Previous</button>
      </React.Fragment>
    )
  }


}

export default _4_InputImagesMarketOrder

// TODO finish https://www.ycombinator.com/apply registration
// TODO get people to onboard to your company on angellist.co


// Ramarque
// In order for props to change, they need to be updated by the parent component. This means the parent would have to re-render, which will trigger re-render of the child component regardless of its props.